(function() {
    'use strict';
    var jwt = require('jsonwebtoken');
    var superSecret = 'teddyotienoasoladms';

    module.exports = {
        // Check header or url parameters or post parameters for token
        auth: function(req, res, next) {
            var token = req.headers['x-access-token'] || req.body.token;
            if (token) {
                // Verify secret and checks exp
                jwt.verify(token, superSecret, function(err, decoded) {
                    if (err) {
                        return res.status(403).send({
                            success: false,
                            message: 'Failed to authenticate token'
                        });
                    } else {
                        if (decoded._doc) {
                            req.decoded = decoded._doc;
                        } else {
                            req.decoded = decoded;
                        }
                        // req.decoded = decoded;
                        next();
                    }
                });
            } else {
                return res.status(401).send({
                    success: false,
                    message: 'Failed to provide token'
                });
            }
        }
    };

})();
