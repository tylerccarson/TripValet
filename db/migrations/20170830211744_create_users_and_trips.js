
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('users', function (table) {
      table.increments('id').unsigned().primary();
      table.string('first', 100).notNullable();
      table.string('last', 100).notNullable();
      table.string('email', 100).notNullable().unique();
      table.string('phone', 100).nullable();
      table.timestamps(true, true);
    }),
    knex.schema.createTableIfNotExists('trips', function(table) {
      table.increments('id').unsigned().primary();
      table.string('tripname', 100).notNullable();
      table.string('description', 255).nullable();
      table.string('location', 100).notNullable();
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users'),
    knex.schema.dropTable('trips')
  ]);
};
