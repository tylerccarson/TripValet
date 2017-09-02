
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('confirmed', function (table) {
      table.string('email', 100).notNullable().unique();
      table.dropForeign('user_id');
      able.integer('user_id').nullable().alter();
    })
  ]);

};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('confirmed', function (table) {
      table.dropColumn('email');
      table.foreign('user_id').references('id').inTable('users');
      table.integer('user_id').notNullable().alter();
    })
  ]);
};
