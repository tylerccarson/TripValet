const db = require('../');

const Confirmed = db.Model.extend({
  tableName: 'confirmed',
  trip: function() {
    return this.belongsTo('Trip');
  },
  user: function() {
    return this.belongsTo('User');
  }
});

module.exports = db.model('Confirmed', Confirmed);