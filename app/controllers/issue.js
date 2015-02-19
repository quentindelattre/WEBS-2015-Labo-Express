var
	_ = require('underscore'),
	express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Issue = mongoose.model('Issue'),
  User = mongoose.model('User'),
  IssueType = mongoose.model('IssueType'),
  Action = mongoose.model('Action'),
  Comment = mongoose.model('Comment');

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
		status: issue.status,
		comments: issue.comments,
		tags: issue.tags,
		actions: issue.actions
	}
}

router.route('/')
	.get(function(req, res, next) {
		Issue.find(function (err, issues) {
		  if (err) return next(err);
		  res.json(_.map(issues, function(issue) {
				return convertMongoIssue(issue);
			}));
		});
	})
/*

	.post(function (req, res, next) {
		var issue = new Issue({
			name: req.body.name,
			description: req.body.description
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

	.put(function(req, res, next) {
		Issue.findById(req.params.id, function(err, issue) {
			issue.name = req.body.name;
			issue.description = req.body.description;

			issue.save(function(err, issueSaved) {
				res.json(convertMongoIssue(issueSaved));
			});
		});
	})

	.delete(function(req, res, next) {
		Issue.findByIdAndRemove(req.params.id, function(err) {
			res.status(204).end();
		});
	});
*/