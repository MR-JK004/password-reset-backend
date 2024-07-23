import 'dotenv/config.js'
import userModel from '../model/userModel.js'
import crypto from 'crypto'
import Function from '../common/Function.js'
import nodeMailer from 'nodemailer'
import { validatePassword } from '../common/Validations.js'

const createUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        let user = await userModel.findOne({ email });
        if (!validatePassword(password)) {
            return res.status(400).json({ 
                message: '\n1) The Password must contain at least 8 characters\n2) One lowercase letter, one uppercase letter, one number, and one special character must be included' 
            });
        }
        if (user) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }
        req.body.password = await Function.hashPassword(req.body.password)
        await userModel.create(req.body)
        res.status(201).json({ message: `User ${req.body.name} registered successfully` });
    } catch (error) {
        res.status(500).json({ message: error.message || 'Internal Server Error' });
    }
}

const authenticateUser = async(req,res)=>{
    try {
        let user = await userModel.findOne({email:req.body.email});
        if(user)
        {
            if(await Function.hashCompare(req.body.password,user.password))
            {
                res.status(200).send({
                    message:"Login Successfull"
                })
            }
            else
            {
                res.status(400).send({
                    message:"Incorrect Password"
                })
            }

        }
        else
        {
            res.status(400).send({
                message:`User does not exists`
            })
        }
       
    } catch (error) {
        res.status(500).send({
            message:error.message || "Internal Server Error",
            error
        })
    }
}


const transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS
    }
});


const forgetPassword = async (req, res) => {
    try {
      const { email } = req.body;
      const user = await userModel.findOne({ email });
  
      if (!user) {
        return res.status(400).json({ message: 'User not found.' });
      }
  
      const randomString = crypto.randomBytes(32).toString('hex');
      user.resetToken = randomString;
      user.resetTokenExpiration = Date.now() + 3600000; // 1 hour
      await user.save();
  
      const resetLink = `http://localhost:5173/reset-password/${randomString}`;
  
      await transporter.sendMail({
        to: email,
        from: process.env.EMAIL,
        subject: 'Reset Password',
        html: `<p>You requested a password reset</p>
              <p>Click this Password Reset Link: <a href="${resetLink}">${resetLink}</a> to Set a New Password</p>`
      });
  
      res.status(200).send(`Link Sent to Your Email ID ${req.body.email}`);
    } catch (error) {
      res.status(500).send({
        message: "Internal Server Error",
        error: error.message
      });
    }
  };



const resetPassword = async (req, res) => {
    try {
        const { token, password } = req.body;

        
        if (!token || !password) {
            return res.status(400).json({ message: 'Token and password are required' });
        }

        
        const user = await userModel.findOne({
            resetToken: token,
            resetTokenExpiration: { $gt: Date.now() }
        });

        
        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }
        
        if (!validatePassword(password)) {
            return res.status(400).json({ 
                message: '\n1) The Password must contain at least 8 characters\n2) One lowercase letter, one uppercase letter, one number, and one special character must be included' 
            });
        }

        
        user.password = await Function.hashPassword(password);
        user.resetToken = undefined;
        user.resetTokenExpiration = undefined;
        await user.save();

        res.status(200).send({
            message: "Password reset successfully"
        });
    } catch (error) {
        console.error('Error in resetPassword:', error); // Log the error for debugging
        res.status(500).send({
            message: "Internal Server Error",
            error: error.message
        });
    }
};


export default {
    forgetPassword,
    resetPassword,
    createUser,
    authenticateUser
}