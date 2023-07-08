const queryToFetch = require('../database/queryToFetch.js');
const {
  formatageToRegroup,
  envoyerXmlOrJSON,
} = require('../services/service.js');

//recuperer le article grace a son id
const getArticle = async (req, res) => {
  const id = req.params.id;
  const article = await queryToFetch.getArticle(id);
  envoyerXmlOrJSON(req, res, article);
};
const getArticles = async (req, res) => {
  const articles = await queryToFetch.getArticles();
  envoyerXmlOrJSON(req, res, articles);
};

//recupere  tous les articles en les regroupant par categorie

const getArticlesGroupedByCategories = async (req, res) => {
  try {
    const resulats = await queryToFetch.getArticlesGroupedByCategories();

    const groupedArticle = formatageToRegroup(resulats);
    envoyerXmlOrJSON(req, res, groupedArticle);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Une erreur est survenue lors de la récupération des articles.',
      error: error,
    });
  }
};
//recupere tous les categories

const getCategories = async (req, res) => {
  const articles = await queryToFetch.getCategories();
  envoyerXmlOrJSON(req, res, articles);
};

//recupere tous les articles dependement de l'id de la categorie

const getArticleDependingOnCategorie = async (req, res) => {
  try {
    const {id} = req.params;
    const articles = await queryToFetch.getArticleDependingOnCategorie(id);

    envoyerXmlOrJSON(req, res, articles);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Une erreur est survenue lors de la récupération des articles.',
      error: error,
    });
  }
};

module.exports = {
  getCategories,
  getArticle,
  getArticles,
  getArticlesGroupedByCategories,
  getArticleDependingOnCategorie,
};
