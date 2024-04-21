/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function (knex) {
  return knex.schema.table("lecturers", (table) => {
    table.string("nickname", 100);
    table.string("password", 255);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function (knex) {
  return knex.schema.table("lecturers", (table) => {
    table.dropColumn("nickname", 100);
    table.dropColumn("password", 255);
  });
};
