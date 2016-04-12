var mongoose = require('mongoose');

var contentSchema = mongoose.Schema({
    title: String,
    headline: String,
    content: String,
    state: { type: String, default: 'draft' },
    author: Object,
    published: { type: Boolean, default: false },
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
