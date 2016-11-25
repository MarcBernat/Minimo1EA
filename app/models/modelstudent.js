
var mongoose = require('mongoose');

var StudentsSchema = new mongoose.Schema({
    name: String,
    address: String,
    contacts: [],
});

module.exports = mongoose.model('Students', StudentsSchema);