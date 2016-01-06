var Users = require('../controllers/users');
var Authentication = require('../controllers/auth');
module.exports = function(app, express) {
  // Users Routes

  var apiRouter = express.Router();


  apiRouter.route('/users')
    .post(Users.signup)
    .get(Users.getAllUsers);

  // Login Route
  apiRouter.route('/users/login')
    .post(Users.login);

  //Authentication middleware
  apiRouter.use(Authentication.auth);


  // Logout route
  apiRouter.route('/users/logout')
    .get(Users.logout);

  // User Routes
  apiRouter.route('/users/:id')
    .get(Users.find)
    .put(Users.update)
    .delete(Users.delete);

  apiRouter.route('/users/:ownerId/documents')
    .get(Users.getAllDocumentsByUser);

  app.use('/api', apiRouter);

};
