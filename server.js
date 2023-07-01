const express = require('express');
const article_controller = require('./Controllers/article.controler');
const app = express();
const PORT = 3000;

app.get('/articles', article_controller.getArticles);
app.get('/articles/:id');
app.get('/categories');

app.get('/articles/grouped', article_controller.getArticlesGroupedByCategories);
app.get(
  '/categories/:id/article',
  article_controller.getArticleDependingOnCategorie
);

app.listen(PORT, () => {
  console.log(`Listening on port http://localhost:${PORT}`);
});
