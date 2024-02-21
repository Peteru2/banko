//Post_login
import {Login, profileUpdateSchema} from "../models/Login.js";

const Post_login = async (req, res) =>{
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
        res.status(201).json({ message: 'Login created successfully', login });
      
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while creating the login' });
    }
}

export default { Post_login }