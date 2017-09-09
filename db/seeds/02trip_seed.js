const models = require('../models');

exports.seed = function (knex, Promise) {

  return models.Trip.where({ id: '1' }).fetch()
    .then((trip) => {
      if (trip) {
        throw trip;
      }
      return models.Trip.forge({
        tripname: 'Adam\'s bachelors party',
        description: 'You know the drill. Anything happens in LV, stays in LV',
        location: 'Las Vegas',
        rangeStart: '20171001',
        rangeEnd: '20171030',
        user_id: 1
      }).save();
    })
    .error((err)=>{
      console.error('Failed to create new trip');
      throw err;
    })
    .catch((err) => {
      console.log('Warning: this trip exists' );
      
    });

};