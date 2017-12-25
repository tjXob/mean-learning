
var hotelData = require("../data/hotel-data.json")
var dbConnection = require("../data/dbconnection.js")

var mongoose = require("mongoose")
var Hotel = mongoose.model('Hotel')


var _splitArray = function(input) {
  var output;
  if (input && input.length > 0) {
    output = input.split(";");
  } else {
    output = [];
  }
  return output;
};

var retResponse = function( res, obj ){
    res
        .status( obj.status )
        .json( obj.message );
    
}

var runGeoQuery = function( req, res ){

  var lng = parseFloat(req.query.lng);
  var lat = parseFloat(req.query.lat);

  // A geoJSON point
  var point = {
    type : "Point",
    coordinates : [lng, lat]
  };

  var geoOptions = {
    spherical : true,
    maxDistance : 2000,
    num : 5
  };

  Hotel
    .geoNear(point, geoOptions, function(err, results, stats) {
      console.log('Geo Results', results);
      console.log('Geo stats', stats);
      res
        .status(200)
        .json(results);
    });

};



function hotelsGetAll( req, res ){
    
    console.log("Get with paging .. ");

    var offset;
    var count;
    var maxCount = 10;
    
    var results = {
        status:200,
        message:{}
    }
    
    // Run another commnad in case we are looking for exact lat and lng
    if( req.query && req.query.lat && req.query.lng ){
        
        runGeoQuery( req, res );
        return;
    }
    
    if( req.query && req.query.offset ){ offset = parseInt( req.query.offset, 10 ) }
    if( req.query && req.query.count ) { count = parseInt( req.query.count, 10 ) }
    
    // Validations
    if( isNaN( offset ) || isNaN( count ) ){
        
        results.status = 400;
        results.message = {"message": "offset and count should be numbers" };
        retResponse( res, results );
        
        return;
    }
    
    if ( count > maxCount){
        
        results.status = 400;
        results.message = {"message": "Count exceeds the max rows permitted" } ;
        retResponse( res, results );
        
        return;
    }
    
    Hotel
        .find()
        .skip( offset )
        .limit( count )
        .exec( function(err, hotels){
            
            console.log("Found hotels", hotels.length )
            
            if ( err ){
                results.status = 400;
                results.message = err ;
                 
            } else {
                results.status = 200;
                results.message = hotels ;
            }
            
            retResponse( res, results );       
            
        })
        
}

function insrtNewHotel( req, res ) {
    
    console.log('POST the json');
    
    var results = {
        status:200,
        message:{}
    }
    
    
    // Create new object using Mongoose
    Hotel
        .create(
            
            {
            name : req.body.name,
            description : req.body.description,
            stars : parseInt(req.body.stars,10),
            services : _splitArray(req.body.services),
            photos : _splitArray(req.body.photos),
            currency : req.body.currency,
            location : {
                address : req.body.address,
                coordinates : [parseFloat(req.body.lng), parseFloat(req.body.lat)]
            }
    }
    , function(err, hotel){
            if(err){
                results.status = 400;
                results.message = {"message":"An error has occured"}
            }else{
                results.status = 201;
                results.message = hotel;
            }
            
            retResponse( res, results );
            
            return;
        })
    
    
    
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

    console.log('Getting data for hotelID ' + hotelId );
    
    Hotel
        .findById( hotelId )
        .exec(function(err, doc){
            res
                .status(200)
                .json( doc )
        })
        
}



  

module.exports = {
    hotelsGetAll:hotelsGetAll,
    insrtNewHotel: insrtNewHotel,
    hotelsGetOne: hotelsGetOne
}