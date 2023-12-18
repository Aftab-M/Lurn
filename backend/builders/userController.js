const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

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
                    res.send({status:'VALID', token:token, user:user});
                }
            });

            
        }

    } catch (error) {
        console.log("In catch, the error is : "+error)
    }
}



async function getHomeData(req, res){
    console.log('In getHomeData() !!')

    const data = User.find({_id:req.params.id})

    console.log(data)

    if(!data){ console.log('No related data in the Database !!') }
    else{
        res.send({data:data, status:'Sab changa'})
    }


}






module.exports = {userLogin, getHomeData}