const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model("User");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const {JWT_KEY} = require('../config/keys');
const requireLogin = require('../middleware/requireLogin');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
// 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



const mailer = nodemailer.createTransport(sendgridTransport({
    auth : {
        api_key: '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'
    }
}));

router.post('/signup', (req, res) => {
    const {name, email, password, pic} = req.body;
    if(!email || !password || !name ){
        return res.status(422).json({error: "please enter all the fields"})
    }
    User.findOne({email:email})
    .then((savedUser) => {
        if(savedUser){
            return res.status(422).json({error: "user already exists"})
        }
        bcrypt.hash(password, 15)
        .then(hashedPassword => {
            const user = new User({
                email,
                password: hashedPassword,
                name,
                pic
            })
            user.save()
             .then(user => {
                 mailer.sendMail({
                     to: user.email,
                     from: "ns3320517@gmail.com",
                     subject: "Account created scuccessfully",
                     html: "<h1>Welcome to Picstagram</h1>"
                 })
                 res.json({message: "saved successfully"})
             })
             .catch(err => {
                 console.log(err)
            })
        })
    })
    .catch(err => {
        console.log(err)
    })
})

router.post('/signin', (req, res) => {
    const {email, password} = req.body;
    if(!email || !password){
        res.status(422).json({error: "please enter all the fields"})
    }
    User.findOne({email:email})
    .then(savedUser => {
        if(!savedUser){
            return res.status(422).json({error: "invalid email or password"})
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch => {
            if(doMatch){
                 //res.json({message: "successfully signed in "})
                 const token = jwt.sign({_id: savedUser._id}, JWT_KEY)
                 const {_id, name, email, followers, following, pic} = savedUser;
                 res.json({token, user:{_id, name, email, followers, following, pic}})
            }
            else{
                return res.status(422).json({error: "invalid email or password"})
            }
        })
        .catch(err => {
            console.log(err)
        })
    })
})

router.post('/reset-password', (req, res) => {
    crypto.randomBytes(32, (err, buffer) => {
        if(err){
            console.log(err);
        }
        const token = buffer.toString("hex");
        User.findOne({email: req.body.email})
        .then(user => {
            if(!user){
                return res.status(422).json({error: "User doesn't exixts with the email"})
            }
            user.resetToken = token;
            user.expireToken = Date.now() + 3600000;
            user.save().then((result) => {  
                mailer.sendMail({
                    to: user.email,
                    from: "ns3320517@gmail.com",
                    subject: "Password reset",
                    html: `
                    <p>You requested to reset password</p>
                    <h5>Click on this <a href="http://localhost:3000/new-password/${token}">link</a> to reset password</h5>
                    `
                })
                res.json({message: "Check you email"});
            })
        })
    })
})

module.exports = router;