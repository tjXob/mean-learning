var child_process = require('child_process');

console.log('1');


// stdio: to share the same console
var newProcess = child_process.spawn('node', ['_fibonacci.js'], {
    stdio: 'inherit'
});

console.log('2');
