import express from 'express';
import cors from 'cors';
import morgan from 'morgan'
import connectDB from './db.js'
import Login from './src/models/Login.js';

const app = express();

app.use(cors());
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true   }))

connectDB()
    .then(() =>{
        app.listen(8000, () => {
            console.log("Server is running on port 8000");
        });
    })


app.get('/' ,cors(), (req, res) =>{
   res.send('<p>The Code is working</p>')
})

app.post('/', async (req, res) => {
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
});
