const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const courseSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    isPublic: {
        type: Boolean,
        default: false
    },
    enrolledUsers: [{type: Schema.Types.ObjectId, ref: 'User'}],
    courseCreator: {type: Schema.Types.ObjectId, ref: 'User'},
    dateAdded: {type: String},

});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
