exports.up = function (knex) {
  return knex.schema.createTable("dishes", (t) => {
    t.increments() // id
      .index();

    t.string("name", 200).notNullable().index();
    t.string("genre", 200).notNullable().index();
    t.string("category", 200).notNullable().index();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("dishes");
};
