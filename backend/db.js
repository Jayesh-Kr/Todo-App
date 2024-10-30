require('dotenv').config()
const mongoose = require("mongoose");
(async()=>{
   await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to mongoDB");
})();

const db = mongoose.connection;
db.on('error' , (error) => {
    console.log(error);
})

db.once("open", () =>{
    console.log("Connected to MONGODB");
})
db.on('disconnected' , () => {
    console.log('Disconnected to MongoDB');
});

module.exports = db;
