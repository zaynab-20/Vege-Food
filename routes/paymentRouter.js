const { initializePayment, verifyPayment } = require('../controllers/paymentController')

const router = require('express').Router()
router.post('/initialize',initializePayment)
router.get('/verify',verifyPayment)

module.exports = router;