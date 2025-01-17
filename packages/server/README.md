# SERVER SIDE GUIDELINES

# Tech information

- langage utilisé : javascript avec node.js https://nodejs.org/en/
- framework de l'application utilisé : express https://expressjs.com/fr
  - structure de l'application
  - module de routage

# Run & play with application localy

1. Set default value in .env `yarn env:default`

2. You can chose either to run the application using docker or by launching yourself the application in local and taking care of the dependencies and DB creation

## Run app manually

1. Install dependencies using yarn : `yarn install`

2. Setup database

2.a - database as container

- launch a postgre docker container with `yarn db:up`

OR 2.b - local database

- Installer `postgresql` sur son ordinateur
- Confirmez l’installation et récupérez le numéro de version : `psql --version`
- Exécuter la base de donnée : `sudo service postgresql start` (pour vérifier l’état de la BDD : `sudo service postgresql status` et pour arrêter l’exécution : `sudo service postgresql stop`) (sinon on reçoit une erreur `Error: connect ECONNREFUSED`)
- Création de la BDD automatiquement avec l'ORM sequelize au lancement du server node

3. Create the database tables: `yarn db:migrate`

4. `yarn db:seed` (Optional)

5. Interagir / tester le serveur

- make sure you have created the database
- Start the server: `yarn dev`. Server will be accessible on port 8080.

## Run app from build

`yarn build` to transpile ts into js (will be emitted in ./built)
`yarn start`

# Play with app

Once the app is launched it is accessible on port 8080 : http://localhost:8080/

# Run tests

Work In Progress (updates soon !)

# Deployment of the app on staging (and soon production!)

The backend application is hosted for testing on Heroku. Please refer to `server/HEROKU.md` to see how to interact with heroku and deployment.

# Useful documentation

- Docker : https://www.docker.com/
- Variables d'environnement : https://www.npmjs.com/package/dotenv
- Base de données
  - ORM Sequelize : https://sequelize.org/
  - doc psql (interaction DB avec la ligne de commande): https://www.postgresql.org/docs/14/app-psql.html
  - doc connexion node - postgresql : https://node-postgres.com/features/connecting
- The backend app is live and hosted on Heroku. see Heroku documentation : https://devcenter.heroku.com/categories/nodejs-support
