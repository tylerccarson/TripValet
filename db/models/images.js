const db = require('../');

const Images = db.Model.extend({
  tableName: 'images',
  trip: function() {
    return this.belongsTo('Trip');
  },
  profile: function() {
    return this.belongsTo('Profile');
  }
});

module.exports = db.model('Images', Images);
