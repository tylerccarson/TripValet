'use strict';
const express = require('express');
const router = express.Router();
const TripController = require('../controllers').Trips;
const db = require('../../db');


router.route('/create')
  .post(TripController.createTrip);

router.route('/invite')
  .post(TripController.inviteUser);

router.route('/allTrips')
  .get(TripController.getAll);

router.route('/byEmail')
  .get(TripController.getTripsByUserEmail);

router.route('/byUser')
  .get(TripController.getTripsByUserSessionId);

router.route('/')
  .get(TripController.getTripInfoById);

router.route('/validate')
  .post(TripController.validateEmail);

router.route('/*')
  .get((req, res) => {
    res.render('index.ejs');
  });

module.exports = router;

/* AVAILABLE FUNCTIONS

  POST
  TripController.createTrip

  GET
  TripController.getTripsByUserEmail
  TripController.getAll
  TripController.getTripsByUserSessionId

*/
