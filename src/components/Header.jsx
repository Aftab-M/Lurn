import React from "react";
import './CompoCss.css';
import { useNavigate } from "react-router-dom";
import { CookiesProvider, useCookies } from "react-cookie";
import Profile from "./Profile";


function Header({setProfile}){
    const nav = useNavigate()
    const [cookie, setCookies] = useCookies(['isLoggedIn', 'userName']);
    const isLoggedIn = cookie.isLoggedIn;
    
    const logOut = () => {
        setCookies('isLoggedIn', false)
        setCookies('user', null)
    }

    const goToProfile = () =>{
        console.log('in gotoProfile');
        setProfile(true)
    }


    return(
    <>
        <CookiesProvider>
            <div className='header' onClick={()=>{nav('/')}}>
                LURN
                {
                    (isLoggedIn) ?
                    <div>
                    <button className="log" style={{marginRight:'1rem', letterSpacing:'1px'}} onClick={()=>{goToProfile()}}>Profile</button>
                    <button className="log" onClick={()=>{logOut()}}>LOG OUT</button>
                    </div>
                    
                                :
                    <>
                    <button className="log">LOG IN</button>
                    </>
                    
                }
            </div>
            
        </CookiesProvider>
        
    
    </>);


}


export default Header