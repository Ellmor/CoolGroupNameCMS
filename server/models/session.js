var mongoose = require('mongoose');

var sessionSchema = mongoose.Schema({
    client_ip: String,
    user_id: String,
    status: String,
    loggedIn: Date,
    loggedOut: Date,
    message: String
});

module.exports = mongoose.model('SessionLog', sessionSchema);
