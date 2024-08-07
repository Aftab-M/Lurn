const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
// const LocalStorage = require('node-localstorage').LocalStorage
const store = require('store')
const bcrypt = require('bcrypt')
const Learnings = require('../models/learningModel')
const Ventures = require('../models/ventureModel')





async function userLogin(req, res){
    console.log('In userLogin() !!!')
    try {
        
        const user = await User.findOne({$and:[{email:req.body.email}, {password:req.body.password}]});
        if(!user){
            console.log('Invalid credentials !!');
            res.send({status:'INVALID USER'});
        }
        else{

            jwt.sign({ user }, 'random-key', {expiresIn:'1hr'}, (err, token)=>{
                if(err){ console.log("EROROROR ! "+err) }
                else{
                    console.log('IN ELSE')
                    // console.log('After store statement')
                    res.send({status:'VALID', id:user._id, token:token});
                }
            });

            
        }

    } catch (error) {
        console.log("In catch, the error is : "+error)
        console.log('HOLLER THE ERROR')
    }
}




async function getUser(req, res){
    try{
        const ii = req.params.id;
        // console.log('ID IS : '+ii)
        const user = await User.findOne({_id:ii})
        .then((user)=>{
            // console.log("FOUND EM" + user);
            res.json({user:user})
        })
        .catch((err)=>{console.log('NODE ERROR : '+err)})
        
    }catch(err){console.log('CAUGHT : '+err)}

}




async function checkIfUserExists(req, res){
    const uname = req.params.uname;
    // console.log('Username is : '+uname)
    const uu = await User.findOne({name:uname})

    if(!uu){
        res.send({exists:'no'})
    }
    else{
        res.send({exists:'yes'})
    }
}




async function checkIfEmailExists(req, res){
    const email = req.params.email;
    const uu = await User.findOne({email:email})

    if(!uu){
        res.send({exists:'no'})
    }
    else{
        res.send({exists:'yes'})
    }
}


async function registerUser(req, res){
    // console.log('In Register User !')
    const hashedPassword = bcrypt.hash(req.body.password, 10)
    .then((data)=>{
        const newUser = User.insertMany({email:req.body.email, password:req.body.password, name: req.body.uname, pubCont:0, venturesList:[{ventureName:'LURN Platform', learnCount:0}]})
        .then((ee)=>{
            res.send({status:'registered'})
        })
        .catch((err)=>{
            console.log(err)
            res.send({status:'db_err'})
        })
    })
    .catch((err)=>{
        console.warn("EROROROROR : "+err)
    })
}


async function addNewVenture(req, res){
    await User.updateOne({_id:req.body.id}, {$push:{venturesList: {ventureName:req.body.name, learnCount:0}}})
    .then(async(data)=>{
        res.send({status:'done'})
        const u = await Ventures.updateOne({venName:req.body.name}, {$inc:{venPeopleCount:1}})
    })
    .catch((err)=>{
        console.log('Error : '+err)
        res.send({status:'error'})
    })
}


async function getHomeData(req, res){
    const user = await User.findOne({name:req.body.name})
    .then((data)=>{
        res.send({ventures:data.venturesList})
    })
    .catch((err)=>{
        console.log('Error is : '+err)
    })
    
}


async function addNewLearning(req, res){
    const learning = await Learnings.create({ventureName:req.body.vName, username:req.body.username, learningTitle:req.body.title, learningDesc:req.body.desc, isPublic:false})
    .then(async(data)=>{
        res.send({status:'done'})
        const up = await User.updateOne({name:req.body.username, 'venturesList.ventureName':req.body.vName}, {
            $inc:{'venturesList.$.learnCount':1}
        }).then((d)=>console.log('Updated count, '+d))
    })
    .catch((err)=>{
        console.log('Error : '+err)
        res.send({status:'db_err'})
    })
}


async function getLearnings(req, res){
    const user = await Learnings.find({username:req.body.uname, ventureName: req.body.venName})
    .then(async (data)=>{
        
        const tl = await Learnings.find({ventureName:req.body.venName, isPublic:true})
        .then((dataa)=>{
            res.send({status:'okay', learnings:data, topLearnings:dataa})
        })
        .catch((err)=>{
            console.log('Error : '+err)
        })
    })
    .catch((err)=>{
        res.send({status:'db_err'})
        console.log('Some error, like : '+err)
    })

    
}


async function toggleVisibility(req, res){
    const ee = await Learnings.findOne({_id:req.body.id})
    .then(async (data)=>{
        // console.log(data)
        const val = data['isPublic'];
        const uu = await Learnings.updateOne({_id:req.body.id}, {$set:{isPublic:!val}})
        .then(async(dataa)=>{
            res.send({status:'okay'});
            const tt = await User.updateOne({name:req.body.uname}, {$inc:{pubCont:1}}).then((dd)=>console.log('updated !'))
        })
        .catch((err)=>{
            res.send({status:'err'})
        })
    })
    .catch((err)=>{
        console.log('Error : '+err)
        res.send({status:'err'})
    })
}



async function updateLearning(req, res){
    const uu = await Learnings.updateOne({_id:req.body.id}, {$set:{learningDesc:req.body.desc}})
    .then((data)=>{
        // console.log(data)
        res.send({status:'updated'})
    })
    .catch((err)=>{
        console.log('Error : '+err)
        res.send({status:'not-updated'})
    })
}


async function deleteLearning(req, res){
    const dd = Learnings.deleteOne({_id:req.body.id})
    .then((data)=>{
        res.send({status:'okay'})
    })
    .catch((err)=>{
        console.log('Error : '+err)
        res.send({status:'err'})
    })
}


async function getTopLearnings(req,res){
    const ss = await Ventures.find({})
    if(!ss){res.send({status:'err'})}
    else{
        res.send({status:'okay', tv:ss})
    }
}


async function getProfile(req, res){
    const ss = User.findOne({name:req.body.name})
    .then((data)=>{
        var cnt = 0;
        data.venturesList.map((e)=>{
            cnt+=e.learnCount;
        })
        res.send({status:'okay', user:data, count:cnt})
    })
    .catch((err)=>{
        console.log('Error !')
        res.send({status:'err'})
    })
}






module.exports = {userLogin, getUser, checkIfUserExists, checkIfEmailExists, registerUser, addNewVenture, getHomeData, addNewLearning, getLearnings, updateLearning, deleteLearning, toggleVisibility, getTopLearnings, getProfile}
