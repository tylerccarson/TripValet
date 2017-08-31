
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('confirmed', function (table) {
      table.increments('id').unsigned().primary();
      table.integer('user_id').references('id').inTable('users');
      table.integer('trip_id').references('id').inTable('trips');
      table.boolean('confirmed').defaultTo(false);
    }),
    knex.schema.createTableIfNotExists('availability', function(table) {
      table.increments('id').unsigned().primary();
      table.integer('user_id').references('id').inTable('users');
      table.integer('trip_id').references('id').inTable('trips');
      table.string('start').notNullable();
      table.string('end').notNullable();
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('confirmed'),
    knex.schema.dropTable('availability')
  ]);
};
