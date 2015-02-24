var
	_ = require('underscore'),
	express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Action = mongoose.model('Action');

module.exports = function (app) {
  app.use('/api/actions', router);
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

router.route('/')
	.get(function(req, res, next) {
		Action.find()
		.populate('issueId', 'issueType')
		.populate('author', 'firstname lastname')
		.exec(function (err, actions) {
		  if (err) return next(err);
		  res.json(_.map(actions, function(action) {
				return convertMongoAction(action);
			}));
		});
	})

/*
	.post(function (req, res, next) {
		var action = new Action({
			arthor: req.body.author,
			date: req.body.date,
			actionType: req.body.actionType,
			
		});

		action.save(function(err, actionSaved) {
			res.status(201).json(convertMongoAction(actionSaved));
		});
	});

router.route('/:id')
	.get(function(req, res, next) {
		Action.findById(req.params.id).populate("author").exec(function(err, action) {
			res.json(convertMongoAction(action));
		});
	})

	.put(function(req, res, next) {
		Action.findById(req.params.id, function(err, action) {
			action.author = req.body.author;
			action.date = req.body.date;
			action.actionType = req.body.actionType;
			

			action.save(function(err, actionSaved) {
				res.json(convertMongoAction(actionSaved));
			});
		});
	})

	.delete(function(req, res, next) {
		Action.findByIdAndRemove(req.params.id, function(err) {
			res.status(204).end();
		});
	});
*/