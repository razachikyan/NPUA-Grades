/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
  return knex.schema.dropTable("courses")
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {
  return knex.schema.createTable("courses", (table) => {
    table.increments("id");
    table.string("course_id", 255).notNullable();
    table.string("course_name", 100).notNullable();
    table.string("lecturer_id", 255).notNullable();
  });
};
