(function() {
  'use strict';
  var Role = require('../models/role');
  module.exports = {

// Creates a new role resource into the DB
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

// Gets all roles resource from the DB
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

// Updates a specfied role resouce with new information
    updateRole: function(req, res) {
      Role.findByIdAndUpdate(req.params.id, {
        role: req.body.title
      }).exec(function(err) {
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
