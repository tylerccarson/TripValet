const db = require('../');

const Schedules = db.Model.extend({
  tableName: 'schedules',
  trip: function() {
    return this.belongsTo('Trip');
  }

});

module.exports = db.model('Schedules', Schedules);