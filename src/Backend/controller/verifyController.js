//Post_login
import {Login} from "../models/Login.js";
import jwt from "jsonwebtoken";
const secretKey = 'your-secret-key';
import bcrypt from "bcryptjs"

const Post_signUp = async (req, res) =>{
    try {
        const { firstname, lastname, email, phoneNumber, password } = req.body;
        function generateAccountNumber() {
            let accountNumber = '';
            const digits = '0123456789';
        
            for (let i = 0; i < 10; i++) {
                const randomIndex = Math.floor(Math.random() * digits.length);
                accountNumber += digits[randomIndex];
            }
        
            return accountNumber;
        }
        const hashedPassword = await bcrypt.hash(password, 10); 
        const newAccountNumber = generateAccountNumber();
        const login = new Login({
            firstname,
            lastname,
            email,
            phoneNumber,
            password: hashedPassword,
            accountBalance: 0,
            accountNumber: newAccountNumber,
            status: true,
            kycLevel: 1,
            transactionPin: 0, 
        });
 
        const check =  await Login.findOne({email:email})
        const checkAccNum = await Login.findOne({accountNumber: newAccountNumber,})
        if (check){
            return res.status(401).json({error:"This email already exist"})
        }
        else if(checkAccNum){
            generateAccountNumber();
        }
        else{
            await login.save();   
        }
        res.status(201).json({ message: 'Account successfully Created', login });
      
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while creating the account' });
    }
}

const Post_login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Login.findOne({ email: email });

        
        if (!user) {
           return res.status(404).json({ error: ' User not found' });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid password' });
        }
                

        const token = jwt.sign({ userId: user._id, email: user.email }, secretKey, { expiresIn: '1h' }); // Token expires in 1 hour
        res.status(200).json({ success: 'Exist', token: token, message: 'User logged In Succesfully' });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while logging in' });
    }
};

const Get_user = async (req, res) => {
    try {
      const user = await Login.findById(req.user.userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json({ user });
    } catch (error) {
      console.error('Error fetching user data:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

    const UpdateTransPin =  async (req, res) =>{ 
        try {
            
            const { pin } = req.body;
            await Login.findByIdAndUpdate(req.user.userId, { transactionPin:pin });
        
            res.status(200).json({ message: 'Transaction pin updated successfully' });
        } catch (error) {
            console.error('Failed to update transaction pin:', error);
            res.status(500).json({ error: 'Failed to update transaction pin' });
        }
    }
   


export default { 
    Post_signUp,
    Post_login,
    Get_user,
    UpdateTransPin,

}