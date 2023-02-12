import { Knex } from 'knex';

async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('lessons_to_skills', (table) => {
    table.integer('count').defaultTo(0).notNullable();
  });
}

async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable('lessons_to_skills', (table) => {
    table.dropColumn('count');
  });
}

export { down, up };
