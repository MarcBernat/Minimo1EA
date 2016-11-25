var mongoose = require('mongoose');

var SubjectsSchema = new mongoose.Schema({
    name: String,
    students: [{type: mongoose.Schema.Types.ObjectId, ref: 'Students'}],
    when: String
});

module.exports = mongoose.model('Subjects', SubjectsSchema);