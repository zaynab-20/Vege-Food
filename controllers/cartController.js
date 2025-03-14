// const cartModel = require('../models/cart')
// const productModel = require('../models/product')

// exports.addtoCart = async (req, res) =>{
//     try {
//         const {productId, userId} = req.params
//         const {quantity} = req.body
//         let newCart

//         const checkExistingCart = await cartModel.findOne({user: userId})
//         if (!checkExistingCart) {
//             const newCart = new cartModel({
//                 user: userId,
//                 items: []
//             })
//         }
//         const checkProduct = await productModel.findOne({productId})
//         if (!checkProduct) {
//             return res.status(404).json({
//                 message: 'product not found'
//             })
//         };

//         const checkContent = checkExistingCart.items.find((product)=> product.productId)
//         if (checkContent) {
//             checkContent.quantity += quantity
//         }else{
//             newCart.items.push({productId, quantity})
//         }
//         await newCart.save()
//         res.status(201).json({
//             message: 'cart created successfully'
//         })

//     } catch (error) {
//         console.log(error.message)        
//         res.status(500).json({
//             message: "Internal server error"
//         })
//     }
// }