const mongoose = require("mongoose");
const {Schema} = mongoose;

const userSignUpSchema = new Schema({
    userid : {
        type : String,
        required : true,
        unique : true
    },
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    }
});

const SignUpModel = mongoose.model("SignUp", userSignUpSchema);

module.exports = {
    SignUpModel
}