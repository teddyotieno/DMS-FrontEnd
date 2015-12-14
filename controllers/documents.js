(function() {
  'use strict';
  var Document = require('../models/document');

  module.exports = {
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

      console.log(res);
    },

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
