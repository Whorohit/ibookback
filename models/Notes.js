const mongoose = require("mongoose")
const UserSchema = mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'login'
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,

    },
    date: {
        type: Date,
        default: Date.now,
    }

})
const Notes = mongoose.model('user', UserSchema)
module.exports = Notes
