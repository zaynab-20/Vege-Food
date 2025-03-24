const router = require('express').Router()
const { initializePayment, verifyPayment } = require('../controllers/paymentController')

router.post('/initialize/:userId',initializePayment)
router.get('/verify',verifyPayment)

module.exports = router;