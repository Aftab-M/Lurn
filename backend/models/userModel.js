const mong = require('mongoose')

const userSchema = new mong.Schema({
    name: String, 
    email: String, 
    password: String, 
    venturesList: [{ventureName:String, learnCount:Number}],
    
});


module.exports = mong.model('User', userSchema)