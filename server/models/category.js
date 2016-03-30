/**
 * Created by D'oh on 3/30/16.
 */
var mongoose = require('mongoose');

var categorySchema = mongoose.Schema({

    name: String

});

module.exports = mongoose.model('Category', categorySchema);
