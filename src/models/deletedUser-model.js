const mongoose = require('mongoose')

const deletedUserSchema = new mongoose.Schema ({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    creationDate: {
        type: Date
    },
    updateDate: {
        type: Date,
        default: Date.now
    },
    deletionDate: {
        type: Date,
        required: true
    }
})

module.exports = mongoose.model('DeletedUsers', deletedUserSchema)