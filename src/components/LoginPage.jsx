import React from 'react'
import {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import './loginReg.css'
import axios from 'axios';
// import { LocalStorage } from 'node-localstorage';

export default function({onLogin}){

    const urlPrefix = 'http://localhost:3000';
    const nav = useNavigate()
    // const ls = new LocalStorage()

    function LogIn(){

        
        const [email, setEmail] = useState('');
        const [pass, setPass] = useState('');

        function loginLogic(){
            // alert('Loggin In...')
            axios.post(urlPrefix+'/login',{email:email, password:pass})
            .then((res)=>{
                // console.log("RETURNED  :  "+res.data.status)
                if(res.data.status=='INVALID USER'){alert('Invalid Credentials !!')}
                if(res.data.status=='VALID'){
                    localStorage.setItem('token', res.data.token);
                    nav('/')
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
        const [pass, setPass] = useState('');
        const [confirmPass, setConfirm] = useState('');

        function regLogic(){
            alert('Register Logic')
        }

        return(
            <>
                <div className='regMain'>
            
            <div className='inputs'>
            <label style={{'fontSize':'1.2rem', 'color':'black', 'padding':'1rem'}}>REGISTER</label>
                <input type='text' placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                <input type='text' placeholder='Password' value={pass} onChange={(e)=>setPass(e.target.value)} />
                <input type='text' placeholder='Confirm Password' value={confirmPass} onChange={(e)=>setConfirm(e.target.value)} />
                <button onClick={()=>{regLogic()}} className='btn'> REGISTER </button>
            </div>
        </div>
            </>
        );
    }




    const [logOrReg, setLogOrReg] = useState('login');

    function handleSubmit(event){
        // event.preventDefault();
        onLogin({email, pass});
    }
 
    

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




            {/* <div className='regMain'>
            
            <div className='inputs'>
            <label style={{'fontSize':'1.2rem', 'color':'black', 'padding':'1rem'}}>LOGIN</label>
                <input type='text' placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                <input type='text' placeholder='Password' value={pass} onChange={(e)=>setPass(e.target.value)} />
                <button onClick={()=>{onLogin({email, pass})}} className='btn'> LOGIN </button>
            </div>
        </div> */}

            {/* <button onClick={(e)=>{handleSubmit(e.target.value)}}>Login</button> */}
            
        </>
    );
}