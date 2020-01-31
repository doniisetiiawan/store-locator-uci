const mongoose = require('mongoose');

const { Schema } = mongoose;

const ArticleSchema = new Schema({
  title: String,
  url: String,
  text: String,
});

ArticleSchema.virtual('date').get(function () {
  return this._id.getTimestamp();
});

mongoose.model('Article', ArticleSchema);
