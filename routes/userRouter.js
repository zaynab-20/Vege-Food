const {register,verify,login,updateuser,deleteuser,forgotPassword,resetPassword}=require('../controllers/userController')
const router = require('express').Router();

router.post('/register-user', register)
router.get('/verify-user/:token', verify);
router.post('/login-user', login);
router.put('/update-user/:userId',updateuser)
router.delete('/delete-user/:userId',deleteuser);
router.post('/forgot-user-password', forgotPassword);
router.post('/reset-user-password/:token', resetPassword);

module.exports=router;