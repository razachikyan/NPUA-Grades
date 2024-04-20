/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
  return knex.schema.table("evaluations", (table) => {
    table.integer("grade")
    table.integer("semester")
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {
  return knex.schema.table("evaluations", (table) => {
    table.dropColumn("grade")
    table.dropColumn("semester")
  })
};
