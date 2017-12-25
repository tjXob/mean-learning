
var _connection = null;
var dbUrl       = "mongodb://tjs:c8nYZgyjVy5CRnDJ@mymongodb-shard-00-00-fg0ia.mongodb.net:27017,mymongodb-shard-00-01-fg0ia.mongodb.net:27017,mymongodb-shard-00-02-fg0ia.mongodb.net:27017/MyMongoDB?ssl=true&replicaSet=MyMongoDB-shard-0&authSource=admin";

// Require Mongoose library
var mongoose = require("mongoose");

mongoose.connect( dbUrl );

// Instead of callback functions, Mongoose DB listen to events. To know if the connection has been established correctly, listen to evennt ON

mongoose.connection.on('connected' , function(){
    console.log('Mongoose connected correctly ')
})

// Error disconnected
mongoose.connection.on('disconnected' , function(){
    console.log('Mongoose connected correctly ')
})

// Error listener
mongoose.connection.on('error' , function(err){
    console.log('Mongoose connected correctly ' + err )
})

// When Ctrl+C is pressed
process.on('SIGINT', function(){
    mongoose.connection.close( function(){
        console.log('Mongoose disconnected through app termination' );
        process.exit( 0 );
    });
});

// Similar to Ctrl+C in Heriku dev env.
process.on('SIGTERM', function(){
    mongoose.connection.close( function(){
        console.log('Mongoose disconnected through app termination' );
        process.exit( 0 );
    });
});

// When the application is restarted
process.once('SIGUSR2', function(){
    mongoose.connection.close( function(){
        console.log('Mongoose disconnected through app termination (SIGUSR2)' );
        process.kill( process.pid, 'SIGUSR2')
    });
});


// Requiering models
require("./model/hotel.model.js")


