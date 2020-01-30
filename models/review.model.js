const mongoose = require('mongoose');
const Schema = mongoose.Schema();

const ReviewSchema = new Schema({
  body: { type: String },
  author: { type: Schema.Type.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Review', ReviewSchema);
