
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('messages', function(table) {
      table.increments('id').unsigned().primary();
      table.integer('user_id').references('id').inTable('profiles');
      table.integer('trip_id').references('id').inTable('trips');
      table.string('text', 140).notNullable();
      table.string('user', 100).notNullable();
      table.string('avatar', 100);
      table.timestamps(true, true);
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('messages')
  ]);
};
