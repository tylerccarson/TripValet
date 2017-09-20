'use strict';
const express = require('express');
const router = express.Router();
const ImageUploadController = require('../controllers').Images;
const app = express();

router.route('/upload')
  .post(ImageUploadController.save);

module.exports = router;
