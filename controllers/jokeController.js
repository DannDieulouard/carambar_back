const { Joke } = require("../models");
const { sequelize } = require("../models");

// Ajouter une blague en BDD via Postman
exports.createJoke = async (req, res) => {
  try {
    const joke = await Joke.create(req.body);
    res.status(201).json(joke);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Consulter toutes les blagues
exports.getAllJokes = async (req, res) => {
  try {
    const allJokes = await Joke.findAll();
    res.json(allJokes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Consulter une blague avec son Id
exports.getOneJoke = async (req, res) => {
  try {
    const joke = await Joke.findByPk(req.params.id);
    res.json(joke);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Consulter une blague aléatoire
exports.getOneRandomJoke = async (req, res) => {
  try {
    const randomJoke = await Joke.findOne({ order: [[ sequelize.literal('RANDOM()') ]] });
    res.json(randomJoke);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};