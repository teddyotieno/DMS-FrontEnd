// Modules
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var port = 3000;
var db = require('./server/config/db');


require('./seeds/seed');


// Use bodyparser so that we can grab infromation from POST requests
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// Log all requests to the console
app.use(morgan('dev'));


//Basic Route for the Homepage to our API
app.get('/', function(req, res) {
  res.send('Welcome to the homepage of our Document Management System API');
});


// Configure our routes
require('./server/routes/users')(app, express);
require('./server/routes/documents')(app, express);
require('./server/routes/roles')(app, express);



// Start the Server
app.listen(port);
console.log('Magic happening at port ' + port);


// Expose App
exports = module.exports = app;
