var Documents = require('../controllers/documents');
var Authentication = require('../controllers/auth');

module.exports = function(app, express) {
  var apiRouter = express.Router();

  //Authentication middleware
  apiRouter.use(Authentication.auth);

  // Document Routes
  apiRouter.route('/documents/:doc_id')
    .get(Documents.find)
    .put(Documents.update)
    .delete(Documents.delete);


  // Documents Routes
  apiRouter.route('/documents')
    .post(Documents.createDocument)
    .get(Documents.getAllDocuments);

  app.use('/api', apiRouter);

};
