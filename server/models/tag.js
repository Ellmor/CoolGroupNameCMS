/**
 * Created by D'oh on 4/10/16.
 */
var mongoose = require('mongoose');

var tagSchema = mongoose.Schema({

    createDate: { type: Date, default: Date.now },
    name: String

});

module.exports = mongoose.model('Tag', tagSchema);
