
var mongoose = require("mongoose")
var Hotel = mongoose.model('Hotel')

function getReviewsOfHotel( req, res ){
    
    
    var hotelId = req.params.hotelId;

    console.log('Getting data for hotelID ' + hotelId );
    
    Hotel
        .findById( hotelId )
        .select('reviews')
        .exec(function(err, doc){
            res
                .status(200)
                .json( doc .reviews )
        })
    
}


function getOneReview( req, res ){
    
    var hotelId = req.params.hotelId;
    var reviewId = req.params.reviewId;
    
     Hotel
        .findById( hotelId )
        .select('reviews')
        .exec(function(err, hotel){
            
            var review = hotel.reviews.id( reviewId )
            
            res
                .status(200)
                .json( review )
        })
        
}





module.exports = {
    getReviewsOfHotel: getReviewsOfHotel,
    getOneReview: getOneReview
}