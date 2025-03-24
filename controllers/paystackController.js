const paystackModel = require('../Model/paystack')
const axios = require('axios')
const SECRET_KEY = process.env.SECRET_KEY;
const formattedDate = new Date().toLocaleString()

exports.initializePayment = async(req,res) =>{
  try{
    const {email,amount} = req.body;

    const paymentData = {
      email,
      amount: amount * 100
    };

    const response = await axios.post(`https://api.paystack.com/transaction/initialize`,paymentData,{
      headers: {
        Authorization: `Bearer ${SECRET_KEY}`
      }
    });

    const {data} = response?.data;
    const payment = new paystackModel({
      amount,
      email,
      reference: data?.reference,
      paymentDate:formattedDate
    });
    await payment.save();
    res.status(200).json({
      message: 'Payment Initialize Successful',
      data: {
      authorization_url: data?.authorization_url,
      reference: data?.reference
    },transactionDetails: payment});
  }catch(err){
    console.error(err.message)
    res.status(500).json({message: 'Error Intializing Payment'})
  }
};


exports.verifyPayment = async(req,res) =>{
  try{
    const {reference} = req.query;
    
    const response = await axios.get(`https://api.paystack.com/transaction/verify/${reference}`,{
      headers: {
        Authorization: `Bearer ${SECRET_KEY}`
      }
    });
    const {data} = response;

    if(data?.data?.status && data?.data?.status === 'success'){
      const transaction = await paystackModel.findOneAndUpdate({reference},{status: 'Success'},{new:true});
      res.status(200).json({message: 'Payment Successful',
        data:transaction
      })
    }else{
      const transaction = await paystackModel.findOneAndUpdate({reference},{status: 'Failed'},{new:true});
      res.status(200).json({message: 'Payment Failed',
        data:transaction
      })
    }
  }catch(err){
    console.error(err.message)
    res.status(500).json({message: 'Error verifying Payment'})
  }
};