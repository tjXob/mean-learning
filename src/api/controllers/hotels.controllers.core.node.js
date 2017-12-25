
var hotelData = require("../data/hotel-data.json")
var dbConnection = require("../data/dbconnection.js")


function hotelsGetAllFromFile( req, res ){
    
    console.log("Get with paging .. ");
    
    var offset;
    var count;
    
    if( req.query && req.query.offset ){ offset = parseInt( req.query.offset, 10 ) }
    if( req.query && req.query.count ) { count = parseInt( req.query.count, 10 ) }
    
    var result = hotelData;
    
    if ( offset >= 0 && count > 0 ){ result = hotelData.slice( offset, offset + count ); }
    
    console.log( result )
    
    res
        .status(200)
        .json( result );
}



function hotelsGetAll( req, res ){
    
    console.log("Get with paging .. ");
    
    var db          = dbConnection.get();
    var collection  = db.collection('hotels');
    
    
    var offset;
    var count;
    
    if( req.query && req.query.offset ){ offset = parseInt( req.query.offset, 10 ) }
    if( req.query && req.query.count ) { count = parseInt( req.query.count, 10 ) }
    

    
    collection
        .find()
        .skip( offset )
        .limit( count )
        .toArray( function(err, docs){
            
            console.log('Retreiving data from database')
            
            res.status(200)
                .json( docs )
                
        })
    
        
        
    
}

function insrtNewHotel( req, res ) {
    
    console.log('POST the json');
    
    var db          = dbConnection.get();
    var collection  = db.collection('hotels');
    
    var newHotel;
   
    // Validation
    if( req.body && req.body.name && req.body.stars ){
     
        newHotel = req.body;
        // To convert stars from String to number
        newHotel.stars = parseInt( req.body.stars , 10 );
        console.log( 'Inserting ..', newHotel  ) 
        
        collection
            .insertOne( newHotel , (err, resp ) =>{
                console.log( resp );
                
                res
                    .status(201) // The correct response when new element is inserted
                    .json( resp.ops ); // ops is the corresponding flag
            
            });
            
    } else {
         console.log( 'Validation Error' )
         
          res
            .status(200)
            .json({ "status" : "Validation Error" });   
            
        
    }
    
}



function hotelsGetOneFromFile( req, res ) {
    
    var hotelId = req.params.hotelId;
    console.log('Getting data for hotelID ' + hotelId );
    var thisHotel = hotelData[ hotelId ]
    res
      .status(200)
      .json( thisHotel );
}

function hotelsGetOne( req, res ) {
    
    var hotelId = req.params.hotelId;
    
    var db          = dbConnection.get();
    var collection  = db.collection('hotels');
    
    console.log('Getting data for hotelID ' + hotelId );
    var thisHotel = hotelData[ hotelId ]
    
    // objectId('asdasd=asdasd-asdasd') is the method used to search for the objectId
    
    collection
        .findOne({} , function(err, doc){
            
            console.log('Retreiving data from database')
            res.status(200).json( doc )
                
            
        })
        
        
}



  

module.exports = {
    hotelsGetAll:hotelsGetAll,
    insrtNewHotel: insrtNewHotel,
    hotelsGetOne: hotelsGetOne
}