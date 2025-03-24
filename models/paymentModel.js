const mongoose = require('mongoose')

const paystackSchema = new mongoose.Schema({
  email: {
    type:String,
    require: true
  },
  amount: {
    type:Number,
    require: true
  },
  reference: {
    type:String,
    require: true
  },
  status: {
    type:String,
    enum: ['Pending','Success','Failed'],
    default: 'Pending'
  },
  paymentDate: {
    type:String,
    require:true
  },
},{timestamps:true});

const paystackModel = mongoose.model('Paystacks',paystackSchema);

module.exports = paystackModel;