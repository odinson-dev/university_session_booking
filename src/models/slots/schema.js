const db = require('../../db/mongo');
const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
    week: String,
    day: String,
    deanId: {type: String, required: true},
    studentId: String,
});


module.exports = mongoose.model('slot', slotSchema)