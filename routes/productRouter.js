const express = require('express')
const { createProduct } = require('../controllers/productController');
const upload = require('../utils/multer')

const router = express.Router();

router.post('/createProduct', upload.single('productImage'), createProduct)

// router.get('/')

// router.get('/')
module.exports = router