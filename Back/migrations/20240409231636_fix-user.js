/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function (knex) {
  return knex.schema.table("users", (table) => {
    table.string("one_time_code").defaultTo("000000");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function (knex) {
  return knex.schema.table("users", (table) => {
    table.dropColumn("one_time_code");
  });
};
