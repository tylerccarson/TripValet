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
        rangeStart: '2017/10/01',
        rangeEnd: '2017/10/30',
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