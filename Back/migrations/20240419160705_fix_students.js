/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function (knex) {
  return knex.schema.table("students", (table) => {
    table.string("group", 100);
    table.dropColumn("group_id");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function (knex) {
  return knex.schema.table("students", (table) => {
    table.dropColumn("goup");
    table.string("group_id", 255);
  });
};
