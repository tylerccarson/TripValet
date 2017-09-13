const models = require('../models');
const db = require('../');
var Promise = require('bluebird');

exports.seed = function (knex, Promise) {

  return models.Profile.fetchAll()
    .then((profile)=>{
      console.log(profile);
      if (profile.models.length>0) {
        console.log(profile);
        throw profile;  
      }

      var Accounts = db.Collection.extend({
        model: models.Profile
      });

      var accounts = Accounts.forge([
        {
            first: 'Jay',
            last: 'Lim',
            display: 'Lim Jay',
            email: 'jhjaylim@gmail.com'
        },
        {
            first: 'Tyler',
            last: 'Carson',
            display: 'Tyler Carson',
            email: 'tyler.c.carson@gmail.com'
        },
        {
            first: 'Weiyi',
            last: 'Lee',
            display: 'Weiyi Lee',
            email: 'weiyilee17@gmail.com'
        },
        {
            first: 'Jason Lee',
            last: '.',
            display: 'Jason Lee',
            email: 'jasondotlee@gmail.com'
        }

      ]);

      return Promise.all(accounts.invokeMap('save')).then(function(accounts) {
        console.log(accounts);
      });

    })
    .error(err => {
      console.error('ERROR: failed to create auth');
      throw err;
    })
    .catch((err) => {
      console.log(err);
      console.log('WARNING: defualt user already exists.');
    });
};