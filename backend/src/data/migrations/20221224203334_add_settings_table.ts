import { Knex } from 'knex';

async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('settings', (table) => {
    table.increments('id').primary();
    table
      .integer('user_id')
      .references('id')
      .inTable('users')
      .unique()
      .notNullable();
    table.integer('countdown_before_game').notNullable().defaultTo(10);
    table.integer('game_time').notNullable().defaultTo(60);
    table.boolean('is_shown_in_rating').notNullable().defaultTo(true);
    table.boolean('is_sound_turned_on').notNullable().defaultTo(true);
    table.boolean('has_email_notifications').notNullable().defaultTo(true);
    table.dateTime('created_at').notNullable().defaultTo(knex.fn.now());
    table.dateTime('updated_at').notNullable().defaultTo(knex.fn.now());
  });
}

async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('settings');
}

export { down, up };
