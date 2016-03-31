var mongoose = require('mongoose');

var contentSchema = mongoose.Schema({
    title: String,
    headline: String,
    content: String,
    state: String,
    author: Object,
    published: Boolean,
    comments: [{ body: String, date: Date }],
    createDate: { type: Date, default: Date.now },
    lastEditedDate: { type: Date, default: Date.now },
    tags: { type: [String], index: true },
    meta: {
        votes: Number,
        favs:  Number
    }
});

module.exports = mongoose.model('Content', contentSchema);
