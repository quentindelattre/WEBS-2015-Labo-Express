var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var CommentSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  date: { type: Date, default: Date.now },
  body: String
});

CommentSchema.pre('save', function(next){
	this.date = new Date();
	next();
});

mongoose.model('Comment', CommentSchema);

