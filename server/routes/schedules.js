'use strict';
const express = require('express');
const router = express.Router();
const ScheduleController = require('../controllers').Schedules;
const db = require('../../db');


router.route('/add')
  .post(ScheduleController.add);

router.route('/get')
  .get(ScheduleController.get);

router.route('/remove')
	.post(ScheduleController.remove);


module.exports = router;
