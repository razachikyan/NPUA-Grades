/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function (knex) {
  return knex.schema.createTable("lecturers", (table) => {
    table.increments("id");
    table.string("lecturer_id", 255).notNullable();
    table.string("lecturer_name", 100).notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function (knex) {
  return knex.schema.dropTable("lecturers");
};
