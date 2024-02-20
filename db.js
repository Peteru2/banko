
import mongoose from 'mongoose'
const uri = "mongodb+srv://banko:Mag1@cluster0.to9arvf.mongodb.net/banko?retryWrites=true&w=majority";

const connectDB = async () => {
    try {
        await mongoose.connect(uri);
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error("Failed to connect to MongoDB:", err);
    }
};

export default connectDB;