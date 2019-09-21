const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phoneNo: {
        type: String,
        required: true
    },
    emailId: {
        type: String,
        required: true
    },
    jobTitle: {
        type: String,
        required: true
    },
    resume: {
        data: Buffer,
        contentType: String,
        name: String
    }
})

module.exports = mongoose.model('User', userSchema);