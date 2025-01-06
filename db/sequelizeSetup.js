// const { Sequelize } = require('sequelize');
// const jokeModel = require('../models/joke');
// const env = process.env.NODE_ENV || 'development';
// const config = require('../config/config.json')[env];

// // Initialize Sequelize
// const sequelize = config.dialect === 'sqlite'
//   ? new Sequelize({ storage: config.storage, dialect: config.dialect, logging: false })
//   : new Sequelize(config.database, config.username, config.password, {
//       host: config.host,
//       dialect: config.dialect,
//       logging: false,
//     });

// // Load Joke Model
// const Joke = jokeModel(sequelize);

// // Sync Database
// const resetDb = process.env.NODE_ENV === 'development';
// sequelize
//   .sync({ force: resetDb })
//   .then(() => console.log('Database synced successfully.'))
//   .catch((error) => console.error('Database sync error:', error));

// // Authenticate Connection
// sequelize
//   .authenticate()
//   .then(() => console.log('La connexion à la base de données a bien été établie.'))
//   .catch((error) =>
//     console.error(`Impossible de se connecter à la base de données: ${error}`)
//   );

// // Export Sequelize and Models
// module.exports = { sequelize, Joke };
