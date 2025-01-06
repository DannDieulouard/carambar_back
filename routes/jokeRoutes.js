// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const jokeController = require('../controllers/jokeController');

// Swagger pour une description globale de l'API Joke
/**
 * @swagger
 * components:
 *   schemas:
 *     Joke:
 *       type: object
 *       required:
 *         - question
 *         - answer
 *       properties:
 *         id:
 *           type: integer
 *           description: identificateur de la joke auto-incrementé
 *         question:
 *           type: string
 *           description: Le nom de la joke
 *         answer:
 *           type: string
 *           description: La chute de la joke
 *       example:
 *         id: 1
 *         question: "Quelle est la femelle du hamster ?"
 *         answer: "L’Amsterdam"
 */

// Swagger pour "addJoke"
/**
 * @swagger
 * /api/v1/addjoke:
 *   post:
 *     summary: Ajoute une joke
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *             schema:
 *              $ref: '#/components/schemas/Joke'
 *             example:
 *              question: Quelle est la femelle du hamster ?
 *              answer: L’Amsterdam
 *     responses:
 *       201:
 *         description: Succès ! La joke à été ajouté !
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/Joke'
 */


// Ajouter une joke en BDD via Postman
router.post('/addJoke', jokeController.createJoke);

// Swagger pour "/blagues"
/**
 * @swagger
 * /api/v1/blagues:
 *   get:
 *     summary: Consulte toutes les jokes
 *     responses:
 *       200:
 *         description: Succès ! La liste de jokes à été retourné !
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */

// Consulter toutes les jokes
router.get('/blagues', jokeController.getAllJokes);

// Swagger pour "/blagues/:id"
/**
 * @swagger
 * /api/v1/blagues/:id:
 *   get:
 *     summary: Consulte une joke
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: identificateur de la joke auto-incrementé
 *     responses:
 *       200:
 *         description: Succès ! La joke à été retourné !
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */

// Consulter une joke avec son Id
router.get('/blagues/:id', jokeController.getOneJoke);

// Swagger pour "/blagues/random"
/**
 * @swagger
 * /api/v1/blagues/random:
 *   get:
 *     summary: Consulte une joke aléatoire
 *     responses:
 *       200:
 *         description: Succès ! La joke aléatoire à été retourné !
 *         content:
 *           application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  question:
 *                    type: string
 *                  answer:
 *                    type: string
 */

// Consulter une joke aléatoire
router.get('/blagues/random', jokeController.getOneRandomJoke);

module.exports = router;