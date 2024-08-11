const mongoose = require("mongoose")

mongoose.connect("")


const UserSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
        trim: true,
        maxLength: 30
    },
    last_name: {
        type: String,
        required: true,
        trim: true,
        maxLength: 30
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    }
})

const AccountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
})

const User = mongoose.model('User', UserSchema)
const Account = mongoose.model('Account', AccountSchema)

module.exports = {
    User,
    Account
}