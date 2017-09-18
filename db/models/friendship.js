const db = require('../');

const Friendship = db.Model.extend({
  tableName: 'friendship',
  profile: function() {
    return this.belongsTo('Profile');
  }
});

module.exports = db.model('Friendship', Friendship);