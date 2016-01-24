(function() {
    'use strict';
    var env = process.env.NODE_ENV || 'development';
    var User = require('../models/user');
    var Document = require('../models/document');
    var jwt = require('jsonwebtoken');
    var superSecret = require('../config/index')[env].secretKey;

    module.exports = {

        // Signs Up a User
        signup: function(req, res) {
            var user = new User();
            user.name.first = req.body.firstname;
            user.name.second = req.body.secondname;
            user.username = req.body.username;
            user.password = req.body.password;
            user.email = req.body.email;
            user.title = req.body.title;

            user.save(function(err) {
                if (err) {
                    if (err.code === 1000) {
                        console.log(res.status);
                        return res.status(500).json({
                            message: 'A user with that name already exists'
                        });
                    } else {
                        return res.status(500).send(err);
                    }
                }
                res.json({
                    message: 'User successfully created'
                });
            });
        },

        // Logout a User and deletes the assigned token
        logout: function(req, res) {
            delete req.headers['x-access-token'];
            return res.status(200).json({
                message: 'User has been successfully logged out'
            });
        },

        // Logs In a User by verifying his username and password
        login: function(req, res) {
            // Find the User
            // Select the name and password explicitly
            User.findOne({
                username: req.body.username
            }).exec(function(err, user) {
                if (err) {
                    throw err;
                }
                if (!user) {
                    res.status(500).json({
                        success: false,
                        message: 'Authentication failed. User not found'
                    });
                } else if (user) {
                    // Check if password matches
                    var validPassword = user.comparePassword(req.body.password);
                    if (!validPassword) {
                        res.status(500).json({
                            success: false,
                            message: 'Authentication failed. Wrong password'
                        });
                    } else {
                        // If user is found and password is right
                        var token = jwt.sign(user, superSecret, {
                            expiresIn: 10800
                        });
                        var user_details = user;
                        user_details.password = '';
                        console.log(user_details.password);
                        res.json({
                            success: true,
                            message: 'User successfully logged in',
                            token: token,
                            user: user_details
                        });
                    }
                }
            });
        },

        session: function(req, res) {
            var token = req.headers['x-access-token'] || req.body.token;
            if (token) {
                jwt.verify(token, superSecret, function(err, decoded) {
                    console.log(decoded._id);
                    if (err) {
                        res.status(401).json({
                            error: 'Session has expired or does not exist',
                            err: err
                        });
                    } else {
                        User.findById(decoded._id, function(err, user) {
                            if (err) {
                                return res.send(err);
                            }
                            if (!user) {
                                return res.status(404).json({
                                    message: 'User not found'
                                });
                            }
                            req.decoded = user;
                            user.password = '';
                            return res.json(user);
                        });
                    }
                });
            } else {
                res.status(401).json({
                    error: 'Session has expired or does not exist'
                });
            }
        },

        // Returns all the Documents of a specified user
        getAllDocumentsByUser: function(req, res) {
            Document.find({
                    ownerId: req.params.ownerId
                })
                .exec(function(err, docs) {
                    if (err) {
                        return err;
                    } else {
                        return res.status(200).json(docs);
                    }
                });
        },

        // Returns all the users stored in the DB
        getAllUsers: function(req, res) {
            User.find(function(err, users) {
                if (err) {
                    res.send(err);
                }
                res.json(users);
            });
        },

        // Finds the user based on his id.
        find: function(req, res) {
            User.findById(req.params.id, function(err, user) {
                if (err) {
                    res.send(err);
                }
                res.json(user);
            });
        },

        // Updates the User details with any updated information
        update: function(req, res) {
            User.findById(req.params.id, function(err, user) {
                if (err) {
                    console.log(err);
                    res.send(err);
                }

                // Update the User Information only if its new
                if (req.body.name.first) {
                    user.name.first = req.body.name.first;
                }
                if (req.body.name.second) {
                    user.name.second = req.body.name.second;
                }
                if (req.body.username) {
                    user.username = req.body.username;
                }
                if (req.body.password) {
                    user.password = req.body.password;
                }
                if (req.body.email) {
                    user.email = req.body.email;
                }

                console.log('Almost Updating');
                // Save the user
                user.save(function(err) {
                    if (err) {
                        res.send(err);
                    }
                    var user_details = user;
                    user_details.password = '';
                    res.json({
                        user: user_details
                    });
                });
                console.log('Updated');
            });
        },

        // Deletes the User
        delete: function(req, res) {
            User.remove({
                _id: req.params.user_id
            }, function(err) {
                if (err) {
                    res.send(err);
                }
                res.json({
                    message: 'User successfully deleted!'
                });
            });
        }
    };
}());
