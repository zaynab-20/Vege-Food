const userModel = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { verify_account } = require('../helper/account-verification')
const  {emailSender}  = require("../middleware/nodemailer")

exports.register = async (req, res) => {
    try {
        const { fullName, email, password } = req.body
        const existingUser = await userModel.findOne({ email: email.toLowerCase()});
        if (existingUser) {
            return res.status(400).json({
                message: `Account with ${email} already exist `
            })
        }
        const saltedRound = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, saltedRound);
        const user = new userModel({
            fullName,
            email,
            password: hashedPassword
        });
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '5mins' });
        const link = `${req.protocol}://${req.get('host')}/api/v1/verify-user/${token}`;
        const firstName = user.fullName.split(' ')[0];

        const mailDetails = {
            subject: 'Email Verification',
            email: user.email,
            html: verify_account(link, firstName)
        };
        await emailSender(mailDetails);
        await user.save();
        res.status(201).json({
            message: 'Account Created Successfully',
            data: user,
        })

    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: 'Error Registering User'
        })

    }
}

exports.verify = async (req, res) => {
    try {
        const { token } = req.params;

        if (!token) {
            return res.status(404).json({
                message: 'Token not found'
            })
        };

        jwt.verify(token, process.env.JWT_SECRET, async (error, payload) => {
            if (error) {
                if (error instanceof jwt.JsonWebTokenError) {
                    const { userId } = jwt.decode(token);

                    if (!userId) {
                        return res.status(404).json({
                            message: 'UserId not found'
                        })
                    };

                    const user = await userModel.findById(userId);

                    if (!user) {
                        return res.status(404).json({
                            message: 'user not found'
                        })
                    };

                    if (user.isVerified === true) {
                        return res.status(400).json({
                            message: ' Account has already been verified'
                        })
                    }

                    const newToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '5mins' });
                    const link = `${req.protocol}://${req.get('host')}/api/v1/verify-user/${newToken}`;
                    const firstName = user.fullName.split(' ')[0];

                    const mailDetails = {
                        subject: 'Resend: Email Verification',
                        email: user.email,
                        html: verify_account(link, firstName)
                    };

                    emailSender(mailDetails);

                    res.status(200).json({
                        message: 'Session expired: Link has been sent to your Email address'
                    })
                }
            } else {
                const user = await userModel.findById(payload.userId);

                if (!user) {
                    return res.status(404).json({
                        message: 'User not found'
                    })
                };

                if (user.isVerified === true) {
                    return res.status(400).json({
                        message: 'Account has already been verified'
                    })
                }

                user.isVerified = true;
                await user.save();

                res.status(200).json({
                    message: 'Account verified successfully'
                })
            }
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: 'Error Verifying User'
        })
    }
};

exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      if (!email) {
        return res.status(400).json({
          message: 'Please input email'
        })
      };
  
      if (!password) {
        return res.status(400).json({
          message: 'Please input password'
        })
      };
  
      const user = await userModel.findOne({ email: email.toLowerCase() });
  
      if (!user) {
        return res.status(404).json({
          message: 'Account does not exist'
        })
      };
  
      const isCorrectPassword = await bcrypt.compare(password, user.password);
  
      if (!isCorrectPassword) {
        return res.status(400).json({
          message: 'Incorrect Password'
        })
      };
  
      if (user.isVerified === false) {
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '5mins' });
        const link = `${req.protocol}://${req.get('host')}/api/v1/verify-user/${token}`;
        const firstName = user.fullName.split(' ')[0];
  
        const mailDetails = {
          subject: 'Email Verification',
          email: user.email,
          html: verify_account(link, firstName)
        };
  
        emailSender(mailDetails);
        res.status(400).json({
          message: 'Account Not Verified: Link has been sent to your email'
        })
      };
  
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1day' });
  
      res.status(200).json({
        message: 'Account Successfully Logged In',
        data: user.fullName,
        token
      })
  
    } catch (error) {
      console.log(error.message);
      res.status(500).json({
        message: 'Error Logging user IN'
      })
    }
  };

  exports.updateuser = async (req, res) => {
    try {
      const { userId } = req.params;
  
      const  user = await userModel.findById(userId)
  
      if (!user) {
        return res.status(404).json({
          message: "user not found"
        })
      };
  
      const data = {
        fullName,
        email
      }
  
      const updateduser = await userModel.findByIdAndUpdate(user, data, { new: true })
  
      res.status(200).json({
        message: "user updated successfully",
        date: updateduser
      })
  
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  };

  exports.deleteuser = async (req, res) => {
    try {
      const {userId} = req.params;
    
      const user = await userModel.findOne({ _id: userId }, { email: email.toLowerCase() });
  
      if (!user) {
        return res.status(404).json({
          message: 'User not found'
        })
      };
  
      const deleteduser = await userModel.findByIdAndDelete(user._id);
  
      if (deleteduser) {
        const user = await userModel.findById(userId);
        return res.status(200).json({
          message: 'User deleted successfully'
        })
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).json({
        message: 'Error Deleting User'
      })
    }
  };
  
  exports.forgotPassword = async (req, res) => {
    try {
      const { email } = req.body;
  
      const user = await userModel.findOne({ email: email.toLowercCase() });
  
      if (!user) {
        return res.status(404).json({
          message: 'User not found'
        })
      };
  
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1min' });
      const link = `${req.protocol}://${req.get('host')}/api/v1/reset-password/${token}`; //consumed link from frontend
      const firstName = user.fullName.split(' ')[0];
  
      const mailDetails = {
        subject: 'RESET PASSWORD',
        email: user.email,
        html: reset_password(link, firstName)
      };
  
      emailSender(mailDetails);
      res.status(200).json({
        message: 'Link has been sent to email'
      })
    } catch (error) {
      console.log(error.message);
      if (error instanceof jwt.JsonWebTokenError) {
        return res.status(400).json({
          message: 'Session expired, Please login to continue'
        })
      }
      res.status(500).json({
        message: 'Error: Cannot forget pasword'
      })
    }
  };
  
  
exports.resetPassword = async (req, res) => {
    try {
      const { token } = req.params;
      const { password, confirmPassword } = req.body;
  
      if (!token) {
        return res.status(404).json({
          message: 'token not found'
        })
      };
  
      const { userId } = jwt.decode(token);
      const user = await userModel.findById(userId);
  
      if (!user) {
        return res.status(404).json({
          message: 'User not found'
        })
      };
  
      if (password !== confirmPassword) {
        return res.status(400).json({
          message: 'Password does not match'
        })
      };
  
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      user.password = hashedPassword;
      await user.save();
  
      res.status(200).json({
        message: 'Password reset successfully'
      });
    } catch (error) {
      console.log(error.message);
      if (error instanceof jwt.JsonWebTokenError) {
        return res.status(400).json({
          message: 'Session expired, Please login to continue'
        })
      }
      res.status(500).json({
        message: 'Error: Cannot forget password'
      })
    }
  };
  
  exports.changePassword = async (req, res) => {
    try {
      const { userId } = req.params;
      const { password, newPassword, confirmPassword } = req.body;
  
      if (!password || !newPassword || !confirmPassword) {
        return res.status(400).json({
          message: 'Input all feild'
        })
      };
  
      const user = await userModel.findById(userId);
  
      if (!user) {
        return res.status(404).json({
          message: 'User not found'
        })
      };
  
      const isCorrectPassword = await bcrypt.compare(password, user.password);
  
      if (!isCorrectPassword) {
        return res.status(400).json({
          message: 'incorrect password'
        })
      };
  
      if (newPassword !== confirmPassword) {
        return res.status(400).json({
          message: 'Password does not match'
        })
      };
  
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      user.password = hashedPassword;
      await user.save();
  
      res.status(200).json({
        message: 'Password changed successfully'
      })
    } catch (error) {
      console.log(error.message);
      res.status(500).json({
        message: 'Error Changing Password'
      })
    }
  }
  