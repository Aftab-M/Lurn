// import { createRequire } from 'module'
// const require = createRequire(import.meta.url);
const app = require('express')()
const cors = require('cors')
const mong = require('mongoose')
const express = require('express')
const http = require('http').Server(app)
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Venture = require('./models/ventureModel.js')

const {userLogin, getUser, checkIfUserExists, checkIfEmailExists, registerUser, addNewVenture, getHomeData, addNewLearning, getLearnings, updateLearning, deleteLearning, toggleVisibility, toplearnings, getTopLearnings, getProfile} = require('./builders/userController.js')
const {getHelp} = require('./builders/ai.js')

mong.connect(CONN_STRING);

app.use(cors({origin:'*', methods:['POST', 'GET'], credentials:true}))
app.use(express.json())


const User = require('./models/userModel')




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


app.post('/addNewLearning', async(req, res)=>{addNewLearning(req, res)})


app.post('/getLearnings', async(req, res)=>{getLearnings(req, res)})


app.post('/toggleVisibility', async(req, res)=>{toggleVisibility(req, res)})


app.post('/updateLearning', async(req, res)=>{updateLearning(req, res)})


app.post('/deleteLearning', async(req, res)=>{deleteLearning(req, res)})


app.post('/getTopVentures', async(req, res)=>{getTopLearnings(req, res)})


app.post('/getProfile', verifyToken, async(req, res)=>{getProfile(req, res)})


app.post('/getai', async(req, res)=>{getHelp(req, res)})


function verifyToken(req, res, next){
    console.log('IN THE MIDDLEWARE !!!')
    const token = req.body.token;
    console.log(token);
    const vv = jwt.verify(token, 'random-key', (err, valid)=>{
        if(err){console.log('ERROR !!!')}
        else{
            console.log('VALID HOMIE, LETS GOOO')
            next();
            
        }
    })
    // next();
}


app.post('/register', async (req, res)=>{
    
    console.log(req.body.email)
    const uss = await User.findOne({'email':req.body.email})
    
    if(uss){
        console.log("User Already Exists !!!!"+uss['_id']);
        sendUser(uss['email']);
        
    }
    else{ console.log('Not found, lets continue with Registration !!') }

    
})







