const { Joke } = require("../db/sequelizeSetup")

const findAllJokes = async (req, res) => {
    try {
        const result = await Joke.findAll()
        res.json({ message: `Il y a ${result.length} blagues.`, data: result })
    } catch (error) {
        errorHandler(error, res)
    }
}

const findJokeByPk = async (req, res) => {
    try {
        const result = await Joke.findByPk(req.params.id);
        if (!result) {
            return res.status(404).json({ message: `La blague n'existe pas.` })
        }
        
        res.json({ message: 'Blague trouvée', data: result })
    } catch (error) {
        errorHandler(error, res)
    }
}


const createJoke = async (req, res) => {
    try {
        const { question, answer } = req.body; // Assuming JSON body input
        const newJoke = await Joke.create({ question, answer });
        res.json(newJoke);
      } catch (error) {
        res.status(500).json({ error: 'Error creating joke', details: error });
      }
}

const randomJoke = async (req, res) => {
    try {
        req.body.UserId = req.user.id
        const newJoke = await Joke.create(req.body)
        res.status(201).json({ message: `Blague aléatoire tirée au sort.`, data: newJoke })
    } catch (error) {
        errorHandler(error, res)
    }
}

module.exports = { findAllJokes, findJokeByPk, createJoke, randomJoke }