const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        lowerCase: true
    },
    username: {
        type: String,
        require: true,
        lowerCase: true
    },
    password: {
        type: String,
        require: true
    },
    isVerified:{
        type: Boolean,
        default: false
    },
    productId: [ {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'products'
    }]
},{timestamps: true})

const userModel = mongoose.model('Users', userSchema)

module.exports = userModel