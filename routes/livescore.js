var _ = require('underscore');

var MATCHES = [
	{
		abet: {away: 2.00, handicap: '0 : 1/2', home: 1.90},
		ebet: {away: 5.02, draw: 3.30, home: 1.81},
		home: 'Đức',
		homeAbb: 'GER',
		away: 'Bồ Đào Nha',
		awayAbb: 'POR',
		awayScore: 0,
		channel: 'VTV3',
		clips: [],
		goals: [],
		homeScore: 0,
		id: 5,
		live: 'Chưa thi đấu',
		stadium: 'Estadio Mineirao',
		status: 2,
		time: 1402761600000
	}
];


/*
 * GET home page.
 */

exports.index = function(req, res){
	res.jsonp({
		currentServerTime: (new Date()).getTime(),
		matchData: MATCHES,
		timeToNextMatch: 24988440,
		type: 'wFormLiveData'
	});
};

exports.getMatches = function() {
	return MATCHES;
};



exports.updateMatch = function(req, res){
	
	var match = req.body;

	match.status = parseInt(match.status);

	var updated = false;

	console.log(match);

	for (var i = 0 ; i < MATCHES.length; i++) {
		if (MATCHES[i].home === match.home && MATCHES[i].away === match.away) {
			MATCHES[i] = _.extend(MATCHES[i], match);
			updated = true;
			console.log(MATCHES[i]);
		}
	}

	res.render('index', { 
		title: 'Live Score Updater',
		message: updated ? 'Match Update successfully' : '',
		matches: MATCHES
	});

};

exports.insertGoal = function(req, res){
	
	var goal = req.body, inserted = false;

	console.log(goal);

	goal.owngoal = goal.owngoal ? 1 : 0;
	goal.penalty = goal.penalty ? 1 : 0;


	console.log(goal);

	for (var i = 0 ; i < MATCHES.length; i++) {

		console.log(MATCHES[i].home + " === " + goal.team + " : " + MATCHES[i].home === goal.team);
		
		if (MATCHES[i].id === parseInt(goal.matchId) && (MATCHES[i].home  ===goal.team || MATCHES[i].away === goal.team)) {
			
			MATCHES[i].goals.push(goal);

			if (goal.team === MATCHES[i].home) {

				if (goal.owngoal) {
					MATCHES[i].awayScore ++;
				} else {
					MATCHES[i].homeScore ++;
				}

			} else {
				if (goal.owngoal) {
					MATCHES[i].homeScore ++;
				} else {
					MATCHES[i].awayScore ++;
				}
			}

			inserted = true;
		}
	}

	res.render('index', { 
		title: 'Live Score Updater',
		message: inserted ? 'Goal Inserted successfully' : 'Goal can not be inserted',
		matches: MATCHES
	});
};