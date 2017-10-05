const models = require('../models');
const db = require('../');
var Promise = require('bluebird');

exports.seed = function (knex, Promise) {

  return models.Trip.where({ id: '1' }).fetch()
    .then((trip) => {
      if (trip) {
        throw trip;
      }

      var Trips = db.Collection.extend({
        model: models.Trip
      });

      var trips = Trips.forge([{
        tripname: 'Past Event: Adam\'s Bachelor Party',
        description: 'You know the drill. Anything happens in LV, stays in LV',
        location: 'Las Vegas',
        rangeStart: '2017-08-04T07:00:00.000Z',
        rangeEnd: '2017-08-13T07:00:00.000Z',
        user_id: 1
      }, {
        tripname: 'Code School: 90\'s edition',
        description: 'Learn how to make Pong and Snake for VIM',
        location: 'Bay Area',
        rangeStart: '2017-09-12T07:00:00.000Z',
        rangeEnd: '2017-09-22T07:00:00.000Z',
        user_id: 2
      }, {
        tripname: 'Future Event: Back to the Future',
        description: 'Go back in time to try and stop Kennedy\'s assassination',
        location: 'an unspecified point along the space\/time continuum',
        rangeStart: '2017-10-01T07:00:00.000Z',
        rangeEnd: '2017-10-30T07:00:00.000Z',
        user_id: 3
      }, {
        tripname: 'Future Event: London/Hawaii',
        description: 'Ball out in London and then bask in your glory on a Hawaiian beach',
        location: 'London and Hawaii',
        rangeStart: '2017-10-10T07:00:00.000Z',
        rangeEnd: '2017-10-20T07:00:00.000Z',
        user_id: 4
      }]);
      return Promise.all(trips.invokeMap('save'));
    })
    .error((err)=>{
      console.error('Failed to create new trip');
      throw err;
    })
    .catch((err) => {
      console.log('Warning: this trip exists', err );
      
    });

};