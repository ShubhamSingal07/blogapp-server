const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId;

const commentSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    articleId: { type: ObjectId, required: true },
    authorId: { type: ObjectId, ref: 'user' },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const Comment = mongoose.model('comment', commentSchema);

module.exports = Comment;
