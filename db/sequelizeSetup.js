// CONFIG DB
const { Sequelize } = require('sequelize');
const jokeModel = require('../models/jokeModel');
const env = process.env.NODE_ENV;
const config = require('../configs/db-config.json')[env];

// Option: Passing parameters separately (other dialects)
const sequelize = new Sequelize(config.storage, config.dialect, {
    host: config.host,
    dialect: config.dialect,
    logging: false
});

const Joke = jokeModel(sequelize);

const resetDb = process.env.NODE_ENV === "development"

sequelize.sync({ force: resetDb })
    .then(() => {
    })
    .catch((error) => {
        console.log(error)
    })

sequelize.authenticate()
    .then(() => console.log('La connexion à la base de données a bien été établie.'))
    .catch(error => console.error(`Impossible de se connecter à la base de données ${error}`))

module.exports = { sequelize, City}