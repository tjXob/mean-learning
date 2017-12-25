
console.log("1: Start app");

// Waits for 1 second, but doesn't stop other JavaScript from executing
// Creates an async peice of code

var holdOn = setTimeout(function() {
  console.log("2: In the setTimeout");
}, 2000);

console.log("3: End app");