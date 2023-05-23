import { Knex } from 'knex';

async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users_to_rooms', (table) => {
    table.increments('id').primary();
    table
      .integer('user_id')
      .references('id')
      .inTable('users')
      .unique()
      .notNullable();
    table.integer('current_room_id').references('id').inTable('rooms');
    table
      .integer('personal_room_id')
      .references('id')
      .inTable('rooms')
      .unique()
      .notNullable();
    table.dateTime('created_at').notNullable().defaultTo(knex.fn.now());
    table.dateTime('updated_at').notNullable().defaultTo(knex.fn.now());
  });
}

async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('users_to_rooms');
}

export { down, up };
