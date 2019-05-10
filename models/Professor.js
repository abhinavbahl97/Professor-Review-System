var mongoose = require('mongoose');

var professorSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    University: {
        type: String,
        required: true
    },
    Subject: {
        type: String,
        required: true
    },
    Rating: {
        type: Number,
        min: 0,
        max: 10,
        required: true
    },
    Review: {
        type: [String],
        required: true
    }
});

var Professor = mongoose.model('Professor', professorSchema);


module.exports = Professor;
