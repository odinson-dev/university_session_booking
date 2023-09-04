const router = require('express').Router();
const Controller = require('./controller');
const validateTokenAndRole = require('../../middleware/authenticate')

router.get('/allsessions', validateTokenAndRole('student'), (req, res) => Controller.getAvailableSession(req, res));
router.post('/booksession', validateTokenAndRole('student'), (req, res) => Controller.bookSession(req, res));
router.get('/pendingsession', validateTokenAndRole('dean'), (req, res) => Controller.getPendingSession(req, res));

module.exports = router;