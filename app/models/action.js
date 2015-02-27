var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ActionSchema = new Schema({
  issueId: String,
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  date: { type: Date, default: Date.now },
  actionType: String
});

ActionSchema.pre('save', function(next){
	this.date = new Date();
	next();
});

mongoose.model('Action', ActionSchema);

