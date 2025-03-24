const { initializePayment, verifyPayment } = require('../controllers/paystackController')

const router = require('express').Router()
router.post('/initialize',initializePayment)
router.get('/verify',verifyPayment)

module.exports = router;