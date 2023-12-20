const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
// const LocalStorage = require('node-localstorage').LocalStorage
const store = require('store')
// 'localStorage'

// localStorage = new LocalStorage('./scratch')



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
        console.log('ID IS : '+ii)
        User.findOne({_id:ii})
        .then((user)=>{
            console.log("FOUND EM" + user);
            res.send({user:user})
        })
        .catch((err)=>{console.log('NODE ERROR : '+err)})
        

        // console.log('ABC IS : '+abc)
        // if(!user){console.log('NOT USER' + user)}
        // else{
        //     console.log(user)
        //     res.send({user:user})
        // }
        
    }catch(err){console.log('CAUGHT : '+err)}

}


async function checkIfUserExists(req, res){
    const uname = req.params.uname;
    console.log('Username is : '+uname)
    const uu = await User.findOne({name:uname})

    if(!uu){
        console.log('User does not exist !')
        res.send({exists:'no'})
    }
    else{
        console.log('Username already exists !!')
        res.send({exists:'yes'})
    }
}




async function checkIfEmailExists(req, res){
    const email = req.params.email;
    console.log('Email is : '+email)
    const uu = await User.findOne({email:email})

    if(!uu){
        console.log('Email does not exist !')
        res.send({exists:'no'})
    }
    else{
        console.log('Email already exists !!')
        res.send({exists:'yes'})
    }
}





module.exports = {userLogin, getUser, checkIfUserExists, checkIfEmailExists}