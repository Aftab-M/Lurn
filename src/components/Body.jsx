import React, { useEffect, useState } from 'react';
import './CompoCss.css'
import {useNavigate} from 'react-router-dom';
import Header from './Header';
import TopVentures from './TopVentures';
import LoginPage from './LoginPage'
import {CookiesProvider, useCookies} from 'react-cookie'
import Profile from './Profile';
import axios from 'axios';

function Body(){

    const [cookies, setCookies] = useCookies(["user"]);
    const [isProfile, setProfile] = useState(false);
    const [usr, setUser] = useState({_id:"" ,name:'No user'});

    function handleLogin(user){
        // setCookies(name, value, options[])       -- SYNTAX
        const a = user.email;
        const b = user.pass;
        console.log('USERRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR IS : '+a+' and '+b)
        axios.post('http://localhost:3000/login', {email:a, password:b})
        .then((res)=>{
            console.log("Status is : "+res.data.status);
            console.log("Token is : "+res.data.token);
            const u = res.data.user;
            setUser(u);
            // console.log(res.data.user)
            if(res.data.token){
                setCookies("user", u, {path:'/'});
                setCookies('isLoggedIn', true);
                setCookies('autoken',res.data.token);
            }
        })
        .catch((err)=>{
            console.log(err)
        })

        
    }


    useEffect((()=>{
        // console.log(cookies.user._id);
        
        // axios.get('http://localhost:3000/getHomeData/'+cookies.user._id).then((d)=>{
        //     console.log('http://localhost:3000/getHomeData/'+cookies.user._id)
        //     console.log(d)
        //     setUser(d.data.data);
        //     console.log('The data is : '+d.data.data)
        // })
        // .catch((err)=>{ console.log('Failed to fetch data in useEffect() !!') })
        // // axios.get('http://localhost:3000/users/').then((res)=>{setUser(res.data.data); console.log('Data is : '+res.data.data)}).catch((err)=>console.log('EOROROR ! : '+err))
        
    }),[])


    const ventures = [{'name':'Machine Learning', 'progress':'10'},
                    {'name':'Spanish', 'progress':'40'}
                    ];
    const navv = useNavigate()
    function nav(name){
        console.log('in nav')
        navv('/venture/'+name)
    }


    return(
    <>
        <Header setProfile={setProfile}/>

            {
                <>
                <div className='body'>

                    <div onClick={()=>{navv('/newVenture')}} style={{'fontSize':'2rem', 'paddingBottom':'1rem', display:'flex', alignItems:'center', justifyContent:'space-between'}}> 
                        Hello, {usr.name} 
                        <div className="addVen">
                            Add Venture
                        </div>
                    </div>
                    Your Ventures : 
                    <div className='ventures'>
                        { ventures.map((e)=>(
                            <>
                                <div className='venture' onClick={()=>{nav(e.name)}}> {e.name} 
                                <div className='venProg'> {e.progress} %  </div>
                                </div>
                        
                            </>
                        )) }
                    </div>
                        
                    </div>
                    <TopVentures/>
                            </>
}
             
            


        

        

    </>);
}

export default Body