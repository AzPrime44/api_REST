const {db, args} = require('./database');
const {Sequelize} = require('sequelize');

const getArticles = () => {
  const reqSQL = `SELECT  * from article`;
  const resut = db.query(reqSQL, args);
  return resut;
};

// gouper les articles par categories
const getArticlesGroupedByCategories = async () => {
  const query = `
  SELECT  c.libelle AS nom_categorie, a.id, a.titre, a.contenu, a.dateCreation, a.dateModification                     
     FROM article AS a
     JOIN categorie AS c ON a.categorie = c.id
     ORDER BY nom_categorie
     `;
  try {
    const resut = await db.query(query, args);
    return resut;
  } catch (error) {
    console.log(error);
  }
};

const getArticleDependingOnCategorie = async (id) => {
  const query = `SELECT * from article WHERE categorie = ?`;
  try {
    const resut = await db.query(query, {
      replacements: [`${id}`],
      type: Sequelize.QueryTypes.SELECT,
    });
    return resut;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getArticles,
  getArticlesGroupedByCategories,
  getArticleDependingOnCategorie,
};
