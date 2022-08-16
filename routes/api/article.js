const route = require('express').Router();

const { userAuth, userReqdAuth } = require('../../middlewares/auth');
const {
  createOrUpdateArticle,
  getMyArticles,
  getAllArticles,
  deleteArticle,
  getArticleById,
  scheduleArticle,
} = require('../../controllers/article');

route.post('/', userReqdAuth, async (req, res) => {
  try {
    const article = await createOrUpdateArticle(req.body, req.user._id);
    res.status(200).send({
      success: true,
      articleId: article._id,
      message: 'Article successfully created',
    });
  } catch (err) {
    res.status(500).send({
      error: err.message,
    });
  }
});

route.get('/me', userReqdAuth, async (req, res) => {
  try {
    const articles = await getMyArticles(req.user._id, req.query.isDraft === 'true');
    res.status(200).send({
      success: true,
      articles,
    });
  } catch (err) {
    res.status(500).send({
      error: err.message,
    });
  }
});

route.get('/:articleId', userAuth, async (req, res) => {
  try {
    const article = await getArticleById(req.params.articleId);
    res.status(200).send({
      success: true,
      article,
    });
  } catch (err) {
    res.status(500).send({
      error: err.message,
    });
  }
});

route.get('/', userAuth, async (req, res) => {
  try {
    const articles = await getAllArticles();
    res.status(200).send({
      success: true,
      articles,
    });
  } catch (err) {
    res.status(500).send({
      error: err.message,
    });
  }
});

route.put('/:articleId/schedule', userReqdAuth, async (req, res) => {
  try {
    console.log(req.body);
    await scheduleArticle(req.body, req.params.articleId, req.user._id);
    res.status(200).send({
      success: true,
      message: 'Article successfully scheduled',
    });
  } catch (err) {
    res.status(500).send({
      error: err.message,
    });
  }
});

route.delete('/:articleId', userReqdAuth, async (req, res) => {
  try {
    await deleteArticle(req.params.articleId, req.user._id);
    res.status(200).send({
      success: true,
      message: 'Article successfully deleted',
    });
  } catch (err) {
    res.status(500).send({
      error: err.message,
    });
  }
});

module.exports = route;
