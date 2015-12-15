(function() {
  'use strict';
  var Document = require('../models/document');

  module.exports = {

// Creates a document
    createDocument: function(req, res) {
      var document = new Document;
      document.title = req.body.title;
      document.content = req.body.content;
      document.ownerId = req.body.ownerId;

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
        res.json({
          documents: documents
        });
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
      Document.find({role: req.params.rold_id})
        .populate('role')
        .exec(function(err, docs) {
          if(err) {
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
        }

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
      });
    },

// Deletes a specified document by the User who created it
    delete: function(req, res) {
      Document.remove({
        _id: req.params.doc_id
      }, function(err, document) {
        if (err) {
          res.send(err);
        }
        res.json({
          message: 'Document successfully deleted!!'
        });
      });
    }
  };
}());
