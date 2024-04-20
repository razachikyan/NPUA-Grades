/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
  return knex.schema.table("lecturers", (table) => {
    table.dropColumn("user_id")
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {
  return knex.schema.table("lecturers", (table) => {
    table.string("user_id", 255)
  })
};
