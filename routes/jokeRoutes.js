const express = require('express')
const router = express.Router()
const { createJoke, findAllJokes, findJokeByPk, randomJoke} = require('../controllers/jokeController')

router
    .route('/blagues')
    .get(findAllJokes)
    .post(createJoke)

router
    .route('/blagues/:id')
    .get(findJokeByPk)

router
    .route('/blagues/random')
    .get(randomJoke)


module.exports = router