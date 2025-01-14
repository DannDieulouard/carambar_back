# CarambarCo - Landing Page avec Blagues Aléatoires

## Demand Client

Le projet consiste en la création d'une landing page qui reflète fidèlement la marque, avec un bouton qui, à chaque clic, affiche une blague aléatoire.

---

## Environnement Technique

- **Backend** :

  - Node.js
  - Express
  - Sequelize (ORM)
  - BDD : SQLite
  - Architecture MVC et API versionnée
  - Swagger pour documenter et tester l'API

- **Frontend** :

  - React (avec `vite@latest`)
  - Hébergement : GitHub Pages

- **Outils** :
  - VSCode
  - Postman
  - GitHub
  - Hébergement du Backend : [Render](https://render.com/)
  - Hébergement du Frontend : [GitHub Pages](https://github.com/)

---

## Spécifications Techniques

### API

L'API est composée de 4 endpoints principaux :

1. **Ajouter une blague via Postman** :

   - `POST /api/v1/blagues/addJoke`
   - Permet d'ajouter une blague à la base de données.

2. **Consulter toutes les blagues** :

   - `GET /api/v1/blagues`
   - Permet de récupérer toutes les blagues présentes dans la base de données.

3. **Consulter une blague par son ID** :

   - `GET /api/v1/blagues/:id`
   - Permet de récupérer une blague spécifique grâce à son `id`.

4. **Consulter une blague aléatoire** :
   - `GET /api/v1/random`
   - Permet de récupérer une blague aléatoire.

---

## Liens pour l'Évaluation

- **API** : [https://carambarapi-fuqc.onrender.com/api/v1](https://carambarapi-fuqc.onrender.com/api/v1)
- **Swagger** : [https://carambarapi-fuqc.onrender.com/api-docs/v1](https://carambarapi-fuqc.onrender.com/api-docs/v1)
- **Frontend GitHub Pages** : [https://danndieulouard.github.io/carambar_front/](https://danndieulouard.github.io/carambar_front/)
- **Repository Frontend** : [https://github.com/DannDieulouard/carambar_front/](https://github.com/DannDieulouard/carambar_front/)

---

## Procédure de Développement

1. Initialisation du projet

- Projet crée vide sur Github nommé Carambar_back :

  git clone de mon projet

- Initialiser le projet avec Node.js (node_modules, packages) :

  npm init -y

- Installer les dépendances Express, Sequelize et SQLite :

  npm install express sequelize sqlite3

- Initialiser le projet avec Sequelize (dossiers config, models, migrations et seeders) :

  npx sequelize-cli init

- Installer un mode "dev" pour faciliter le lancement de son serveur et le debug :

  npm install --save-dev nodemon

- Finaliser l'architecture MVC avec l'ajout du dossier "controllers" et renseigner nos endpoint API plus tard avec l'ajout du dossier "routes"

- Configurer notre projet config/config.json pour stipuler l'utilisation de SQLite et la génération de notre bdd via un fichier :

  "dialect": "sqlite",
  "storage": "./database.sqlite"

- Renseigner les commandes pour démarrer l'application en mode "dev" et "prod" via le fichier "package.json"

"scripts": {
"start": "node app.js", // npm start
"dev": "nodemon app.js" // npm run dev
}

- Créer le fichier "app.js" à la racine du projet qui permettra de lancer plus tard l'application

2. Architecture MVC

Modèle :

    - Sequelize propose une commande pour générer un "modèle" de données dans notre dossier "models".
    Il générera également un fichier "create-{nomDuModele}" dans le dossier "migrations" pour creer la table en bdd, ici ce sera pour notre model "Blague"
    npx sequelize-cli model:generate --name Blague --attributes question:string, answer:string

    - Valider la migration du model
    npx sequelize-cli db:migrate

Controller :

    - Créer son controller "jokeController" pour le modele "Joke" qui définera nos 4 Endpoint API :

    1. Ajouter une blague en BDD via Postman : createJoke
    2. Consulter toutes les blagues : getAlljokes
    3. Consulter une blague avec son Id : getOnejoke
    4. Consulter une blague aléatoire : getOneRandomJoke

Route :

    - Créer les routes "jokeRoutes" qui renseigneront les endpoints du Controller pour appeler l'API
    1. Ajouter une blague en BDD via Postman
    router.post('/addJoke', blagueController.createJoke);

    2. Consulter toutes les blagues
    router.get('/blagues', blagueController.getAllBlagues);

    3. Consulter une blague avec son Id
    router.get('/blagues/:id', blagueController.getOneBlague);

    4. Consulter une blague aléatoire
    router.get('/random', blagueController.getOneRandomBlague);

3. Démarrer son application

- Configurer son fichier "app.js" en renseignant Express, "jokeRoutes" pour tester notre API et le Port de notre application

// URL de base vers notre API Blague
app.use('/api/v1', jokeRoutes);

- Lancer notre application :

npm run dev

4. Données de notre base de données

   /!\ Le fichier database.sqlite doit déjà avoir été générer en amont /!\

   - Sequelize nous permet de générer via une commande, des données factices pour la table "Jokes" dans notre bdd pour tester son fonctionnement.
     Le fichier sera générer dans le dossier "seeders" et devra être compléter directement avec nos données manuellement.

   npx sequelize-cli seed:generate --name blague-data-sample

   - Pour confirmer l'ajout des données, il faut la commande Sequelize suivante :

   npx sequelize-cli db:seed:all

5. Swagger

   - Installer les dépendances swagger :

   npm install swagger-jsdoc swagger-ui-express

   - Configurer Swagger pour son application avec la création et la complétion du fichier "swagger.js".
     Pour ma part il sera dans le dossier "config"

   - Mettre à jour le fichier "app.js" pour renseigner Swagger et sa route

   app.use('/api-docs/v1', swaggerUi.serve, swaggerUi.setup(specs));

   - Mettre à jour nos routes, ici le fichier "blagueRoute" comprenant les 4 endpoints.
     Utiliser les annotations Swagger JSDoc pour que l'API soit documentés et testable directement depuis le lien Swagger

   - Enfin, lancer le serveur et rendez-vous sur le lien http://localhost:3000/api-docs/v1 en local ou https://carambarapi-fuqc.onrender.com/api-docs/v1 sur le serveur.

   npm start

6. CORS

   - Pour finaliser le projet et faire que le FRONT ONLINE Github Pages soit autorisé à communiquer avec l'API ONLINE sur le serveur Render.com
     il faut configurer le CORS pour autoriser la racine du site "https://danndieulouard.github.io/" comme suit :
     app.js

     ```
     // Add headers before the routes are defined
     app.use(function (req, res, next) {

       // Website you wish to allow to connect
       res.setHeader('Access-Control-Allow-Origin', 'https://danndieulouard.github.io/');

       // Request methods you wish to allow
       res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

       // Request headers you wish to allow
       res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');

       // Set to true if you need the website to include cookies in the requests sent
       // to the API (e.g. in case you use sessions)
       res.setHeader('Access-Control-Allow-Credentials', true);

       // Pass to next layer of middleware
       next();
     });

     app.use(cors());
     ```
