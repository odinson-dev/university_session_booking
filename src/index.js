const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const user = require('./models/users/router');
const slots = require('./models/slots/router');

const app = express();
app.use(bodyParser.json());


app.use('/', user);
app.use('/slots', slots);


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});