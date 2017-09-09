
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.alterTable('confirmed', function (table) {
      table.dropUnique('email');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.alterTable('confirmed', function (table) {
      table.unique('email');
    })
  ]);  
};
