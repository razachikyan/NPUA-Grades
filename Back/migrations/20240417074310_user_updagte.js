/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
  return knex.schema.table("users", (table) => {
    table.dropColumn("role")
    table.dropColumn("group_id")
    table.string("middlename", 100)
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {
  return knex.schema.table("users", (table) => {
    table.integer("role")
    table.string("group_id", 255)
    table.dropColumn("middlename")
  })
};
