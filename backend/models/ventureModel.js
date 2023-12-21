const mong = require('mongoose')

const ventureSchema = new mong.Schema({
    venName:String, 
    venPeopleCount: Number,
});


module.exports = mong.model('Venture', ventureSchema)