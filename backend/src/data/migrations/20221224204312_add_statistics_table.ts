import { Knex } from 'knex';

async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('statistics', (table) => {
    table.increments('id').primary();
    table.integer('user_id').references('id').inTable('users');
    table.integer('total_time').notNullable().defaultTo(0);
    table.integer('today_time').notNullable().defaultTo(0);
    table.integer('total_lessons').notNullable().defaultTo(0);
    table.integer('today_lessons').notNullable().defaultTo(0);
    table.integer('top_speed').notNullable().defaultTo(0);
    table.integer('today_top_speed').notNullable().defaultTo(0);
    table.integer('avarage_speed').notNullable().defaultTo(0);
    table.integer('today_avarage_speed').notNullable().defaultTo(0);
    table.dateTime('created_at').notNullable().defaultTo(knex.fn.now());
    table.dateTime('updated_at').notNullable().defaultTo(knex.fn.now());
  });
}

async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('statistics');
}

export { down, up };
