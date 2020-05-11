exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("dishes")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("dishes").insert([
        {
          name: "Miso soup",
          genre: "Japanese",
          category: "Soup",
        },
        {
          name: "Sushi",
          genre: "Japanese",
          category: "Rice",
        },
        {
          name: "Tekiyaki salmon",
          genre: "Japanese",
          category: "Main",
        },
        {
          name: "Spinach Ohitashi",
          genre: "Japanese",
          category: "Side",
        },
        {
          name: "Dumpling",
          genre: "Chinese",
          category: "Main",
        },
        {
          name: "Garilc green beans",
          genre: "Chinese",
          category: "Side",
        },
        {
          name: "Egg drop soup",
          genre: "Chinese",
          category: "Soup",
        },
        {
          name: "Fried rice",
          genre: "Chinese",
          category: "Rice",
        },
        {
          name: "Grilled chiken",
          genre: "Western",
          category: "Main",
        },
        {
          name: "Potato salad",
          genre: "Western",
          category: "Side",
        },
        {
          name: "Risotto",
          genre: "Western",
          category: "Rice",
        },
        {
          name: "Pumpkin soup",
          genre: "Western",
          category: "Soup",
        },
      ]);
    });
};
