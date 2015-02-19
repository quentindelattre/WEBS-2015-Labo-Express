var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var CommentSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  date: { type: Date, default: Date.now },
  body: String
});

mongoose.model('Comment', CommentSchema);

