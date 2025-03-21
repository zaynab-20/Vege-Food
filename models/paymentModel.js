const { required } = require("joi")
const mongoose = require("mongoose")

const paymentSchema = new mongoose.Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Users",
        required: true
    },

    items: [{
        productId: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Products",
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    email: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,                                                                                                                                                                                                                                                           
        enum: ["Pending", "Successful", "Declined"],
        required: true,
        default: "Pending"
    },
    reference: {
        type: String,
        required: true
    }
}, {timestamps: true});

const paymentModel = mongoose.model("Payment", paymentSchema);

module.exports = paymentModel