'use strict';
const express = require('express');
const router = express.Router();
const ConfirmedController = require('../controllers').Confirmed;
const db = require('../../db');


// router.route('/someroute')
//   .post(ConfirmedController.somefunction);

router.route('/byTrip')
  .get(ConfirmedController.getConfirmsByTripId);

router.route('/update')
  .post(ConfirmedController.updateUserConfirmationForTrip);

router.route('/delete')
  .post(ConfirmedController.deleteUserFromTrip);

module.exports = router;
