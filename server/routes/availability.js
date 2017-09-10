'use strict';
const express = require('express');
const router = express.Router();
const AvailabilityController = require('../controllers').Availability;
const db = require('../../db');

//need routes to:

//1 get all messages for a trip
router.route('/byTripId')
  .get(AvailabilityController.getAvailabilityByTripId)
  .post(AvailabilityController.createAvailabilityByTripId);

module.exports = router;