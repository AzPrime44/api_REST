const queryToFetch = require('../database/queryToFetch.js');
const {
  formatageToRegroup,
  envoyerXmlOrJSON,
} = require('../services/service.js');

const getArticles = async (req, res) => {
  const articles = await queryToFetch.getArticles();
  envoyerXmlOrJSON(req, res, articles);
};

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
  getArticles,
  getArticlesGroupedByCategories,
  getArticleDependingOnCategorie,
};
