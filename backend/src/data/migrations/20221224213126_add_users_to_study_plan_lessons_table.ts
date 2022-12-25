import { Knex } from 'knex';

async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users_to_study_plan_lessons', (table) => {
    table.increments('id').primary();
    table.integer('user_id').references('id').inTable('users').notNullable();
    table
      .integer('lesson_id')
      .references('id')
      .inTable('lessons')
      .notNullable();
    table.integer('priority').notNullable();
    table.dateTime('created_at').notNullable().defaultTo(knex.fn.now());
    table.dateTime('updated_at').notNullable().defaultTo(knex.fn.now());
  });
}

async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('users_to_study_plan_lessons');
}

export { down, up };
