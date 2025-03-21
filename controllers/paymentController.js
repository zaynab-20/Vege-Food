const cartModel = require("../models/cart")
const paymentModel = require("../models/payment")
const apiUrl = 'https://api.korapay.com/merchant/api/v1/charges/initialize'
const userModel = require("../models/user")
const axios = require("axios")
const {v4: uuidv4} = require("uuid")


exports.initializePayment = async (req, res) => {

    try {
        const cart = await cartModel.findOne({ user: req.params.userId }).populate("items.productId")

        if (cart.length === 0 || !cart) {
            return res.status(404).json({
                message: "Cart is empty"
            })
        }
        const price = cart.items.map((joy) => {
            return joy.productId.ProductPrice * joy.quantity
        }
        )
        const ref = uuidv4()
        const redirectUrl = `${req.protocol}://${req.get("host")}/api/v1/${ref}`

        const totalPrice = price.reduce((a, c) => { return a + c })
        console.log(process.env.KORA_SECRET)
        const user = await userModel.findOne({ _id: req.params.userId })

        const createPayment = await axios.post(apiUrl, { amount: totalPrice,
             currency: "NGN",reference: ref ,redirect_url: redirectUrl,  customer: {email: "chinasaacha05@gmail.com", name: "Chinasa"}, 
            }, { headers: { Authorization: `Bearer ${process.env.KORA_SECRET}`, "Content-Type": "application/json"} })
            
            const PaymentInitialize = await paymentModel.create({user: req.params.userId, items: cart.items, email: user.email, amount: totalPrice, reference: ref})
            console.log(createPayment.data.data)
            console.log(ref)

        res.status(201).json({
            status: "Pending",
            message: "Payment has been initialized",
            authorizationUrl: createPayment.data.data.checkout_url
        })
    }

    catch (error) {
        console.log(error)

        res.status(500).json({
            message:  error.response?.data || error.message 
        })
    }
}


exports.verifyPayment = async (req, res) => {
    try {
       const payment = await paymentModel.findById(req.params.id)
        if (!payment) {
          return  res.status(404).json({
                message: "Payment not found"
            })
        }
        const {reference} = req.params

        const createPayment = await axios.get(`https://api.korapay.com/merchant/api/v1/transactions/${reference}`, { headers: { Authorization: `Bearer ${process.env.KORA_SECRET}` } })
        console.log(createPayment);

        res.status(201).json({
            authorizationUrl: createPayment.data.data.authorization_url
        })

    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            message:  error.response.data || error.message 
        })
    }
}

