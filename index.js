var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
// const uri = require('../../keys.js').mongodb.dbURI;
mongoose.connect("mongodb://localhost/test", { useNewUrlParser: true, useUnifiedTopology: true});
// mongoose.connect(process.env.MONGODB_URL || uri, { useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));

module.exports = db;