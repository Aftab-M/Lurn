import React from 'react'
import {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import './loginReg.css'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

export default function(){

    const urlPrefix = 'http://localhost:3000';
    const nav = useNavigate()
    

    function LogIn(){
        
        const [email, setEmail] = useState('');
        const [pass, setPass] = useState('');

        function loginLogic(){
            axios.post(urlPrefix+'/login',{email:email, password:pass})
            .then((res)=>{
                if(res.data.status=='INVALID USER'){alert('Invalid Credentials !!')}
                if(res.data.status=='VALID'){
                    localStorage.setItem('token', res.data.token)
                    nav('/home/'+res.data.id)
                }
            })
            .catch((err)=>{
                console.log("ERROR !! : "+err)
            })
        }

        return(
            <>
                <div className='regMain'>
            
                    <div className='inputs'>
                    <label style={{'fontSize':'1.2rem', 'color':'black', 'padding':'1rem'}}>LOGIN</label>
                        <input type='text' placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                        <input type='text' placeholder='Password' value={pass} onChange={(e)=>setPass(e.target.value)} />
                        <button onClick={()=>{loginLogic()}} className='btn'> LOGIN </button>
                    </div>
                    
                </div>
            </>
        );
    }


    function Register(){

        const [email, setEmail] = useState('');
        const [uname, setUname] = useState('')
        const [pass, setPass] = useState('');
        const [confirmPass, setConfirm] = useState('');
        const [emailAvailable, setEmailAvailable] = useState('');
        const [UnameAvailable, setUnameAvailable] = useState('');

        function regLogic(e){
            var allGood = true;
            if(email==''){alert('Cannot leave email empty !'); allGood = false;}
            if(uname==''){alert('Cannot leave username empty !'); allGood = false;}
            if(pass==''){alert('Please fill both passwords !'); allGood = false;}
            if(confirmPass==''){alert('Please fill both passwords !'); allGood = false;}

            if(allGood){
                console.log('IN REGISTER LOGIC')
                axios.post(urlPrefix+'/register', {email:email, uname:uname, password:pass})
                .then((res)=>{
                    if(res.data.status=='registered'){alert('Registered, you can now Log In !!'); setLogOrReg('login');}
                    else if(res.data.status=='db_err'){alert('DB Error ! Please try again...')}
                })
            }
            else{}
            
        }

        function checkAndSetUname(e){
            if(e.target.value!==''){
            axios.post(urlPrefix+'/checkUsername/'+e.target.value)
            .then((res)=>{
                if(res.data.exists=='yes'){
                    alert('Username exists !!')
                    setUnameAvailable(false)
                }
                else{
                    alert('Username available')
                    setUnameAvailable(true)
                }
            })
            .catch((err)=>{
                console.log('ERROR ! : '+err)
            })
        }

        }

        function checkAndSetEmail(e){
            if(e.target.value!==''){
            axios.post(urlPrefix+'/checkEmail/'+e.target.value)
            .then((res)=>{
                if(res.data.exists=='yes'){
                    alert('Email exists !!')
                    setEmailAvailable(false);
                }
                else{
                    alert('Email available')
                    setEmailAvailable(true)
                }
            })
            .catch((err)=>{
                console.log('ERROR ! : '+err)
            })

        }

        }



        return(
            <>
                <div className='regMain'>
            
            <div className='inputs'>
            <label style={{'fontSize':'1.2rem', 'color':'black', 'padding':'1rem'}}>REGISTER</label>
                <input type='text' placeholder='Email' value={email} onBlur={(e)=>{checkAndSetEmail(e)}} onChange={(e)=>setEmail(e.target.value)}/>
                <input type='text' placeholder='Username' value={uname} onBlur={(e)=>{checkAndSetUname(e)}}  onChange={(e)=>{setUname(e.target.value)}}/>
                <input type='text' placeholder='Password' value={pass} onChange={(e)=>setPass(e.target.value)} />
                <input type='text' placeholder='Confirm Password' value={confirmPass} onChange={(e)=>setConfirm(e.target.value)} />
                <div>
                <button onClick={(e)=>{regLogic(e)}} className='btn'> REGISTER </button>
                
                </div>

            </div>
        </div>
        <ToastContainer/>   
            </>
        );
    }






    const [logOrReg, setLogOrReg] = useState('register');
   

    return(
        <>

            <div className='header'>
                LURN        
                <div>
                    <button className="log" onClick={()=>{setLogOrReg('login')}}>LOG IN</button>
                    <button className="log" onClick={()=>{setLogOrReg('register')}} >REGISTER</button>    
                </div>
            
            </div>


            {
                (logOrReg=='login')
                ?
                <LogIn/>
                :
                <Register/>
            }
   
        </>
    );
}
