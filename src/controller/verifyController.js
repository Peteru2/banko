//Post_login
import Login from "../models/Login.js";

const Post_login = async (req, res) =>{
    try {
        const { name, email, phoneNumber, message } = req.body;
        const login = new Login({
            name,
            email,
            phoneNumber,
            message
        });

        const check =  await Login.findOne({email:email})
        if (check){
            return res.json({error:"Exist"})
            return res.status(400)
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