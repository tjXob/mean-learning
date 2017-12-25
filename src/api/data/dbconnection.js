
var _connection = null;

var mongoClient = require("mongodb").MongoClient;
var dbUrl       = "mongodb://tjs:c8nYZgyjVy5CRnDJ@mymongodb-shard-00-00-fg0ia.mongodb.net:27017,mymongodb-shard-00-01-fg0ia.mongodb.net:27017,mymongodb-shard-00-02-fg0ia.mongodb.net:27017/MyMongoDB?ssl=true&replicaSet=MyMongoDB-shard-0&authSource=admin";

var open = function (){
    
    mongoClient.connect( dbUrl, (err, db ) => {
        // In case of err
        if( err ){
            console.log( "DB connection failed");
            return;
        }
        _connection = db;
        console.log( "DB connection open" );
            
    })
    
}

var get = function (){
    
    return _connection;
    
}

module.exports = {
    "open": open,
    "get":  get
    
}
