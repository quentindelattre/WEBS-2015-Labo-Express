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
		.populate('author', 'firstname lastname')
		.exec(function (err, actions) {
		  if (err) return next(err);
		  res.json(_.map(actions, function(action) {
			  	console.log(action);
				return convertMongoAction(action);
			}));
		});
	})