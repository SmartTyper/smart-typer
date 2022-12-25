import { Knex } from 'knex';

async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('rooms', (table) => {
    table.increments('id').primary();
    table
      .integer('lesson_id')
      .references('id')
      .inTable('lessons')
      .notNullable();
    table.string('name').notNullable();
    table.boolean('is_private').notNullable();
    table.dateTime('created_at').notNullable().defaultTo(knex.fn.now());
    table.dateTime('updated_at').notNullable().defaultTo(knex.fn.now());
  });
}

async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('rooms');
}

export { down, up };
