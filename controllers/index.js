const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const configration = require("../models/knexfile");
const database = require("knex")(configration);
const cors = require("cors");
const serveStatic = require("serve-static");
const path = require("path");

const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(cors());

app.use(serveStatic(path.join(__dirname, "../dist")));

app.get("/api/dishes", async (req, res) => {
  try {
    const dishes = await database("dishes").select();
    res.status(200).json(dishes);
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.post("/api/dishes", async (req, res) => {
  const dish = req.body;

  for (let reqParam of ["name", "genre", "category"]) {
    if (!dish[reqParam]) {
      return res.status(422).send({
        error: `Expected format: { name: , genre: ,category: }. Missing ${reqParam} property`,
      });
    }
  }

  try {
    const id = await database("dishes").insert({
      name: dish.name,
      genre: dish.genre,
      category: dish.category,
    });
    res.status(201).json({ id });
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.delete("/api/dishes/:id", async (req, res) => {
  try {
    const id = await database("dishes")
      .where("id", req.params.id)
      .del();

    res.status(204).json({ id });
  } catch (error) {
    res.status(404).json({ error });
  }
});

app.patch("/api/dishes/:id", async (req, res) => {
  const dish = req.body;
  try {
    const id = await database("dishes")
      .where("id", req.params.id)
      .update({
        name: dish.name,
        genre: dish.genre,
        category: dish.category,
      });
    res.status(204).json({ id });
  } catch (error) {
    res.status(404).json({ error });
  }
});

app.get("/api/dishes/:id", async (req, res) => {
  try {
    const dish = await database("dishes")
      .where("id", req.params.id)
      .select();

    if (dish.length) {
      res.status(200).json(dish);
    } else {
      res.status(404).json({
        error: `Could not find dish with genre ${req.params.id}`,
      });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.listen(PORT, () => {
  console.log(`App is running on licalhost ${PORT}`);
});
