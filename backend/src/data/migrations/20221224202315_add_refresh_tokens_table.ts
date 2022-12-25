import { Knex } from 'knex';

async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('refresh_tokens', (table) => {
    table.increments('id').primary();
    table.string('token').notNullable();
    table
      .integer('user_id')
      .references('id')
      .inTable('users')
      .unique()
      .notNullable();
    table.dateTime('created_at').notNullable().defaultTo(knex.fn.now());
    table.dateTime('updated_at').notNullable().defaultTo(knex.fn.now());
  });
}

async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('refresh_tokens');
}

export { down, up };
