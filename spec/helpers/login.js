var userId, token;
var request = require('superagent');

module.exports = {
  login: function(cb, name, password) {
    request
      .post('http://localhost:3000/api/users/login')
      .send({
        username: name,
        password: password
      })
      .end(function(err, res) {
        userId = res.body.user._id;
        token = res.body.token;
        cb(token);
      });
  }
};
