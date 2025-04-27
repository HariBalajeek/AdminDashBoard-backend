const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


exports.signup = async (req, res) => {
    try {
        const {name,password} = req.body
        const user = await User.findOne({name})
        if(user){
            return res.status(400).json({message:'User already exists'})
        }
        const hashedPassword = bcrypt.hashSync(password, 10)
        const newUser = new User({
            name,
            password:hashedPassword})
        await newUser.save()
        return res.status(201).json({message:'User created successfully',
            user:newUser
        })
    } catch (error) {
        console.log('error : ', error)
    }
}

exports.login = async (req,res)=>{
    try {
        const {name,password} = req.body
        const user = await User.findOne({name})
        if(!user){
            return res.status(400).json({
                message:'User does not exist'
            })
        }
        const isMatch = bcrypt.compareSync(password, user.password)
        if(!isMatch){
            return res.status(400).json({
                message:'Invalid credentials'
            })
        }
        const token = jwt.sign({id:user._id,name:user.name}, process.env.JWT_SECRET, {expiresIn:'1h'})
        return res.status(200).json({
            message:'Login successful',
            user:user,
            token:token
        })
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ message: 'Server error. Please try again later.' });
    }
    
}