const router  = require('express').Router()

const { createProduct, getAllProducts, getOneProduct, updateProduct, deleteProduct} = require('../controllers/productController')

const upload = require('../utils/multer')


router.post('/createProduct', upload.single('productImage'), createProduct)

router.get('/getAllProducts',  getAllProducts)

router.get('/getOneProduct/:id', getOneProduct)

router.put('/updateProduct/:id',upload.single('productImage'), updateProduct)

router.delete('/deleteProduct/:id',upload.single('productImage'), deleteProduct)
module.exports = router