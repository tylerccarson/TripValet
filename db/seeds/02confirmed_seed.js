const models = require('../models');
const db = require('../');
var Promise = require('bluebird');

exports.seed = function (knex, Promise) {

  return models.Confirmed.fetchAll()
    .then((confirm)=>{
      console.log(confirm);
      if (confirm.models.length>0) {
        console.log(confirm);
        throw confirm;  
      }

      var Confirmations = db.Collection.extend({
        model: models.Confirmed
      });

      var confirmations = Confirmations.forge([
        {
          email: 'jhjaylim@gmail.com',
          trip_id: 1,
          confirmed: true
        },
        {
          email: 'jhjaylim@gmail.com',
          trip_id: 2,
          confirmed: true
        },
        {
          email: 'jhjaylim@gmail.com',
          trip_id: 3,
          confirmed: false
        },
        {
          email: 'jhjaylim@gmail.com',
          trip_id: 4,
          confirmed: true
        },
        {
          email: 'jasondotlee@gmail.com',
          trip_id: 1,
          confirmed: true
        },
        {
          email: 'jasondotlee@gmail.com',
          trip_id: 2,
          confirmed: true
        },
        {
          email: 'jasondotlee@gmail.com',
          trip_id: 3,
          confirmed: false
        },
        {
          email: 'jasondotlee@gmail.com',
          trip_id: 4,
          confirmed: true
        },
        {
          email: 'weiyilee17@gmail.com',
          trip_id: 1,
          confirmed: true
        },
        {
          email: 'weiyilee17@gmail.com',
          trip_id: 2,
          confirmed: true
        },
        {
          email: 'weiyilee17@gmail.com',
          trip_id: 3,
          confirmed: false
        },
        {
          email: 'weiyilee17@gmail.com',
          trip_id: 4,
          confirmed: true
        },
        {
          email: 'tyler.c.carson@gmail.com',
          trip_id: 1,
          confirmed: true
        },
        {
          email: 'tyler.c.carson@gmail.com',
          trip_id: 2,
          confirmed: true
        },
        {
          email: 'tyler.c.carson@gmail.com',
          trip_id: 3,
          confirmed: false
        },
        {
          email: 'tyler.c.carson@gmail.com',
          trip_id: 4,
          confirmed: true
        }

        

      ]);

      return Promise.all(confirmations.invokeMap('save')).then(function(confirmations) {
        console.log(confirmations);
      });

    })
    .error(err => {
      console.error('ERROR: failed to create confirmation');
      throw err;
    })
    .catch((err) => {
      console.log(err);
      console.log('WARNING: defualt confirmations already exists.');
    });

};