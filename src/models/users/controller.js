const jwt = require('jsonwebtoken');
const User = require('./schema')
const path = require('path');
const fs = require('fs');
const privateKeyPath = path.join(__dirname, '..', '..', 'private.pem');
const privateKey = fs.readFileSync(privateKeyPath);

class Controller {
    login = async (req, res) => {
        const { universityId, password } = req.body;
        const user = await User.findOne({ universityId, password });
        
        if (user) {
            const token = jwt.sign({ userId: universityId, role: user.role }, privateKey, {algorithm: 'RS256'});
            res.json({ token });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    }


    signup = async (req, res) => {
        const { universityId, password, role } = req.body;
        const user = await User.create({ universityId, password, role });
        
        if (user) {
            const token = jwt.sign({ userId: universityId, role: user.role }, privateKey, {algorithm: 'RS256'});
            res.json({ token });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    }
}

module.exports = new Controller();