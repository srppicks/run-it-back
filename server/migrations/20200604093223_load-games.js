
/* eslint-disable func-names */
exports.up = function (knex) {
  return knex.schema.createTable('Game', (table) => {
    table.increments('id').primary();
    table.integer('locationId');
    table.integer('ownerId');
    table.integer('playersNeeded');
    table.integer('playersIn');
    table.string('startDate');
    table.string('startTime');
    table.string('aMpM');
    table.string('timeZone');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('Game');
};
