import React, { useEffect, useState } from 'react';
import './CompoCss.css'
import {useNavigate} from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Header from './Header';
import TopVentures from './TopVentures';
import LoginPage from './LoginPage'
import {CookiesProvider, useCookies} from 'react-cookie'
import Profile from './Profile';
import axios from 'axios';

function Body(){

    const {id} = useParams()

    const [user, setUser] = useState({name:'Nope'});

    const [ventures, setVentures] = useState([])


    useEffect((()=>{        
        console.log('-------------------> ID IS : '+id)
        axios.post('http://localhost:3000/getUser/'+id)
        .then((res)=>{
            console.log('RETURNED DATA IS : '+res.data.user)
            setUser(res.data.user);
        })
        .catch((error)=>{console.log("ERROROROROR IS : "+error)})

    }),[])


    const navv = useNavigate()
    function nav(name){
        console.log('in nav')
        navv('/venture/'+name)
    }


    return(
    <>
        <Header id={id} />

            {
                <>
                <div className='body'>

                    <div onClick={()=>{navv('/newVenture')}} style={{'fontSize':'2rem', 'paddingBottom':'1rem', display:'flex', alignItems:'center', justifyContent:'space-between'}}> 
                        Hello, {user.name} 
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