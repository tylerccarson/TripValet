
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.alterTable('trips', function (table) {
      table.string('rangeStart', 100);
      table.string('rangeEnd', 100);
      table.integer('user_id').references('id').inTable('users');	
    })

  ]);

};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.alterTable('trips', function (table) {
      table.dropColumn('rangeStart');
      table.dropColumn('rangeEnd');
      table.dropForeign('user_id');
      table.dropColumn('user_id');

    })
  ]);
};
