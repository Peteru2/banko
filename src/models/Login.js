import mongoose from 'mongoose';

const { Schema } = mongoose;

const registrationSchema = new Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phoneNumber:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    accountBalance: {
        type: Number,
        required: true,
    },
    accountNumber: {
        type: Number,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    }

});

const profileUpdateSchema = new Schema({
    firstname: String,
    lastname: String,
    phoneNumber: String,
    transactionPin: Number,
    status: Boolean,
    kycLevel: Number,
    balance: Number,
    accountNumber: Number,
});

const Login = mongoose.model('Login', registrationSchema);

export { Login, profileUpdateSchema };
