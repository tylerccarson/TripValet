
exports.up = function(knex, Promise) {
  return knex.schema.table('confirmed', function (table) {
    table.boolean('confirmed').notNull().defaultTo(false);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('confirmed', (table) => {
    table.dropColumn('confirmed');
  });
};
