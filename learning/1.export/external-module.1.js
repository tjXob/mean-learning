var fileName = 'index.js';

var hello = function( texto ){
    console.log( texto );
}

var intro = function(  ){
    console.log( 'File Name is: ' + fileName );
}

// Determine which functions you are interested in publish.

module.exports = {
    hello: hello,
    intro: intro
}
