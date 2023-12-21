const mong = require('mongoose')

const LearningModel = new mong.Schema({
    ventureName: String, 
    username: String,
    learningTitle: String,
    learningDesc: String,
    isPublic: Boolean,
})

module.exports = mong.model('Learnings', LearningModel)