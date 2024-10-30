const mongoose = require("mongoose");

const {Schema} = mongoose;

const Todo = new Schema({
    todo : {
        type : String,
        required : true,
        trim : true,
        unique : false
    },
    completed : {
        type : Boolean,
        required : true
    },
    id : {
        type : String,
        required : true
    }
});

const TodoModel = mongoose.model("todo", Todo);
TodoModel.collection.dropIndexes().then(() => {
    console.log('Indexes dropped successfully');
}).catch(err => {
    console.log('Error dropping indexes:', err);
});

module.exports = TodoModel;
