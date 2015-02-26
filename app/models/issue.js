var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	CommentSchema = mongoose.model('Comment').schema;
	ActionSchema = mongoose.model('Action').schema;

var IssueSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  issuetype: { type: Schema.Types.ObjectId, ref: 'IssueType' },
  updatedOn: { type: Date, default: Date.now },
  description: String,
  place: String,
  issueStatus: [ String ],
  comments: [ CommentSchema ],
  tags:[ String ],
  actions:[ ActionSchema ]
});



IssueSchema.pre('save', function(next){
	this.updatedOn = new Date();
	next();
});

mongoose.model('Issue', IssueSchema);