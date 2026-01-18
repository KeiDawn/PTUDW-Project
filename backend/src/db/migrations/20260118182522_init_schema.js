/**
 * @param { import("knex").Knex } knex
 */
exports.up = async function (knex) {
  // 1. USERS
  await knex.schema.createTable('users', (table) => {
    table.bigIncrements('id').primary();
    table.string('email').notNullable().unique();
    table.string('password').notNullable();
    table.string('role').notNullable().defaultTo('client');
    table.boolean('is_active').notNullable().defaultTo(true);
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });

  // 2. GAMES
  await knex.schema.createTable('games', (table) => {
    table.bigIncrements('id').primary();
    table.string('name').notNullable();
    table.string('code').notNullable().unique();
    table.string('play_type').notNullable(); // time | level
    table.boolean('is_enabled').notNullable().defaultTo(true);
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });

  // 3. GAME_RESULTS
  await knex.schema.createTable('game_results', (table) => {
    table.bigIncrements('id').primary();

    table
      .bigInteger('user_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');

    table
      .bigInteger('game_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('games')
      .onDelete('CASCADE');

    table.integer('score').notNullable().checkPositive();
    table.integer('duration').notNullable().checkPositive();
    table
      .string('result')
      .notNullable()
      .checkIn(['win', 'lose', 'draw']);

    table.timestamp('created_at').defaultTo(knex.fn.now());
  });

  // 4. RATINGS
  await knex.schema.createTable('ratings', (table) => {
    table.bigIncrements('id').primary();

    table
      .bigInteger('user_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');

    table
      .bigInteger('game_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('games')
      .onDelete('CASCADE');

    table.integer('rating').notNullable().checkBetween([1, 5]);
    table.text('comment');
    table.timestamp('created_at').defaultTo(knex.fn.now());

    table.unique(['user_id', 'game_id']);
  });
};

/**
 * @param { import("knex").Knex } knex
 */
exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('ratings');
  await knex.schema.dropTableIfExists('game_results');
  await knex.schema.dropTableIfExists('games');
  await knex.schema.dropTableIfExists('users');
};

