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

router.route('/delete')
  .post(AvailabilityController.deleteAvailabilityById);

router.route('/multipleDelete')
  .post(AvailabilityController.deleteMultipleAvailabilityById);

router.route('/syncToGoogleCalendar')
  .post(AvailabilityController.syncToGoogleCalendar);

router.route('/google/callback')
  .get(AvailabilityController.setGoogleCalendar);

module.exports = router;