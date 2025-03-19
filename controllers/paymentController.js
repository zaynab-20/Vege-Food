const paymentModel = require('../models/paymentModel');
const axios = require('axios');
const SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
const formattedDate = new Date().toLocaleString()

exports.initializePayment = async (req, res) => {
    try {
        const { email, amount } = req.body;
        const paymentData = {
            email,
            amount: amount * 100,
        };
        const response = await axios.post(
            'https://api.paystack.co/transaction/initialize',
            paymentData,
            {
                headers: {
                    Authorization: `Bearer ${SECRET_KEY}`
                },
            }
        );
        const { data } = response;
        const payment = new paymentModel({
            email,
            amount,
            reference: data?.data?.reference,
            paymentDate: formattedDate,
        });
        await payment.save();
        res.status(200).json({ 
            message: 'Payment initialized successfully',
            status: 'Success',
            data: {
                authorization_url: data?.data?.authorization_url,
                reference: data?.data?.reference,
            },
            transactionDetails : payment,
         });
    
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error initializing payment', 
        status: 'Failed'
     });
        
        
    }
};

exports.verifyPayment = async (req, res) => {
    try {
        const { reference } = req.query;
        const response = await axios.get(
            `https://api.paystack.co/transaction/verify/${reference}`,
            {
                headers: {
                    Authorization: `Bearer ${SECRET_KEY}`
                },
            }
        );
        const { data } = response;
        if (data?.data?.status && data?.data?.status === 'success') {
           const transaction= await paymentModel.findOneAndUpdate(
                { reference },
                { status: 'Success' },
                { new: true }
            );
            res.status(200).json({ 
                message: 'Payment verified successfully',
                status: 'Success',
                data:transaction
             });
        }else{
            const transaction= await paymentModel.findOneAndUpdate(
                { reference },
                { status: 'Failed' },
                { new: true }
            );
            res.status(200).json({ 
                message: 'Payment verification failed',
                status: 'Failed',
                data:transaction
             });
        }
    } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error verifying payment',
    status: 'Failed'
    });

    }
};
