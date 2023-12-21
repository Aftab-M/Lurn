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

    const [user, setUser] = useState({name:'__'});

    const [ventures, setVentures] = useState([])


    useEffect((()=>{        
        console.log('-------------------> ID IS : '+id)
        axios.post('http://localhost:3000/getUser/'+id)
        .then((res)=>{
            // console.log('RETURNED DATA IS : '+res.data.user)
            setUser(res.data.user);

            axios.post('http://localhost:3000/getHomeData', {name:res.data.user.name})
            .then((result)=>{
                // console.log("Ventures are : "+result.data.ventures);
                setVentures(result.data.ventures);
            })
            .catch((err)=>{
                console.log('Error : '+err)
            })



        })
        .catch((error)=>{console.log("ERROROROROR IS : "+error)})

        



    }),[])


    const navv = useNavigate()
    function nav(uname, name){
        console.log('in nav')
        navv('/'+uname+'/venture/'+name)
    }


    return(
    <>
        <Header id={id} />

            {
                <>
                <div className='body'>

                    <div style={{'fontSize':'2rem', 'paddingBottom':'1rem', display:'flex', alignItems:'center', justifyContent:'space-between'}}> 
                        Hello, {user.name} 
                        <div className="addVen" onClick={()=>{navv('/newVenture/'+user._id)}}>
                            Add Venture
                        </div>
                    </div>
                    Your Ventures : 
                    <div className='ventures'>
                        { ventures.map((e)=>(
                              
                                <div onClick={()=>{nav(user.name,e.ventureName)}} className='venture' key={e._id}>
                                    <div className='venName'> {e.ventureName} </div>
                                    <div className='venProg'> {e.learnCount} %  </div>
                                </div>

                        )) }
                    </div>
                        
                    </div>
                    <TopVentures id={id}/>
                            </>
}
             
            


        

        

    </>);
}

export default Body