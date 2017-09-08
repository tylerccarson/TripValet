const db = require('../');

const Profile = db.Model.extend({
  tableName: 'profiles',
  auths: function() {
    return this.hasMany('Auth');
  },
  messages: function() {
    return this.hasMany('Messages');
  },
  trip: function() {
    return this.hasMany('Trip');
  },
  confirmed: function() {
    return this.hasMany('Confirmed');
  },
  availability: function() {
    return this.hasMany('Availability');
  }
});

module.exports = db.model('Profile', Profile);
