//Post_login
import {Login, profileUpdateSchema} from "../models/Login.js";
import jwt from "jsonwebtoken";
const secretKey = 'your-secret-key';

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
        
        const newAccountNumber = generateAccountNumber();
        const login = new Login({
            firstname,
            lastname,
            email,
            phoneNumber,
            password,
            accountBalance: 0,
            accountNumber: newAccountNumber,
            status: true 
        });
 
        const check =  await Login.findOne({email:email})
        const checkAccNum = await Login.findOne({accountNumber: newAccountNumber,})
        if (check){
            return res.json({error:"Exist"})
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

// const Post_login = async (req, res) => {

//     try {
//         const {  email, password } = req.body;
        
//         const check =  await Login.findOne({email:email})
//         if (check){
//                 res.status(201).json({success:'Exist', message: 'User Logged in Succesfully' });
//     }
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).json({ error: 'An error occurred while creating the login' });
//     }

// }
 
const Post_login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Login.findOne({ email: email });
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        if (password !== user.password) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        const token = jwt.sign({ userId: user._id, email: user.email }, secretKey, { expiresIn: '1h' }); // Token expires in 1 hour
        res.status(200).json({ success: 'Exist', token: token, message: 'User logged In Succesfully' });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while logging in' });
    }
};


export default { 
    Post_signUp,
    Post_login 
}