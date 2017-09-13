const models = require('../models');

exports.seed = function (knex, Promise) {

  return models.Confirmed.where({ email: 'example@example.com' }).fetch()
    .then((confirmed) => {
      if (confirmed) {
        throw confirmed;
      }
      return models.Confirmed.forge({
        email: 'jhjaylim@gmail.com',
        trip_id: 4,
        confirmed: false
      }).save();
    })
    .error((err)=>{
      console.error('Failed to create new confirmation');
      throw err;
    })
    .catch((err) => {
      console.error('Warning: this confirmation exists');
      
    });

};
