//Import the mongoose module
const mongoose = require("mongoose");

//Set up default mongoose connection
const mongoDB = "mongodb+srv://nikhil:4Assignments%23nikhil@assignments.wgw6vvi.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: "ratham",
});

//Get the default connection
const db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));

module.exports = db;