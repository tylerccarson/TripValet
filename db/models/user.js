const db = require('../');

const User = db.Model.extend({
  tableName: 'users',
  trip: function() {
    return this.hasMany('Trip');
  },
  confirmed: function() {
    return this.hasMany('Confirmed');
  },
  availability: function() {
    return this.hasMany('Availability');
  },
  messages: function() {
    return this.hasMany('Messages');
  }
});

module.exports = db.model('User', User);
 