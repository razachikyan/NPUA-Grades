/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function (knex) {
  return knex.schema.table("users", (table) => {
    table.string("user_id", 255);
    table.string("session_id", 255);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function (knex) {
  return knex.schema.table("users", (table) => {
    table.dropColumn("user_id");
    table.dropColumn("session_id");
  });
};
