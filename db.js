
import mongoose from 'mongoose'
const uri = "mongodb+srv://devpeter:Mag1@cluster0.to9arvf.mongodb.net/devpeter?retryWrites=true&w=majority";

mongoose.connect(uri)
    .then((result) =>{
+        app.listen(8000)
        console.log("Connected")
    })
    .catch((err) =>{
        console.log(err)
    })