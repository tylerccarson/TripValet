'use strict';
const express = require('express');
const router = express.Router();
const config = require('config')['map'];

router.route('/')
  .get((req, res) => {
    res.status(200).send('Hello World!');
  })
  .post((req, res) => {
    console.log('in the correct route');
    res.status(201).send({ data: 'Posted!' });
  });

router.route('/foursquare')
	.get((req, res)=>{
		res.status(200).send({clientId: config.clientID, clientSecret: config.clientSecret});
	});

router.route('/mapKey')
  .get((req, res)=>{
    res.status(200).send({apiKey: config.mapKey});
  });

module.exports = router;
