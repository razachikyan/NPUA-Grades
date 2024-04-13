/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

export const up = function(knex) {
    return knex.schema.createTable("evaluations", (table) => {
        table.increments("id")
        table.string("lecturer_id", 255)
        table.string("subject_id", 255)
        table.string("user_id", 255)
        table.integer("value")
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {
  return knex.schema.dropTable("evaluations");
};
