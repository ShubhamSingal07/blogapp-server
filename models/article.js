const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId;

const articleSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    featureImage: String,
    thumbnail: String,
    isDraft: { type: Boolean, default: false },
    authorId: { type: ObjectId, required: true, ref: 'user' },
    publishTime: { type: Date },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const Article = mongoose.model('article', articleSchema);

module.exports = Article;
