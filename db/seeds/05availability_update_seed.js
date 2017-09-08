const models = require('../models');

exports.seed = function (knex, Promise) {

  return models.Availability.where({ id: '1' }).save(
    {
      rangeStart: '2017/10/15',
      rangeEnd: '2017/10/23'
    },
    {
      method: 'update'
    }
  )
    .error((err)=>{
      console.error('Failed to update new trip availability');
      throw err;
    })
    .catch((err) => {
      console.log('Warning: this availability is up to date' );
    
    });

};

