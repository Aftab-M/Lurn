import React, { useState, useEffect } from 'react';
import './profile.css'
import { CookiesProvider, useCookies } from 'react-cookie';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import Header from './Header';
export default function Profile(){

    const [cookie, setCookie] = useCookies(['user'])
    const {uname} = useParams(); 
    const [learnings, setLearnings] = useState(0);
    const [user, setUser] = useState({name:'', email:'', pubCont: 0, venturesList:[{ventureName:'',  learnCount:0}]});
    let ls = 0;
    useEffect(()=>{
        axios.post('http://localhost:3000/getProfile', {name:uname})
        .then((res)=>{
            setUser(res.data.user);
            user.venturesList.sort((a, b)=> b.learnCount - a.learnCount);
            const r = res.data.user.venturesList.sort((a,b)=> b.learnCount - a.learnCount )
            // console.log(r)
            setLearnings(res.data.count)

        })
    }, [])

    return(
        <>
            <Header/>
            <div className="profileMain">
                <div className="prof-image-name">
                    <img src='https://i.scdn.co/image/ab67616100005174a00b11c129b27a88fc72f36b'></img>
                    <div className="profile-name" style={{fontSize:'2rem', paddingLeft:'2rem'}}>{user.email}</div>
                </div>
                <div className="profile-details">
                    <center>
                        <table>
                            <tr>
                                <td>Skills Learnt : {user.venturesList.length}</td>
                                <td>Public Contributions : {user.pubCont}</td>
                            </tr>
                            <tr>
                                <td>Learnings : {learnings}</td>
                                <td>Main Skill : {user.venturesList[0].ventureName}</td>
                            </tr>
                        </table>
                    </center>
                    
                </div>
                
            </div>
        </>
    );
}