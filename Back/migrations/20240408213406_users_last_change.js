/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function (knex) {
  return knex.schema.alterTable("users", (table) => {
    table.string("user_id", 255).notNullable().alter();
    table.string("session_id", 255).notNullable().alter();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function (knex) {
  return knex.schema.alterTable("users", (table) => {
    table.string("user_id", 255).alter();
    table.string("session_id", 255).alter();
  });
};
