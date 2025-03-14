const {verify,login,forgotPassword,resetPassword, resendVerificationEmail, register}=require('../controllers/userController');
const router = require('express').Router();


router.post('/register', register);
router.get('/verify-user/:token', verify);
router.post('/resendverificationemail', resendVerificationEmail);
router.post('/forgot-user-password', forgotPassword);
router.post('/reset-user-password/:token', resetPassword);
router.post('/login-user', login);


module.exports = router;