var fs = require("fs");

console.log("Going to get a file");

// Named callback makes the code easier to understan and easy to test
var onFirstFileLoad = function(err, file) {
  console.log("Got the file");
  console.log(file);
  fs.readFile('async-non-blocking.js', onSecondFileLoad);
};

var onSecondFileLoad = function(err, file) {
  console.log("Got the other file");
};

fs.readFile('sync-blocking.js', onFirstFileLoad);

console.log("Meanwhile, app continues");
