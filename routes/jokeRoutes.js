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
 *           description: identificateur de la blague auto-incrementé
 *         question:
 *           type: string
 *           description: Le nom de la blague
 *         answer:
 *           type: string
 *           description: La chute de la blague
 *       example:
 *         id: 1
 *         question: "Quelle est la femelle du hamster ?"
 *         answer: "L’Amsterdam"
 */

// Swagger pour "ajouterBlague"
/**
 * @swagger
 * /api/v1/addJoke:
 *   post:
 *     summary: Ajoute une blague
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
 *     summary: Consulte toutes les blagues
 *     responses:
 *       200:
 *         description: Succès ! La liste de blague a été retournée !
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
 *     summary: Consulte une blague
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: identificateur de la blague auto-incrementé
 *     responses:
 *       200:
 *         description: Succès ! La blague a été retournée !
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */

// Consulter une joke avec son Id
router.get('/blagues/:id', jokeController.getOneJoke);

// Swagger pour "/random"
/**
 * @swagger
 * /api/v1/random:
 *   get:
 *     summary: Consulte une blague aléatoire
 *     responses:
 *       200:
 *         description: Succès ! La blague aléatoire a été retournée !
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

// Consulter une blague aléatoire
router.get('/random', jokeController.getOneRandomJoke);

module.exports = router;