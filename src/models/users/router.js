const router = require('express').Router();
const Controller = require('./controller');

router.post('/signup', (req, res) => Controller.signup(req, res));
router.post('/login', (req, res) => Controller.login(req, res));

module.exports = router;