const jwt = require('jsonwebtoken')
const fs = require('fs');
const path = require('path');
const { decode } = require('querystring');
const publicKeyPath = path.join(__dirname, '..', 'public.pem');

const publicKey = fs.readFileSync(publicKeyPath);

function validateTokenAndRole(role) {
    return (req, res, next) => {
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Authorization token missing or invalid' });
        }
        
        const token = authHeader.split(' ')[1]; // Extract the token (remove "Bearer" prefix)
        
        try {
            const decoded = jwt.verify(token, publicKey, { algorithm: 'RS256' });
            if (decoded.role !== role) {
                return res.status(403).json({ message: 'Access denied' });
            }
            req.userId = decoded.userId;
            next();
        } catch (error) {
            console.log(error);
            res.status(401).json({ message: 'Invalid token' });
        }
    };
}


module.exports = validateTokenAndRole;