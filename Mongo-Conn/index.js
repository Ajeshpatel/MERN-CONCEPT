const express = require('express');
const mongoose = require('mongoose');
const userModel = require('./usermodel')

const app = express();

const PORT = 8080;

app.get('/', (req, res) =>{
    return res.json("API is Running...")
});

app.get('/create', async (req, res) =>{
    let createdUser = await userModel.create({
        name: "Rajesh",
        username: "ajeshpatel",
        email: "ajesh@gmail.com",
    });
    return res.json(createdUser)
    
});

app.get('/update', async(req, res) =>{
    let updatedUser = await userModel.findOneAndUpdate({name:"Ajesh"},{username:"ajesh"}, {new:true} );
    // userModel.findOneUpdate({findOne},{update}, {new:true} );
    return res.json(updatedUser)
});

app.get('/read', async (req, res) =>{
    let users = await userModel.find();
    // let users = await userModel.find({name:"Rajesh"}); //if you want to find only one user
    return res.json(users);
});

app.get('/delete', async (req, res) =>{
    let deletedusers = await userModel.findOneAndDelete({_id:"6852e2ceb5a78e61c3b76327"});
    return res.json(deletedusers)
})

app.listen(PORT,()=>{
    console.log(`Server is listening on PORT: ${PORT}`)
})