var
	_ = require('underscore'),
	express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  IssueType = mongoose.model('IssueType');

module.exports = function (app) {
  app.use('/api/issuetypes', router);
};

function convertMongoIssueType(issuetype) {
	//return issuetype.toObject({ transform: true })
	return {
		id: issuetype.id,
		name: issuetype.name,
		description: issuetype.description
	}
}

router.route('/')
	.get(function(req, res, next) {
		IssueType.find(function (err, issuetypes) {
		  if (err) return next(err);
		  res.json(_.map(issuetypes, function(issuetype) {
				return convertMongoIssueType(issuetype);
			}));
		});
	})

	.post(function (req, res, next) {
		var issuetype = new IssueType({
			name: req.body.name,
			description: req.body.description
		});

		issuetype.save(function(err, issuetypeSaved) {
			res.status(201).json(convertMongoIssueType(issuetypeSaved));
		});
	});

router.route('/:id')
	.get(function(req, res, next) {
		IssueType.findById(req.params.id, function(err, issuetype) {
			res.json(convertMongoIssueType(issuetype));
		});
	})

	.put(function(req, res, next) {
		IssueType.findById(req.params.id, function(err, issuetype) {
			issuetype.name = req.body.name;
			issuetype.description = req.body.description;

			issuetype.save(function(err, issuetypeSaved) {
				res.json(convertMongoIssueType(issuetypeSaved));
			});
		});
	})

	.delete(function(req, res, next) {
		IssueType.findByIdAndRemove(req.params.id, function(err) {
			res.status(204).end();
		});
	});