import React from 'react'
import {useState} from 'react'
import './loginReg.css'

export default function({onLogin}){

    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [confirmPass, setConfirm] = useState('');

    function handleSubmit(event){
        // event.preventDefault();
        onLogin({email, pass});
    }
 
    

    return(
        <>
            <div className='regMain'>
            
            <div className='inputs'>
            <label style={{'fontSize':'1.2rem', 'color':'black', 'padding':'1rem'}}>LOGIN</label>
                <input type='text' placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                <input type='text' placeholder='Password' value={pass} onChange={(e)=>setPass(e.target.value)} />
                <button onClick={()=>{onLogin({email, pass})}} className='btn'> LOGIN </button>
            </div>
        </div>

            <button onClick={(e)=>{handleSubmit(e.target.value)}}>Login</button>
            
        </>
    );
}