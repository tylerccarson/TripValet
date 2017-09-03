const models = require('../models');

exports.seed = function (knex, Promise) {

  return models.User.where({ email: 'example@example.com' }).fetch()
    .then((user) => {
      if (user) {
        throw user;
      }
      return models.User.forge({
        first: 'Jay',
        last: 'Lim',
        email: 'example@example.com',
        phone: '123-456-7890'
      }).save();
    })
    .error(err => {
      console.error('ERROR: failed to create user');
      throw err;
    })
    .catch((err) => {
      console.log('ERROR: this user already exists');
    });

};
