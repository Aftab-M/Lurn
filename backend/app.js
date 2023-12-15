// import { createRequire } from 'module'
// const require = createRequire(import.meta.url);
const app = require('express')()
// const cors = require('cors')
const mong = require('mongoose')
const express = require('express')
const http = require('http').Server(app)


mong.connect("mongodb+srv://useraf:af9999a@cluster0.awk4cby.mongodb.net/lurn?retryWrites=true&w=majority");
// app.use(cors({origin:'*', methods:['POST', 'GET'], credentials:true}))
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



// insertUser();