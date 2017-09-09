'use strict';
const express = require('express');
const router = express.Router();
const UserController = require('../controllers').Users;


router.route('/byUserId')
  .get(UserController.getUserById);
  
module.exports = router;
