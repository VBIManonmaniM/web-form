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
        type: Buffer,
        data: Buffer,
        contentType: String
    }
})

module.exports = mongoose.model('User', userSchema);