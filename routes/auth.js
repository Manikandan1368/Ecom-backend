const express = require("express");
const { loginUser, resgisterUser } = require("../handlers/auth-handler");
const router = express.Router();

router.post("/register", async (req, res)=>{
    let model = req.body;
    if(model.name && model.email && model.password){
        await resgisterUser(model);
        res.send({
            message:"User Registered Successfully..!"
        });
    }
    else{
        res.status(400).json({
            error:"Please provide name, email, password"
        });
    }
});

router.post("/login", async (req,res)=>{
    let model = req.body;
    if(model.email && model.password){
        const result = await loginUser(model);
        if(result){
            res.send(result);
        }
        else{
            res.status(400).json({
           error: "Email or Password is Incorrect"
        });
        }
    }
    else{
        res.status(400).json({
           error: "Please provide email and password"
        });
    }
});

module.exports = router;