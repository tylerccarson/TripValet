const models = require('../models');

exports.seed = function (knex, Promise) {

  return models.Confirmed.where({ email: 'example@example.com' }).fetch()
    .then((confirmed) => {
      if (confirmed) {
        throw confirmed;
      }
      return models.Confirmed.forge({
        user_id: null,
        email: 'example@example.com',
        trip_id: '1',
        confirmed: false
        
      }).save();
    })
    .catch((err) => {
      console.error('ERROR: failed to create confirmed - ', err);
      throw err;
    });

};
