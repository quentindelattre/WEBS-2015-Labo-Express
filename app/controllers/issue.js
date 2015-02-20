var
	_ = require('underscore'),
	express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Issue = mongoose.model('Issue'),
  User = mongoose.model('User'),
  IssueType = mongoose.model('IssueType'),
  Action = mongoose.model('Action');

module.exports = function (app) {
  app.use('/api/issues', router);
};

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
		    .populate('author','firstname lastname')
		    .populate('issuetype','name description')
		    .exec(function(err, issues) {
			    if (err) return next(err);
				res.json(_.map(issues, function(issue) {
					return convertMongoIssue(issue);
				}));
		    });
	})

	.post(function (req, res, next) {
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
			console.log(err);
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
			res.json(issue.actions);
		});
/*
		Issue.findById()
		    .populate('actions')
		    .exec(req.params.id, function(err, issue) {
			    if (err) return next(err);
				res.json(convertMongoIssue(issue));
				});
*/
	})
	.post(function (req, res, next) {
		Issue.findById(req.params.id)
		.populate('actions')
		.exec(function(err, issue) {
			var action = new Action({
				author: req.body.author,
				date: req.body.date,
				actionType: req.body.actionType
			});
	
			action.save(function(err, actionSaved) {
				res.status(201).json(convertMongoAction(actionSaved));
			});
		});
	});
