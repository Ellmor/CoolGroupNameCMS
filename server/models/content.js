var mongoose = require('mongoose');

var contentSchema = mongoose.Schema({
    title: String,
    headline: String,
    content: String,
    state: String,
    author: Object,
    dateCreated: Date,
    lastEdited: Date,
    published: Boolean

});

module.exports = mongoose.model('Content', contentSchema);
