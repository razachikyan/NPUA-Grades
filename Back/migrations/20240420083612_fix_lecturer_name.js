/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
  knex.schema.table("lecturers", (table) => {
    table.string("firstname")
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {
  knex.schema.table("lecturers", (table) => {
    table.string("firstname")
  })
};
