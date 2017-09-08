const db = require('../');

const Confirmed = db.Model.extend({
  tableName: 'confirmed',
  trip: function() {
    return this.belongsTo('Trip');
  },
  profile: function() {
    return this.belongsTo('Profile');
  }
});

module.exports = db.model('Confirmed', Confirmed);