const db = require('../');

const Trip = db.Model.extend({
  tableName: 'trips',
  profile: function() {
    return this.belongsToMany('Profile');
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

module.exports = db.model('Trip', Trip);
