const models = require('../models');

exports.seed = function (knex, Promise) {

  return models.Availability.where({ trip_id: '1' }).fetch()
    .then((availability) => {
      if (availability) {
        throw availability;
      }
      return models.Availability.forge({
        user_id: 1,
        trip_id: 1,
        start: '20171015',
        end: '20171023'
        
      }).save();
    })
    .error(err => {
      console.error('ERROR: failed to create availability');
      throw err;
    })
    .catch((err) => {
      console.log('Warning: this availability already exists');
    });

};
