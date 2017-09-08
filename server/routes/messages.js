'use strict';
const express = require('express');
const router = express.Router();
const MessagesController = require('../controllers').Messages;
const db = require('../../db');

//need routes to:

//1 get all messages for a trip
router.route('/byTrip')
  .get(MessagesController.getMessagesByTripId);
//2 create a new message for a trip
router.route('/create')
  .post(MessagesController.createMessage);
//3 delete a message for a trip
router.route('/delete')
  .post(MessagesController.deleteMessage);


module.exports = router;