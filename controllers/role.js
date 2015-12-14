(function() {
  'use strict';
  var Role = require('../models/role');
  module.exports = {

    createRole: function(req, res) {
      var role = new Role();
      role.title = req.body.title;

      role.save(function(err) {
        if (err) {
          res.send(err);
        } else {
          res.json({
            message: 'Role successfully created'
          });
        }

      });
    },

    getAllRoles: function(req, res) {
      Role.find(function(err, roles) {
        if (err) {
          res.send(err);
        }
        res.json({
          roles: roles
        });
      });
    },

    // findRole: function(req, res) {
    //   Role.findOne({
    //       title: req.params.title
    //     })
    //     .exec(function(err, role) {
    //       if (err) {
    //         res.send(err);
    //       } else {
    //         res.status(200).json({
    //           role: role
    //         });
    //       }
    //     });
    // },


    updateRole: function(req, res) {
      Role.findByIdAndUpdate(req.params.id, {
        role: req.body.title
      }).exec(function(err, role) {
        if(err) {
          res.send(err);
        }
        else {
          res.status(200).json({
            message: 'Role successfully updated'
          });
        }
      });
    }

  };
}());
