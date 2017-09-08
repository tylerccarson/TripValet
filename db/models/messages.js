const db = require('../');

const Messages = db.Model.extend({
  tableName: 'messages',
  trip: function() {
    return this.belongsTo('Trip');
  },
  profile: function() {
    return this.belongsTo('Profile');
  }
});

module.exports = db.model('Messages', Messages);