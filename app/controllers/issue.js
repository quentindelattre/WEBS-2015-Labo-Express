var _ = require('underscore'),
	express = require('express'),
	router = express.Router(),
	mongoose = require('mongoose'),
	Issue = mongoose.model('Issue'),
	User = mongoose.model('User'),
	IssueType = mongoose.model('IssueType'),
	Action = mongoose.model('Action');
	
	
module.exports = function(app) {
	app.use('/api/issues', router);
};

var convertMongoAction = function convertMongoAction(action) {
	return {
		id: action.id,
		issueId: action.issueId,
		author: action.author,
		date: action.date,
		actionType: action.actionType,
	}
}


function convertMongoIssue(issue) {
	//return issue.toObject({ transform: true })
	return {
		id: issue.id,
		author: issue.author,
		issuetype: issue.issuetype,
		updatedOn: issue.updatedOn,
		description: issue.description,
		place: issue.place,
		issueStatus: issue.issueStatus,
		comments: issue.comments,
		tags: issue.tags,
		actions: issue.actions
	}
}


router.route('/')
	.get(function(req, res, next) {
		Issue.find()
		.populate('author', 'firstname lastname')
		.populate('issuetype', 'name description')
		.populate('actions')
		.exec(function(err, issues) {
			if (err) return next(err);
			res.json(_.map(issues, function(issue) {
				return convertMongoIssue(issue);
			}));
		});
	})
	.post(function(req, res, next) {
		var issue = new Issue({
			author: req.body.author,
			issuetype: req.body.issuetype,
			description: req.body.description,
			place: req.body.place,
			issueStatus: req.body.issueStatus,
			comments: req.body.comments,
			tags: req.body.tags
		});
		issue.save(function(err, issueSaved) {
			res.status(201).json(convertMongoIssue(issueSaved));
	});
});
router.route('/:id')
	.get(function(req, res, next) {
		Issue.findById(req.params.id, function(err, issue) {
			res.json(convertMongoIssue(issue));
		});
})
/*
	.put(function(req, res, next) {
		Issue.findById(req.params.id, function(err, issue) {
			issue.id = req.body.id;
			issue.description = req.body.description;

			issue.save(function(err, issueSaved) {
				res.json(convertMongoIssue(issueSaved));
			});
		});
	})
*/
router.route('/:id/actions')
	.get(function(req, res, next) {
		Issue.findById(req.params.id)
		.populate('actions')
		.exec(function(err, issue) {
// 			console.log(issue);
// 			res.json(convertMongoIssue(issue));
	});
	})
	.post(function(req, res, next) {
		require('./action');
		Issue.findById(req.params.id)
		.populate('actions')
		.exec(function(err, issue) {
			console.log(issue.id);
			var action = new Action({
				issueId: req.params.id,
				author: req.body.author,
				date: req.body.date,
				actionType: req.body.actionType
			});
			console.log(err);
			action.save(function(err, actionSaved) {
				res.status(201)
				.json(convertMongoAction(actionSaved));
			});
		});
	});