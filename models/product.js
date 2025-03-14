const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    
    userId: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Users'
    }],
    name: {
        type: String,
        require: true
    },
    price:{
        type: Number,
        require: true
    },
    quantity: {
        type: Number,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    productImage: {
        imageUrl: {
            type: String,
            require: true
        },
        publicId: {
            type: String,
            require: true
        }
    }

},{timestamps: true})

const productModel = mongoose.model('products', productSchema)

module.exports = productModel