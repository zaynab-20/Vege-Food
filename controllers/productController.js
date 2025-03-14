const productModel = require('../models/product')
const cloudinary = require('../config/cloudinary')
const fs = require('fs')

exports.createProduct = async (req, res) =>{
    try {
        const {name, price, quantity, description} = req.body;

        const  result = await cloudinary.uploader.upload(req.file.path)
        console.log(result);
            // fs.unlinkSync(req.file.path);

        const product = new productModel({
            name,
            price,
            quantity,
            description,
            productImage: {
                imageUrl:result.secure_url, 
                publicId: result.public_id
            }
        }); 

        await product.save();

        res.status(201).json({
            message: 'product created successfully', 
            data: product
        })
    } catch (error) {
        console.log(error.message);
        
        res.status(500).json({
            message: 'internal server error '
        })
    }
};

exports.getAllProducts = async (req, res) =>{
    try {

        const AllProuduct = await productModel.find()

        res.status(200).json({
            message: 'kindly find below all products ', 
            data: AllProuduct
        })

    } catch (error) {

        console.log(error.message)
        res.status(500).json({
            message: 'internal server error '
    })
    
    }

};

exports.getOneProduct = async (req, res) =>{
    try {
        const {id} = req.params

        const product = await productModel.findById(id);

        if (!product) {
            return res.status(404).json({
                message: 'product not found'
            })
        }

        res.status(200).json({
            message: 'product found',
            data: product
        })
        
    } catch (error) {
        console.log(error.message);
        
      res.status(500).json({
        message: 'internal server error'
      })    
    }
};

exports.updateProduct = async (req, res) =>{
    try {
        const {id} = req.params

        const  {productname, price, amount, description, quantity} = req.body

        const product  = await productModel.findById(id);

        if (!product) {
            return res.status(404).json({
                message: 'product not found'
            })
        }else{
            if (req.files) {
                await cloudinary.uploader.destroy(product.productImage.publicId)
            }
        }
        const  result = await cloudinary.uploader.upload(req.file.path);

        // fs.unlinkSync(req.file.path);


        const data = {
            productname,
            price,
            amount,
            quantity,
            description,
            productImage: {
                imageUrl: result.secure_url,
                publicId: result.public_id
            }
        }
        const newUpdate = await productModel.findByIdAndUpdate(id, data, {new: true})
            
        res.status(200).json({
                message: 'product has been updated successfully', 
                data: newUpdate
            })
        }
     catch (error) {
        console.log(error.message)        
        res.status(500).json({
            message: 'internal server error'
        })
    }
};

exports.deleteProduct = async (req, res) =>{
    try {
        const { id } = req.params

        const product = await productModel.findById(id)

        if (!product) {
            res.status(404).json({
                message: 'product not found'
            })
        }

        const DeleteProduct = await productModel.findByIdAndDelete(id)

        if (DeleteProduct) {
            await cloudinary.uploader.destroy(product.productImage.publicId)

        }

        res.status(200).json({
            message: 'product deleted successfully',
            data: DeleteProduct
        })

    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            message: 'internal server error '
        })
    }
}



