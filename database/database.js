const {Sequelize} = require('sequelize');

const args = {type: Sequelize.QueryTypes.SELECT};

const db = new Sequelize('bloc', 'root', '', {
  dialect: 'mysql',
  host: 'localhost',
});
try {
  db.authenticate();
  console.log('Connecté à la base de données MySQL!');
} catch (error) {
  console.error('Impossible de se connecter, erreur suivante :', error);
}

module.exports = {
  args,
  db,
};
