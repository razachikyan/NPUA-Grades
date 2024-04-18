/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function (knex) {
  return knex.schema.table("evaluations", (table) => {
    table.dropColumn("user_id");
    table.string("student_id", 255);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function (knex) {
  return knex.schema.table("evaluations", (table) => {
    table.string("user_id", 255);
    table.dropColumn("student_id");
  });
};
