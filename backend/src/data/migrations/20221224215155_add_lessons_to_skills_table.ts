import { Knex } from 'knex';

async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('lessons_to_skills', (table) => {
    table.increments('id').primary();
    table
      .integer('skill_id')
      .references('id')
      .inTable('skills')
      .notNullable()
      .onDelete('CASCADE');
    table
      .integer('lesson_id')
      .references('id')
      .inTable('lessons')
      .notNullable()
      .onDelete('CASCADE');
    table.dateTime('created_at').notNullable().defaultTo(knex.fn.now());
    table.dateTime('updated_at').notNullable().defaultTo(knex.fn.now());
    table.integer('count').defaultTo(0).notNullable();
  });
}

async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('lessons_to_skills');
}

export { down, up };
