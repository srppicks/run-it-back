
/* eslint-disable func-names */
exports.up = function (knex) {
  return knex.schema.createTable('Location', (table) => {
    table.increments('id').primary();
    table.integer("currGameId");
    table.string("name");
    table.float("latitude");
    table.float("longitude");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('Location');
};
