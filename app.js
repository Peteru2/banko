import express from 'express';
import cors from 'cors';
import morgan from 'morgan'
import connectDB from './db.js'

const app = express();

app.use(cors());
app.use(morgan('dev'))

connectDB()
    .then(() =>{
        app.listen(8000, () => {
            console.log("Server is running on port 8000");
        });
    })


app.get('/' ,(req, res) =>{
    res.send('<p>This is working</p>')
})
