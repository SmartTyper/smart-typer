import { Knex } from 'knex';

async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users_to_skills', (table) => {
    table.increments('id').primary();
    table.integer('skill_id').references('id').inTable('skills').notNullable();
    table.integer('user_id').references('id').inTable('users').notNullable();
    table.integer('level').notNullable().defaultTo(0);
    table.dateTime('created_at').notNullable().defaultTo(knex.fn.now());
    table.dateTime('updated_at').notNullable().defaultTo(knex.fn.now());
  });
}

async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('users_to_skills');
}

export { down, up };
