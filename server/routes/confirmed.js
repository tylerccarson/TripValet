'use strict';
const express = require('express');
const router = express.Router();
const ConfirmedController = require('../controllers').Confirmed;
const db = require('../../db');


// router.route('/someroute')
//   .post(ConfirmedController.somefunction);

// router.route('/someroute')
//   .get(ConfirmedController.getAll);


module.exports = router;
