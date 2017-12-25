
var express = require("express");

var app = express();
var port = process.env.PORT;


// Add the routing config.
app.get('/', (req, res) => {

  res.status(200).json({ message: 'Connected!' });
  // res.render('index');
});

