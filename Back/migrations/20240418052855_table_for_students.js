/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function (knex) {
  return knex.schema.createTable("students", (table) => {
    table.increments("id");
    table.string("student_id", 255);
    table.string("firstname", 100);
    table.string("lastname", 100);
    table.string("middlename", 100);
    table.string("nickname", 100);
    table.string("password", 255);
    table.string("group_id", 255);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function (knex) {
  return knex.schema.dropTable("students");
};
