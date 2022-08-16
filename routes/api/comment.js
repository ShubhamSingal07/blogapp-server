const route = require('express').Router();

const { userAuth } = require('../../middlewares/auth');
const { postComment, fetchArticleComments } = require('../../controllers/comment');

route.post('/:articleId', userAuth, async (req, res) => {
  try {
    await postComment(req.body, req.params.articleId, req.user._id);
    res.status(200).send({
      success: true,
      message: 'Comment successfully posted',
    });
  } catch (err) {
    res.status(500).send({
      error: err.message,
    });
  }
});

route.get('/:articleId', userAuth, async (req, res) => {
  try {
    const comments = await fetchArticleComments(req.params.articleId);
    res.status(200).send({
      success: true,
      comments,
    });
  } catch (err) {
    res.status(500).send({
      error: err.message,
    });
  }
});

module.exports = route;
