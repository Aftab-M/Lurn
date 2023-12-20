import React from "react";
import './CompoCss.css';
import { useNavigate } from "react-router-dom";
import { CookiesProvider, useCookies } from "react-cookie";
import Profile from "./Profile";


function Header(props){
    const nav = useNavigate()
    const [cookie, setCookies] = useCookies(['isLoggedIn', 'userName']);
    const isLoggedIn = cookie.isLoggedIn;
    
    const logOut = () => {
        localStorage.setItem('token', 'nun')
        localStorage.setItem('user', 'nun')
    }

    const goToProfile = () =>{
        console.log('in gotoProfile');
        
    }


    return(
    <>
        
            <div className='header'>
                LURN
                {
                
                    <div>
                    <button className="log" style={{marginRight:'.1rem', letterSpacing:'1px'}} onClick={()=>{goToProfile()}}>Profile</button>
                    <button className="log" onClick={()=>{logOut()}}>LOG OUT</button>
                    </div>
                                        
                }
            </div>
            

        
    
    </>);


}


export default Header