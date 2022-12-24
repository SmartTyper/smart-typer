import { Knex } from 'knex';

async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('lessons', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('content_type').notNullable();
    table.string('creator_type').notNullable();
    table.boolean('has_voice_acting').notNullable().defaultTo(true);
    table.string('music_acting_url').notNullable();
    table.text('content').notNullable();
    table.dateTime('created_at').notNullable().defaultTo(knex.fn.now());
    table.dateTime('updated_at').notNullable().defaultTo(knex.fn.now());
  });
}

async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('lessons');
}

export { down, up };
