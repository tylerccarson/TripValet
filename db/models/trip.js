const db = require('../');

const Trip = db.Model.extend({
  tableName: 'trips',
  user: function() {
    return this.belongsToMany('User');
  },
  confirmed: function() {
    return this.hasMany('Confirmed');
  },
  availability: function() {
    return this.hasMany('Availability');
  }
});

module.exports = db.model('Trip', Trip);
