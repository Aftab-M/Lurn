const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
// const LocalStorage = require('node-localstorage').LocalStorage
const store = require('store')

// localStorage = new LocalStorage('./scratch')



async function userLogin(req, res){
    console.log('In userLogin() !!!')
    try {
        
        const user = await User.findOne({$and:[{email:req.body.email}, {password:req.body.password}]});
        if(!user){ console.log('Invalid credentials !!') }
        else{

            jwt.sign({ user }, 'random-key', {expiresIn:'1hr'}, (err, token)=>{
                if(err){ console.log("EROROROR ! "+err) }
                else{
                    console.log('IN ELSE')
                    // localStorage.setItem({'token':token, 'user':user});
                    store.set({token:token, user:user})
                    console.log('After store statement')
                    res.send({status:'VALID', token:token, user:user});
                }
            });

            
        }

    } catch (error) {
        console.log("In catch, the error is : "+error)
        console.log('HOLLER THE ERROR')
    }
}



async function getHomeData(req, res){
    console.log('In getHomeData() !!')

    const data = await User.findOne({_id:req.params.id})

    console.log(data)

    if(!data){ console.log('No related data in the Database !!') }
    else{
        // res.send({data:data, status:'Sab changa'})
        res.json({data:data})
    }


}






module.exports = {userLogin, getHomeData}