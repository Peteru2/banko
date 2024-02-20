import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const loginSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,   
    },
    phoneNumber:{
        type: String,
        required: true,
    },
   message:{
    type: String,
    required: true,
    }
}, {timestamps: true});

const Login = mongoose.model('Login', loginSchema);
export default Login;