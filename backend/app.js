// import { createRequire } from 'module'
// const require = createRequire(import.meta.url);
const app = require('express')()
const cors = require('cors')
const mong = require('mongoose')
const express = require('express')
const http = require('http').Server(app)
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const {userLogin, getUser, checkIfUserExists, checkIfEmailExists, registerUser, addNewVenture, getHomeData} = require('./builders/userController.js')


mong.connect("mongodb+srv://useraf:af9999a@cluster0.awk4cby.mongodb.net/lurn?retryWrites=true&w=majority");
app.use(cors({origin:'*', methods:['POST', 'GET'], credentials:true}))
app.use(express.json())


const User = require('./models/userModel')

async function insertUser(){
    await User.create({
        email: 'vossi@gmail.com',
        name: 'Stormzy',
        password: 'chuck norris',
        venturesList: [{'Spanish':10}, {'Machine Learning':7}]
    }).then((e)=>{console.log('Inserted a record !')});
}



http.listen(3000, function(){
    console.log('Server is running...............')
})



app.get('/', async(req, res)=>{
    try{
        const result = await User.find({})
    console.log(result);
    res.send({status:'ALRIGHT', data:result});
    }catch(err){console.log(err)}
})


function sendUser(mail){
    app.get('/users/:id', async (req, res)=>{
        const us = await User.findOne({email:req.params.id});
        console.log('In sendUser()')
        // const us = await User.findOne({email:mail});
        res.send({status:'ALRIGHT', data:us})
    })
}







app.post('/login', async(req, res)=>{userLogin(req, res)})


app.post('/getUser/:id', async(req, res)=>{getUser(req, res)})


app.post('/checkUsername/:uname', async(req, res)=>{checkIfUserExists(req, res)})


app.post('/checkEmail/:email', async (req, res)=>{checkIfEmailExists(req, res)})


app.post('/register', async(req, res)=>{registerUser(req, res)})


app.post('/addNewVenture', async(req, res)=>{addNewVenture(req, res)})


app.post('/getHomeData', async(req, res)=>{getHomeData(req, res)})








app.post('/register', async (req, res)=>{
    
    console.log(req.body.email)
    const uss = await User.findOne({'email':req.body.email})
    
    if(uss){
        console.log("User Already Exists !!!!"+uss['_id']);
        sendUser(uss['email']);
        
    }
    else{ console.log('Not found, lets continue with Registration !!') }

    
    
    // console.log(usr)

    // bcrypt.hash(req.body.pass, 10)
    // .catch((err)=>{
    //     res.status(500).send({message:'Password not hashed properly !', err})
    // })
    // .then((e)=>{
    //     const us = new User({
    //         email: req.body.email,
    //         password: e
    //     });
    //     us.save().then((e)=>{console.log("SUCC : "+e)}).catch((err)=>{console.log("ERR : "+err)})

    // })
})





// insertUser();



