const {verify,login,forgotPassword,resetPassword, resendVerificationEmail, register, getOneUser, updateUser}=require('../controllers/userController');
const router = require('express').Router();


/** 
 * @swagger
 * /api/v1/register:
 *   post:
 *     summary: this is the sign up route. used to register users to the platform
 *     requestBody: 
 *       required: true
 *       content: 
 *         application/json:
 *           schema: 
 *             type: object
 *             properties: 
 *               fullName: 
 *                 type: string
 *                 description: this is the fullName of the user
 *                 example: Joy Pabs
 *               email: 
 *                 type: string
 *                 description: this is the email of the user
 *                 example: joypabs@gmail.com
 *               gender: 
 *                 type: string
 *                 description: this is the gender of the user
 *                 example: Female
 *               password: 
 *                 type: string
 *                 description: this is the password of the user. must contain uppercase, lowercase and a special character
 *                 example: Joyp$
 *     responses: 
 *       201:
 *         description: user registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties: 
 *                 fullName: 
 *                   type: string
 *                   description: this is the fullName of the user
 *                   example: Joy Pabs
 *                 email: 
 *                   type: string
 *                   description: this is the email of the user
 *                   example: joypabs@gmail.com
 *                 gender: 
 *                   type: string
 *                   description: this is the gender of the user
 *                   example: Female
 *                 password: 
 *                   type: string
 *                   description: this is the password of the user. must contain uppercase, lowercase and a special character
 *                   example: Joyp$
 *       400:
 *         description: user with this email already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email: 
 *                   type: string
 *                   description: this is when you use a duplicate email
 *                   example: joypabs@gmail.com
 *       500:
 *         description: error registering user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: 
 *                   type: string
 *                   example: internal server error
 * 
*/

router.post('/register', register);
/** 
 * @swagger
 * /api/v1/verify/{token}:
 *   get:
 *     summary: Verify user email
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Verification token
 *     responses:
 *       200:
 *         description: User verified successfully
 *       400:
 *         description: Invalid token
 *       500:
 *         description: Internal server error
 */
router.get('/verify/:token', verify);
/** 
 * @swagger
 * /api/v1/resendverificationemail:
 *   post:
 *     summary: Resend verification email
 *     requestBody: 
 *       required: true
 *       content: 
 *         application/json:
 *           schema: 
 *             type: object
 *             properties: 
 *               email: 
 *                 type: string
 *                 description: User's email
 *                 example: joypabs@gmail.com
 *     responses:
 *       200:
 *         description: Verification email resent successfully
 *       400:
 *         description: Invalid email
 *       500:
 *         description: Internal server error
 */
router.post('/resendverificationemail', resendVerificationEmail);
/** 
 * @swagger
 * /api/v1/forgotpassword:
 *   post:
 *     summary: Forgot password
 *     requestBody: 
 *       required: true
 *       content: 
 *         application/json:
 *           schema: 
 *             type: object
 *             properties: 
 *               email: 
 *                 type: string
 *                 description: User's email
 *                 example: joypabs@gmail.com
 *     responses:
 *       200:
 *         description: Password reset link sent successfully
 *       400:
 *         description: Invalid email
 *       500:
 *         description: Internal server error
 */
router.post('/forgotpassword', forgotPassword);
/** 
 * @swagger
 * /api/v1/resetpassword/{token}:
 *   post:
 *     summary: Reset password
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Password reset token
 *     requestBody: 
 *       required: true
 *       content: 
 *         application/json:
 *           schema: 
 *             type: object
 *             properties: 
 *               password: 
 *                 type: string
 *                 description: New password
 *                 example: NewPassword$123
 *               confirmPassword: 
 *                 type: string
 *                 description: Confirm new password
 *                 example: NewPassword$123
 *     responses:
 *       200:
 *         description: Password reset successfully
 *       400:
 *         description: Invalid token or passwords do not match
 *       500:
 *         description: Internal server error
 */

router.post('/resetpassword/:token', resetPassword);

/** 
 * @swagger
 * /api/v1/login:
 *   post:
 *     summary: User login
 *     requestBody: 
 *       required: true
 *       content: 
 *         application/json:
 *           schema: 
 *             type: object
 *             properties: 
 *               email: 
 *                 type: string
 *                 description: User's email
 *                 example: joypabs@gmail.com
 *               password: 
 *                 type: string
 *                 description: User's password
 *                 example: Joyp$
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       400:
 *         description: Invalid email or password
 *       500:
 *         description: Internal server error
 */

router.post('/login', login);
/** 
 * @swagger
 * /api/v1/getOneUser/{id}:
 *   get:
 *     summary: Get one user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User retrieved successfully
 *       400:
 *         description: Invalid user ID
 *       500:
 *         description: Internal server error
 */
router.get('/getOneUser/:id', getOneUser)
/** 
 * @swagger
 * /api/v1/updateuser/{id}:
 *   put:
 *     summary: Update user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     requestBody: 
 *       required: true
 *       content: 
 *         application/json:
 *           schema: 
 *             type: object
 *             properties: 
 *               fullName: 
 *                 type: string
 *                 description: User's full name
 *                 example: Joy Pabs
 *               email: 
 *                 type: string
 *                 description: User's email
 *                 example: joypabs@gmail.com
 *               gender: 
 *                 type: string
 *                 description: User's gender
 *                 example: Female
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Invalid user ID or data
 *       500:
 *         description: Internal server error
 */

router.put('/updateuser/:id', updateUser)

module.exports = router;