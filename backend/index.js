require('dotenv').config();
const express = require("express");
const app = express();
const TodoModel = require('./Models/TodoModel');
const {SignUpModel} = require('./Models/UserModel');
const db = require('./db');
const cors = require('cors');
const {z} = require("zod");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const JWT_SECRET = process.env.JWT_SECRET;
app.use(express.json());
app.use(cors(
    {
        origin : [""],
        methods : ["POST" , "GET" , "DELETE" , "PUT"],
        credentials :  true
    }
));

function checkToken(req, res, next){
    try {
        const {token} = req.headers;
        const decoded = jwt.verify(token , JWT_SECRET);
        next();
    } catch (error) {
        res.status(400).json({error});
    }
}

app.post("/add", checkToken, async (req,res) => {
    try{
    const {todo,completed,id} = req.body;
    await TodoModel.create({
        todo : todo,
        completed : completed,
        id : id
    });
    res.status(200).json({"res" : "User Created"});
    }catch(error){
        res.status(400).json({error});
    }

});

app.get('/get', checkToken, async(req, res)=>{
    try {        
        const {id} = req.headers;
        const response = await TodoModel.find({id : id});
        res.status(200).json({"todo":response});        
    } catch (error) {
        res.status(400).json({error});
    }
})

app.delete('/delete/:id', checkToken, async(req, res) => {
    try{
    const {id} = req.params;
    await TodoModel.deleteOne({_id : id});
    res.status(200).json({"SUCESS": "Todo Deleted Succesfully"});
    }catch(error){
        res.status(500).json({"error":error.message});
    }
}) 

app.put('/update/:id' ,checkToken, async(req , res) =>{
    try {
        const {id} = req.params;
        const {completed} = req.body;
        await TodoModel.updateOne({_id:id},{completed : completed});
        res.status(200).json({"success":"Updated the value successfully"});
    } catch (error) {
        res.status(500).json({"error" : error.message});
    }
})

app.post('/signup', async(req, res) =>{
    try {
        const {userid , name , email , password} = req.body;
        const reqCheck = z.object({
            userid : z.string().min(4).max(10),
            name : z.string().min(4).max(100),
            email : z.string().min(4).max(100).email(),
            password : z.string().min(4)
        });
        const {success , error} = reqCheck.safeParse({userid , name , email, password});
        if(!success){
                res.status(403).json({"error" : error.issues.map((e) => ({"field" : e.path[0] , "message" : e.message }))});
                return;
        }
        const hashPass = await bcrypt.hash(password, 5);
        // console.log(hashPass);
        await SignUpModel.create({
            userid,
            name,
            email,
            password : hashPass
        });
        res.status(200).json({"Success" : "User Signed Up successfully"});
    } catch (error) {
        res.status(500).json({'error':error.message});
    }
})

app.post('/login', async(req, res) => {
    try {
        const {userid , password} = req.body;
        const response = await SignUpModel.findOne({"userid" : userid });
        if(!response){
            res.status(400).json({"error" : "User not found"});
            return;
        }
        const comparPass = await bcrypt.compare(password , response.password);
        // console.log(comparPass);
        if(!comparPass){
            res.status(500).json({"error" : "Password Incorrect"});
            return;
        }

        const token = jwt.sign({userid} , JWT_SECRET);
        res.status(200).json({token ,"id" : response._id});
    } catch (error) {
        res.status(500).json({"error":error.message});
    }
})

app.listen(3000,()=>{
    console.log("Connected backend at 3000 port");
})
