const models = require('../models');

exports.seed = function (knex, Promise) {

  return models.Trip.where({ id: '1' }).save(
    {
      rangeStart: '2017/10/01',
      rangeEnd: '2017/10/30'
    },
    {
      method: 'update'
    }
  )
    .error((err)=>{
      console.error('Failed to update trip dates');
      throw err;
    })
    .catch((err) => {
      console.log('Warning: this trip exists' );
      
    });

};

