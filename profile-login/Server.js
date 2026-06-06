const express=require('express');
const app=express();
const PORT=process.env.PORT || 3000
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require('dotenv').config()

const connectDB=require('./config/db')
connectDB();

const User=require('./models/User');
const auth=require('./middleware/auth');


app.use(express.json())
app.use(express.urlencoded());

app.get('/',(req,res)=>
{
    console.log('SERVER OK');
})

// REGISTER
app.post("/register",async(req,res)=>
{
    try
    {
        const {name,email,password}=req.body;

        let user=await User.findOne({email});

        if(user)
        {
            return res.status(401).json(
                {
                    message:"User Already Exists"
                }
            )
        }

        const salt=await bcrypt.genSalt(10);

        const hashedPassword=await bcrypt.hash(password,salt);

        user=new User(
            {
                name,
                email,
                password:hashedPassword
            }
        )

        await user.save();

        res.status(201).json(
            {
                message:"User Registered Successfully"
            }
        )
    }
    catch(err)
    {
        res.status(500).json(
            {
                err:err.message
            }
        )
    }
})

// LOGIN

app.post('/login',async(req,res)=>
{
    try
    {
        const {email,password} = req.body;

        const user = await User.findOne({email});

        if(!user)
        {
            return res.status(400).json({
                message:"Invalid Credentials"
            });
        }

        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch)
        {
            return res.status(400).json({
                message:"Invalid Credentials"
            });
        }

        const token = jwt.sign(
        {
            id:user._id
        },
        process.env.JWT_SECRET,
        {
            expiresIn:"1h"
        });

        res.json({
            token
        });
    }
    catch(err)
    {
        res.status(500).json({
            error:err.message
        });
    }
});

// PROTECTED PROFILE ROUTE
app.get("/profile",auth,async(req,res)=>
{
    try
    {
        const user = await User.findById(req.user.id).select("-password");

        res.json(user);
    }
    catch(err)
    {
        res.status(500).json({
            error:err.message
        });
    }
});

app.listen(PORT,()=>
{
    console.log('http://localhost:3000');
})