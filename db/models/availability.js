const db = require('../');

const Availability = db.Model.extend({
  tableName: 'availability',
  trip: function() {
    return this.belongsTo('Trip');
  },
  user: function() {
    return this.belongsTo('User');
  }

});

module.exports = db.model('Availability', Availability);