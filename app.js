import express from 'express';
import http from 'http';
import cors from 'cors';
import morgan from 'morgan';
import { Server } from 'socket.io'; // Import Socket.IO
import connectDB from './db.js';
import Controller from './src/Backend/controller/verifyController.js';
import authMiddleware from './src/Backend/auth.js';

const app = express();
const server = http.createServer(app); 
const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173", 
      methods: ["GET", "POST", "PUT"] 
    }
  });

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB().then(() => {
  server.listen(8000, () => {
    console.log('Server is running on port 8000');
  });
});

// Socket.IO logic
io.on('connection', socket => {
  console.log('A user connected');

 
  socket.emit('welcome', 'Welcome to the server!');
});

app.all('*', authMiddleware)
app.get('/', authMiddleware, Controller.Get_user);
app.post('/SignUp', Controller.Post_signUp);
app.post('/Login', Controller.Post_login);
app.put('/updateTransactionPin', authMiddleware, Controller.UpdateTransPin);
app.put('/updatekyc', authMiddleware, Controller.UpdateKyc);
app.get('/balance', authMiddleware, Controller.GetBalance);
app.post('/val_transfer', authMiddleware, Controller.Check_transfer);
app.post('/transfer', authMiddleware, Controller.Post_transfer);
app.get('/trans-history', authMiddleware, Controller.Transfer_history);
