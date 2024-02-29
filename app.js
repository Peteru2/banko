import express from 'express';
import cors from 'cors';
import morgan from 'morgan'
import connectDB from './db.js'
import loginController from "./src/Backend/controller/verifyController.js"
import authMiddleware from './src/Backend/auth.js';

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


app.get('/' ,authMiddleware, loginController.Get_user)
app.post('/SignUp', loginController.Post_signUp)
app.post('/Login', loginController.Post_login)
app.put('/updateTransactionPin', authMiddleware, loginController.UpdateTransPin)
app.put('/updatekyc', authMiddleware, loginController.UpdateKyc)