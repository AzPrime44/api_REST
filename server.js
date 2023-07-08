const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDOC = require('swagger-jsdoc');
const article_controller = require('./Controllers/article.controler');
const app = express();
const PORT = 3000;

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API REST',
      version: '1.0.0',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },

  apis: ['./server.js'],
};

const swaggerSpec = swaggerJSDOC(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * /articles:
 *  get:
 *      summary: retourne les articles
 *      responses:
 *                200:
 *                    description: to get articles
 *
 */

app.get('/articles', article_controller.getArticles);

/**
 * @swagger
 * /article/{id}:
 *  get:
 *      summary: retourne un article en se basant sur l id fournit en parametre
 *      parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: id valeur numerique de l article
 *      responses:
 *       200:
 *         description: obtenir l article en fonction de l'id
 *
 */
app.get('/article/:id', article_controller.getArticle);

/**
 * @swagger
 * /categories:
 *  get:
 *      summary:
 *               retourne les categories
 *      description:
 *                  retourne les categories
 *      responses:
 *                200:
 *                    description: obtenir les categories
 *
 */
app.get('/categories', article_controller.getCategories);

/**
 * @swagger
 * /articles/grouped:
 *  get:
 *      summary:
 *               retourne les articles groupés en categories
 *      description:
 *                  retourne les articles groupés en categories
 *      responses:
 *                200:
 *                    description: to get articles
 *
 */

app.get('/articles/grouped', article_controller.getArticlesGroupedByCategories);
/**
 * @swagger
 * /categories/{id}/article:
 *  get:
 *      summary: retourne un article en se basant sur l id fournit en parametre
 *      parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: id valeur numerique de l article
 *      responses:
 *       200:
 *         description: obtenir l article en fonction de l'id
 *
 */
app.get(
  '/categories/:id/article',
  article_controller.getArticleDependingOnCategorie
);

app.listen(PORT, () => {
  console.log(`Listening on port http://localhost:${PORT}`);
});
