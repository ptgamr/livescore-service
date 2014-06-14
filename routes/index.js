var livescore = require('./livescore');


/*
 * GET home page.
 */

exports.index = function(req, res){
	res.render('index', { 
		title: 'Live Score Updater',
		matches: livescore.getMatches()
	});
};