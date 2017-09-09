
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('profiles', function (table) {
      table.increments('id').unsigned().primary();
      table.string('first', 100).nullable();
      table.string('last', 100).nullable();
      table.string('display', 100).nullable();
      table.string('email', 100).nullable().unique();
      table.string('phone', 100).nullable();
      table.string('avatar', 100).nullable();
      table.timestamps(true, true);
    }),
    knex.schema.createTableIfNotExists('auths', function(table) {
      table.increments('id').unsigned().primary();
      table.string('type', 8).notNullable();
      table.string('oauth_id', 30).nullable();
      table.string('password', 100).nullable();
      table.string('salt', 100).nullable();
      table.integer('profile_id').references('profiles.id').onDelete('CASCADE');
    }),
    knex.schema.createTableIfNotExists('trips', function(table) {
      table.increments('id').unsigned().primary();
      table.string('tripname', 100).notNullable();
      table.string('description', 255).nullable();
      table.string('location', 100).notNullable();
      table.string('rangeStart', 100);
      table.string('rangeEnd', 100);
      table.integer('user_id').references('id').inTable('profiles').onDelete('CASCADE');  
    }),
    knex.schema.createTableIfNotExists('confirmed', function (table) {
      table.increments('id').unsigned().primary();
      table.integer('user_id').nullable();
      table.integer('trip_id').references('id').inTable('trips').onDelete('CASCADE');
      table.boolean('confirmed').defaultTo(false);
      table.string('email', 100).notNullable();
    }),
    knex.schema.createTableIfNotExists('availability', function(table) {
      table.increments('id').unsigned().primary();
      table.integer('user_id').references('id').inTable('profiles').onDelete('CASCADE');
      table.integer('trip_id').references('id').inTable('trips').onDelete('CASCADE');
      table.string('rangeStart').notNullable();
      table.string('rangeEnd').notNullable();
    }),
    knex.schema.createTableIfNotExists('messages', function(table) {
      table.increments('id').unsigned().primary();
      table.integer('user_id').references('id').inTable('profiles').onDelete('CASCADE');
      table.integer('trip_id').references('id').inTable('trips').onDelete('CASCADE');
      table.string('text', 140).notNullable();
      table.string('user', 100).notNullable();
      table.string('avatar', 100).nullable();
      table.timestamps(true, true);
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('messages'),
    knex.schema.dropTable('availability'),
    knex.schema.dropTable('confirmed'),
    knex.schema.dropTable('trips'),
    knex.schema.dropTable('auths'),
    knex.schema.dropTable('profiles')
  ]);
};



















