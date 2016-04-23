var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var contentSchema = Schema({
    title: String,
    headline: String,
    content: String,
    state: { type: String, default: 'draft' },
    author: Object,
    published: { type: Boolean, default: false },
    comments: [{ body: String, date: Date }],
    createDate: { type: Date, default: Date.now },
    lastEditedDate: { type: Date, default: Date.now },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },

    tags: { type: mongoose.Schema.Types.ObjectId, ref: 'Tag' },
    meta: {
        votes: Number,
        favs:  Number
    }
});

module.exports = mongoose.model('Content', contentSchema);
