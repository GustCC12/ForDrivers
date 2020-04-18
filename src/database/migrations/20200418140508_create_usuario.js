exports.up = function(knex) {
  return knex.schema.createTable('usuario', function (table) {
    table.increments('id').primary();
    table.string('login').notNullable();
    table.string('password').notNullable();
    table.string('name').notNullable();
    table.string('fone').notNullable();
    table.string('city').notNullable();
    table.string('uf', 2).notNullable();
    table.string('address').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('usuario');
};
