
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('messages', function(table) {
      //any other kinds of information we could want available for each message? picture?
      table.increments('id').unsigned().primary();
      //is it not the 'auths' table where all of our actual user info is stored?
      table.integer('user_id').references('id').inTable('profiles');
      table.integer('trip_id').references('id').inTable('trips');
      table.string('text', 140).notNullable();
      table.string('user', 100).notNullable();
      table.timestamps(true, true);
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('messages')
  ]);
};
