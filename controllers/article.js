const cron = require('node-cron');

const Article = require('../models/article');

const createOrUpdateArticle = async (bodyData, userId) => {
  try {
    const { articleId, title, description, featureImage, thumbnail, isDraft = false } = bodyData;

    if (articleId) {
      return await Article.findOneAndUpdate(
        { _id: articleId, authorId: userId },
        { title, description, featureImage, thumbnail, isDraft, $unset: { publishTime: '' } },
      );
    }

    return await Article.create({
      title,
      description,
      featureImage,
      thumbnail,
      isDraft,
      authorId: userId,
    });
  } catch (err) {
    throw new Error(`Error while posting article ${err}`);
  }
};

const deleteArticle = async (articleId, userId) => {
  try {
    return await Article.deleteOne({ _id: articleId, authorId: userId });
  } catch (err) {
    throw new Error(`Error while deleting article ${err}`);
  }
};

const getAllArticles = async () => {
  try {
    const allArticles = await Article.find({ isDraft: false })
      .populate({ path: 'authorId', select: { username: 1, _id: 0 } })
      .select({ isDraft: 0, publishTime: 0, createdAt: 0 })
      .sort({ updatedAt: -1 })
      .lean();

    return allArticles;
  } catch (err) {
    throw new Error(`Error while fetching all articles ${err}`);
  }
};

const getMyArticles = async userId => {
  try {
    const myArticles = await Article.find({ authorId: userId })
      .populate({ path: 'authorId', select: { username: 1, _id: 0 } })
      .sort({ updatedAt: -1 })
      .lean();
    return myArticles;
  } catch (err) {
    throw new Error(`Error while fetching my articles ${err}`);
  }
};

const getArticleById = async articleId => {
  try {
    return await Article.findById(articleId)
      .populate({ path: 'authorId', select: { username: 1 } })
      .select({ createdAt: 0 })
      .lean();
  } catch (err) {
    throw new Error(`Error while fetching article with articlId = ${articleId} ${err}`);
  }
};

const scheduleArticle = async (bodyData, articleId, userId) => {
  try {
    const { publishTime } = bodyData;
    return await Article.updateOne(
      { _id: articleId, authorId: userId },
      { publishTime, isDraft: true },
    );
  } catch (err) {
    throw new Error(`Error while fetching article with articlId = ${articleId} ${err}`);
  }
};

// Cron Job
const publishScheduledArticle = async () => {
  console.log('running every minute');
  try {
    const currTime = new Date();
    return await Article.updateMany(
      { publishTime: { $lte: currTime }, isDraft: true },
      { isDraft: false },
    );
  } catch (err) {
    throw new Error(`Error while publishing article cron job ${err}`);
  }
};

cron.schedule('* * * * *', publishScheduledArticle);

module.exports = {
  createOrUpdateArticle,
  getAllArticles,
  getMyArticles,
  getArticleById,
  deleteArticle,
  scheduleArticle,
};
