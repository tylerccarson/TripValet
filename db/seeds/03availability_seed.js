const models = require('../models');
const db = require('../');
var Promise = require('bluebird');

exports.seed = function (knex, Promise) {

  var Availability = db.Collection.extend({
    model: models.Availability
  });

  return models.Availability.where({ id: 1 }).fetch()
    .then((availability) => {
      if (availability) {
        console.log(availability);
        throw availability;
      }
      var availability = Availability.forge([{
        //trip 3
        user_id: 1,
        trip_id: 3,
        rangeStart: '2017-10-10T07:00:00.000Z',
        rangeEnd: '2017-10-20T07:00:00.000Z'
      }, {
        user_id: 1,
        trip_id: 3,
        rangeStart: '2017-10-23T07:00:00.000Z',
        rangeEnd: '2017-10-27T07:00:00.000Z'
      }, {
        user_id: 2,
        trip_id: 3,
        rangeStart: '2017-10-11T07:00:00.000Z',
        rangeEnd: '2017-10-21T07:00:00.000Z'
      }, {
        user_id: 2,
        trip_id: 3,
        rangeStart: '2017-10-24T07:00:00.000Z',
        rangeEnd: '2017-10-28T07:00:00.000Z'
      }, {
        user_id: 3,
        trip_id: 3,
        rangeStart: '2017-10-12T07:00:00.000Z',
        rangeEnd: '2017-10-22T07:00:00.000Z'
      }, {
        user_id: 3,
        trip_id: 3,
        rangeStart: '2017-10-02T07:00:00.000Z',
        rangeEnd: '2017-10-08T07:00:00.000Z'
      }, {
        user_id: 4,
        trip_id: 3,
        rangeStart: '2017-10-13T07:00:00.000Z',
        rangeEnd: '2017-10-23T07:00:00.000Z'
      }, {
        user_id: 4,
        trip_id: 3,
        rangeStart: '2017-08-06T07:00:00.000Z',
        rangeEnd: '2017-08-11T07:00:00.000Z'
      }, {
        //trip 4
        user_id: 1,
        trip_id: 4,
        rangeStart: '2017-11-10T07:00:00.000Z',
        rangeEnd: '2017-11-20T07:00:00.000Z'
      }, {
        user_id: 1,
        trip_id: 4,
        rangeStart: '2017-11-23T07:00:00.000Z',
        rangeEnd: '2017-11-27T07:00:00.000Z'
      }, {
        user_id: 2,
        trip_id: 4,
        rangeStart: '2017-11-11T07:00:00.000Z',
        rangeEnd: '2017-11-21T07:00:00.000Z'
      }, {
        user_id: 2,
        trip_id: 4,
        rangeStart: '2017-11-24T07:00:00.000Z',
        rangeEnd: '2017-11-28T07:00:00.000Z'
      }, {
        user_id: 3,
        trip_id: 4,
        rangeStart: '2017-11-12T07:00:00.000Z',
        rangeEnd: '2017-11-22T07:00:00.000Z'
      }, {
        user_id: 3,
        trip_id: 4,
        rangeStart: '2017-11-02T07:00:00.000Z',
        rangeEnd: '2017-11-08T07:00:00.000Z'
      }, {
        user_id: 4,
        trip_id: 4,
        rangeStart: '2017-11-13T07:00:00.000Z',
        rangeEnd: '2017-11-23T07:00:00.000Z'
      }, {
        user_id: 4,
        trip_id: 4,
        rangeStart: '2017-11-06T07:00:00.000Z',
        rangeEnd: '2017-11-11T07:00:00.000Z'
      }, {
        //trip 1
        user_id: 1,
        trip_id: 1,
        rangeStart: '2017-08-04T07:00:00.000Z',
        rangeEnd: '2017-08-13T07:00:00.000Z'
      }, {
        user_id: 2,
        trip_id: 1,
        rangeStart: '2017-08-04T07:00:00.000Z',
        rangeEnd: '2017-08-13T07:00:00.000Z'
      }, {
        user_id: 3,
        trip_id: 1,
        rangeStart: '2017-08-04T07:00:00.000Z',
        rangeEnd: '2017-08-13T07:00:00.000Z'
      }, {
        user_id: 4,
        trip_id: 1,
        rangeStart: '2017-08-04T07:00:00.000Z',
        rangeEnd: '2017-08-13T07:00:00.000Z'
      },{ // trip2
        //trip 3
        user_id: 1,
        trip_id: 2,
        rangeStart: '2017-09-10T07:00:00.000Z',
        rangeEnd: '2017-09-20T07:00:00.000Z'
      }, {
        user_id: 1,
        trip_id: 2,
        rangeStart: '2017-09-23T07:00:00.000Z',
        rangeEnd: '2017-09-27T07:00:00.000Z'
      }, {
        user_id: 2,
        trip_id: 2,
        rangeStart: '2017-09-11T07:00:00.000Z',
        rangeEnd: '2017-09-21T07:00:00.000Z'
      }, {
        user_id: 2,
        trip_id: 2,
        rangeStart: '2017-09-24T07:00:00.000Z',
        rangeEnd: '2017-09-28T07:00:00.000Z'
      }, {
        user_id: 3,
        trip_id: 2,
        rangeStart: '2017-09-12T07:00:00.000Z',
        rangeEnd: '2017-09-22T07:00:00.000Z'
      }, {
        user_id: 4,
        trip_id: 2,
        rangeStart: '2017-09-13T07:00:00.000Z',
        rangeEnd: '2017-09-23T07:00:00.000Z'
      }]);
      return Promise.all(availability.invokeMap('save'));
    })
    .error(err => {
      console.error('ERROR: failed to create availability');
      throw err;
    })
    .catch((err) => {
      console.log(err);
      console.log('Warning: this availability already exists');
    });

};
