/*
  1. nodemon is installed to monitor node application and restart the server everytime there is an update.
    nodemon.js file is used to configure nodemon. In this case, I am ignoring all changes realized on public folder.
*/


// Open the database and create a global database connection variable
// var dbConnection = require("./src/api/data/dbconnection.js").open();
var dbConnection = require("./src/api/data/db.js");

var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");


// Routing
var routes = require('./src/api/routes/hotel');

// Initiate the express server
var app = express();

// Get the assigned port number from the process variable
var port = process.env.PORT;

// This is the middleware promise function. The order of the middleware functions is important.
app.use( (req, res, next ) => {
  console.log( req.method, req.url );
  next();
} );


// In this case, middleware is only for these URL start with css/
app.use( '/css' , (req, res, next ) => {
  console.log( 'CSS' + req.method, req.url );
  next();
} );


// 
app.use( bodyParser.urlencoded({ extended: false }) );

// Insert this middleware, to assign the routing function
app.use('/api' , routes );


// Adjust the static folder so that express can locate the files.
app.use( express.static('public') );
app.use( express.static('src/views') );



app.get('/', (req, res) => {

  res
    .status(404) // There is a bunch of codes you can use.
    .json({ message: 'Connected!' });
  
});


// How to send a static file
app.get('/file', (req, res) => {

  console.log( __dirname );

  res.status(200).sendFile( path.join( __dirname , 'package.json') );
  
});

app.listen(port, function(err){ console.log("Connected to port #" + port ) } );
