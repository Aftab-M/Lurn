const mong = require('mongoose')

const userSchema = new mong.Schema({
    name: String, 
    email: String, 
    password: String, 
    venturesList: [{ventureName:String, learnCount:int}],
    
});