var Role = require('../controllers/role');
var Authentication = require('../controllers/auth');
module.exports = function(app, express) {
  // Roles Routes

  var apiRouter = express.Router();


  apiRouter.route('/roles')
    .post(Role.createRole)
    .get(Role.getAllRoles);

  //Authentication middleware
  apiRouter.use(Authentication.auth);


  // Roles Routes
  apiRouter.route('/roles/:id')
    // .get(Role.findRole)
     .put(Role.updateRole);
    // .delete(Users.delete);

  // apiRouter.route('/users/:ownerId/documents')
  //   .get(Users.getAllDocumentsByUser);

  app.use('/api', apiRouter);

};
