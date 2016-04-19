var mongoose = require('mongoose');

var logSchema = mongoose.Schema({
    client_ip: String,
    event: String,
    user_id: String, //if logged in
    date: Date,
    url: String, //path, dateVisited
});

module.exports = mongoose.model('Log', logSchema);
