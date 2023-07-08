const {db, args} = require('./database');
const {Sequelize} = require('sequelize');

const getArticles = () => {
  const reqSQL = `SELECT  * from article`;
  const resut = db.query(reqSQL, args);
  return resut;
};
const getCategories = () => {
  const reqSQL = `SELECT  * from categorie`;
  const resut = db.query(reqSQL, args);
  return resut;
};
const getArticle = async (id) => {
  const reqSQL = `SELECT  * from article where id = ?`;
  try {
    const resut = await db.query(reqSQL, {
      replacements: [`${id}`],
      type: Sequelize.QueryTypes.SELECT,
    });
    return resut;
  } catch (error) {
    console.log(error);
  }
  return resut;
};

// gouper les articles par categories
const getArticlesGroupedByCategories = async () => {
  const reqSQL = `
  SELECT  c.libelle AS nom_categorie, a.id, a.titre, a.contenu, a.dateCreation, a.dateModification                     
     FROM article AS a
     JOIN categorie AS c ON a.categorie = c.id
     ORDER BY nom_categorie
     `;
  try {
    const resut = await db.query(reqSQL, args);
    console.log(resut);
    return resut;
  } catch (error) {
    console.log(error);
  }
};

const getArticleDependingOnCategorie = async (id) => {
  const reqSQL = `SELECT * from article WHERE categorie = ?`;
  try {
    const resut = await db.query(reqSQL, {
      replacements: [`${id}`],
      type: Sequelize.QueryTypes.SELECT,
    });
    return resut;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getArticle,
  getCategories,
  getArticles,
  getArticlesGroupedByCategories,
  getArticleDependingOnCategorie,
};
