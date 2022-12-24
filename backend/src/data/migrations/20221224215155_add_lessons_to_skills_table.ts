import { Knex } from 'knex';

async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('lessons_to_skills', (table) => {
    table.increments('id').primary();
    table.integer('skill_id').references('id').inTable('skills');
    table.integer('lesson_id').references('id').inTable('lessons');
    table.dateTime('created_at').notNullable().defaultTo(knex.fn.now());
    table.dateTime('updated_at').notNullable().defaultTo(knex.fn.now());
  });
}

async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('lessons_to_skills');
}

export { down, up };
