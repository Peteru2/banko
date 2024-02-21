import express from 'express';
import cors from 'cors';
import morgan from 'morgan'
import connectDB from './db.js'
import loginController from "./src/controller/verifyController.js"

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

app.post('/SignUp', loginController.Post_login)