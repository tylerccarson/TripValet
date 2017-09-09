
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.alterTable('trips', function (table) {
      table.dropForeign('user_id');
      table.foreign('user_id').references('id').inTable('profiles');
    }),
    knex.schema.alterTable('availability', function(table) {
      table.dropForeign('user_id');
      table.foreign('user_id').references('id').inTable('profiles');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.alterTable('trips', function (table) {
      table.dropForeign('user_id');
      table.foreign('user_id').references('id').inTable('users');
    }),
    knex.schema.alterTable('availability', function(table) {
      table.dropForeign('user_id');
      table.foreign('user_id').references('id').inTable('users');
    })
  ]);
};
