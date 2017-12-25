var express = require('express');
var router = express.Router();
var hotelController = require("../controllers/hotels.controllers.js")
var reviewController = require("../controllers/reviews.controllers.js")


/*
 -------------------------------------------------------------
 How to define your API? -------------------------------------
 -------------------------------------------------------------
 GET    /api/hotels       Get all hotels
 POST   /api/hotels       Create new hotel
 GET    /api/hotels/:id   Get a specific hotel
 PUT    /api/hotels/:id   Update a specific hotel
 DELETE /api/hotels/:id   Delete a specific hotel
 
 GET    /api/hotels/12345/reviews       Get all reviews for a specific hotel
 POST   /api/hotels/12345/reviews       Create new review
 
 GET    /api/hotels/12345/reviews/:id   Get a specific review
 PUT    /api/hotels/12345/reviews/:id   Update a specific review
 DELETE /api/hotels/12345/reviews/:id   Delete a specific review
 
 
*/

// Hotel routes
router
  .route('/hotel')
  .get( hotelController.hotelsGetAll )
  .post( hotelController.insrtNewHotel );

router
  .route('/hotel/:hotelId')
  .get( hotelController.hotelsGetOne );
  


// Review Hotels
router
  .route('/hotel/:hotelId/reviews')
  .get( reviewController.getReviewsOfHotel );
  .post( reviewController.addReviewsOfHotel );
  
  
router
  .route('/hotel/:hotelId/reviews/:reviewId')
  .get( reviewController.getOneReview );
  
  
module.exports = router;