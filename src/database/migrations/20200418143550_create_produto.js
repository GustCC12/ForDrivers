
exports.up = function(knex) {
    return knex.schema.createTable('produto', function (table) {
        table.increments();

        table.string('name').notNullable();
        table.string('description').notNullable();
        table.decimal('value').notNullable();
        table.string('quantidade').notNullable();

        table.string('usuario_id').notNullable();

        table.foreign('usuario_id').references('id').inTable('usuario');
    });
};

exports.down = function(knex) {
  return knex.schema.dropTable('produto');
};
