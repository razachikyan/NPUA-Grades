/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function (knex) {
  return knex.schema.table("lecturers", (table) => {
    table.string("subject", 100);
    table.dropColumn("subject_id");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function (knex) {
  return knex.schema.table("lecturers", (table) => {
    table.dropColumn("subject");
    table.string("subject_id", 255);
  });
};
