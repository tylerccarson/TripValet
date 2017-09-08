'use strict';
const express = require('express');
const router = express.Router();
const ConfirmedController = require('../controllers').Confirmed;
const db = require('../../db');


// router.route('/create')
//   .post(TripController.createTrip);

// router.route('/allTrips')
//   .get(TripController.getAll);

// router.route('/byEmail')
//   .get(TripController.getTripsByUserEmail);

// router.route('/byUser')
//   .get(TripController.getTripsByUserSessionId);

module.exports = router;

/* AVAILABLE FUNCTIONS

  POST
  TripController.createTrip
  
  GET
  TripController.getTripsByUserEmail
  TripController.getAll
  TripController.getTripsByUserSessionId

*/
