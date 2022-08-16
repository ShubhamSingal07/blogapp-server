const Comment = require('../models/comment');

const postComment = async (bodyData, articleId, userId) => {
  try {
    const { text } = bodyData;
    return await Comment.create({ text, articleId, authorId: userId });
  } catch (err) {
    throw new Error(`Error while posting comment ${err}`);
  }
};

const fetchArticleComments = async articleId => {
  try {
    return await Comment.find({ articleId })
      .populate({ path: 'authorId', select: { username: 1, _id: 0 } })
      .select({ text: 1, authorId: 1 })
      .sort({ createdAt: -1 })
      .lean();
  } catch (err) {
    throw new Error(`Error while fetching article comments ${err}`);
  }
};

module.exports = {
  postComment,
  fetchArticleComments,
};
