exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('images', function(table) {
      table.increments('id').unsigned().primary();
      table.integer('user_id').references('id').inTable('profiles').onDelete('CASCADE');
      table.integer('trip_id').references('id').inTable('trips').onDelete('CASCADE');
      table.string('url').notNullable();
      table.string('poster', 50).notNullable();
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('images'),
  ]);
};
