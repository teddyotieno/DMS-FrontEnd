(function() {
  'use strict';
  var Document = require('../models/document');

  module.exports = {

    // Creates a document
    createDocument: function(req, res) {
      var document = new Document();
      document.title = req.body.title;
      document.content = req.body.content;
      document.owner = req.decoded._id;
      document.save(function(err) {
        if (err) {
          return res.send(err);
        }
        res.json({
          message: 'Document successfully created',
          document: document
        });
      });
    },

    // Gets all document resources in the DB
    getAllDocuments: function(req, res) {
      Document.find(function(err, documents) {
        if (err) {
          res.send(err);
        }
        res.json(documents);
      });
    },

    find: function(req, res) {
      Document.findById(req.params.doc_id, function(err, document) {
        if (err) {
          res.send(err);
        }

        res.json(document);
      });
    },

    // Returns all the documents of the same role
    getAllByRole: function(req, res) {
      Document.find({
          role: req.params.rold_id
        })
        .populate('role')
        .exec(function(err, docs) {
          if (err) {
            return err;
          } else {
            return res.status(200).json({
              documents: docs
            });
          }
        });
    },

    // Updates a specified document created by the user
    update: function(req, res) {
      Document.findById(req.params.doc_id, function(err, document) {
        if (err) {
          res.send(err);
        } else if (req.decoded._id === document.ownerId ||
          req.decoded.title === 'Admin') {

          // Update the Document Information only if its new
          if (req.body.title) {
            document.title = req.body.title;
          }
          if (req.body.content) {
            document.content = req.body.content;
          }

          // Save the Document
          document.save(function(err) {
            if (err) {
              res.send(err);
            }
            res.json({
              message: 'Document successfully updated'
            });
          });
        }
        else {
          res.json({success: false,
            message: 'You can only update a document you have created'});
        }
      });
    },

    // Deletes a specified document by the User who created it
    delete: function(req, res) {
      Document.remove({
        _id: req.params.doc_id
      }, function(err, document) {
        if (err) {
          res.status(403).send(err);
        }
        if (req.decoded._id === document.ownerId ||
          req.decoded.title === 'Admin') {
          res.json({
            message: 'Document successfully deleted!!'
          });
        } else {
          res.status(403).json({
            success: false,
            message: 'You can only delete a document you have created'
          });
        }
      });
    },

    //Delete all documents based on Role of User
    deleteAllDocuments: function(req, res) {
      if (req.decoded.title === 'Admin') {
        Document.remove({}, function(err) {
          if (err) {
            res.send(err);
          } else {
            res.json({
              success: true,
              message: 'All Documents successfully deleted'
            });
          }
        });
      } else {
        res.status(403).json({
          success: false,
          message: 'You need to have Admin priviledges to delete all documents'
        });
      }
    }
  };
}());
