var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	CommentSchema = mongoose.model('Comment').schema;

var IssueSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  issuetype: { type: Schema.Types.ObjectId, ref: 'IssueType' },
  updatedOn: { type: Date, default: Date.now },
  description: String,
  place: String,
  status: [ String ],
  comments: [CommentSchema],
  tags:[ String ],
  actions:{ type: Schema.Types.ObjectId, ref: 'Action' }
});



IssueSchema.pre('save', function(next){
	this.updatedOn = new Date();
	next();
});

mongoose.model('Issue', IssueSchema);

/*
IssueType.find()
    .populate('issuetype')
    .exec(function(err, issues) {
        // Do something with the issues
    });
*/