const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    paymentDate: {
        type: String,
        required: true
    },
    reference: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["Pending", "Success", "Failed"],
        default: "Pending"
    }
}, {
    timestamps: true
});

const paymentModel = mongoose.model('Payment', paymentSchema);
module.exports = paymentModel;