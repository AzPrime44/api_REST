const js2xmlparser = require('js2xmlparser');
const envoyerXmlOrJSON = (req, res, data) => {
  const format = req.query.format; // Récupérer le paramètre 'format' de l'URL

  if (format === 'xml') {
    // Convertir les données en XML
    const xml = js2xmlparser.parse('article', data);

    // Définir l'en-tête Content-Type pour XML
    res.set('Content-Type', 'application/xml');

    // Envoyer la réponse XML
    res.send(xml);
  } else {
    // Renvoyer les données en JSON par défaut
    res.json(data);
  }
};

const formatageToRegroup = (data) => {
  const groupedArticle = [];
  data.forEach((row) => {
    const existingCategory = groupedArticle.find(
      (element) => element.nom_categorie === row.nom_categorie
    );

    if (existingCategory) {
      existingCategory.article.push({
        id: row.id,
        titre: row.titre,
        contenu: row.contenu,
        dateCreation: row.dateCreation,
        dateModification: row.dateModification,
      });
    } else {
      const newCategory = {
        nom_categorie: row.nom_categorie,
        article: [
          {
            id: row.id,
            titre: row.titre,
            contenu: row.contenu,
            dateCreation: row.dateCreation,
            dateModification: row.dateModification,
          },
        ],
      };
      groupedArticle.push(newCategory);
    }
  });
  return groupedArticle;
};

module.exports = {
  formatageToRegroup,
  envoyerXmlOrJSON,
};
