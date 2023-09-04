const db = require('../../db/mongo');
const mongoose = require('mongoose');

const userSchmea = new mongoose.Schema({
    universityId: String,
    password: String,
    role: String
});

const user = mongoose.model('user', userSchmea);
module.exports = user;