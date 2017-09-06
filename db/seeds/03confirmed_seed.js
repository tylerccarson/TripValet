const models = require('../models');

exports.seed = function (knex, Promise) {

  return models.Confirmed.where({ email: 'example@example.com' }).fetch()
    .then((confirmed) => {
      if (confirmed) {
        throw confirmed;
      }
      return models.Confirmed.forge({
        user_id: 1,
        email: 'example@example.com',
        trip_id: 1,
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
