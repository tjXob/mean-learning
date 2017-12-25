// Start the server
mongod --port 27017 --dpath="/Document/db"

// Connect to the shell
mongo

// Show all databases
show dbs

// Switch to database
use local

// Show all collections
show collections

// Create Collection
db.createCollection("tech")

// Insert
db.tech.insert();

db.tech.find();

db.tech.insert().pretty();

// Sorting -1 desc and 1 esc
db.movies.find().sort({"title":-1})

// Selecting columns
db.tech.find({} , {"name":true, "_id":false } );
db.tech.find({} , {"name":1, "_id":0 } );

// update an existing field documents
db.tech.update( {"name": "Angular"} , { $set : {"name": "Angular JS"} } );

// Add new element in documents
db.tech.update( 
    {"name": "Angular"} , 
    { $set : {"name": "Angular JS"} } , 
    { multi : true } );
    
db.tech.remove( {"name": "Test"} );
db.tech.remove( {} ); // Deletes everything

// Drop a collection
db.tech.drop();


///////////////////////////////////
/// Export and importing data /////
///////////////////////////////////

mongodump --db DATABASE_NAME --gzip

mongorestore --db mean2 --gzip dump/meantest // This command does not update existing objects

// jsonArray is to export in [] format
// pretty is to export in pretty format
mongoexport --db videos --collection movies --out /data/db/movies.json --jsonArray --pretty

// Import data starting from json file
mongoimport --db mean3 --collection tech --jsonArray /data/db/tech.json