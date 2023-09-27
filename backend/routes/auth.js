const e = require('express');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const USER = mongoose.model('USER');
const bcrype = require('bcrypt');

router.get("/", (req, res) => {
    res.send("Hello from auth.js");
});

router.post("/signup", (req, res) => {
    const {name,username,email,password} = req.body;
    if(!name || !username || !email || !password){
        return res.status(422).json({error: "Please fill all the fields"})
    }

    USER.findOne({$or:[{email:email},{username:username}]}).then((savedUser) => {
        if(savedUser){
            return res.status(422).json({error: "User already exists with that email"})
        }
        bcrype.hash(password,12).then((hashedpassword) => {
            const user = new USER({
                name,
                username,
                email,
                password:hashedpassword
            });
        
            user.save()
            .then(user => {res.json({message:"User saved successfully"})})
            .catch(err => {console.log(err)})
        });
    }) 
});

router.post("/signin", (req, res) => {
    const {email,password} = req.body;
    USER.findOne({email:email}).then((savedUser) => {
        if(savedUser){
            bcrype.compare(password,savedUser.password).then(
                (match) => {
                    if(match){
                        console.log("Successfully signed in");
                        return res.json({message:"Successfully signed in"})
                    }
                    else{
                        console.log("Failed to sign in");
                        return res.status(422).json({error: "Invalid Password"})
                    }
                }
            )   
        }
        else{
            console.log("Failed to sign in");
            return res.status(422).json({error: "User does not exist"})
        }
    })
});

module.exports = router;