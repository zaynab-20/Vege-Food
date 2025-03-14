const {verify,login,forgotPassword,resetPassword, resendVerificationEmail, register}=require('../controllers/userController');
const router = require('express').Router();


router.post('/register', register);
router.get('/verify/:token', verify);
router.post('/resendverificationemail', resendVerificationEmail);
router.post('/forgotpassword', forgotPassword);
router.post('/resetpassword/:token', resetPassword);
router.post('/login', login);


module.exports = router;