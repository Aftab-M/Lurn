import React from "react";
import './CompoCss.css';
import { useNavigate } from "react-router-dom";
import { CookiesProvider, useCookies } from "react-cookie";

function Header(){
    const nav = useNavigate()
    const [cookie, setCookies] = useCookies(['isLoggedIn', 'userName']);
    const isLoggedIn = cookie.isLoggedIn;
    
    const logOut = () => {
        setCookies('isLoggedIn', false)
        setCookies('user', null)
    }


    return(
    <>
        <CookiesProvider>
            <div className='header' onClick={()=>{nav('/')}}>
                LURN
                {
                    (isLoggedIn) ?
                    <button className="log" onClick={()=>{logOut()}}>LOG OUT</button>
                                :
                    <button className="log">LOG IN</button>
                }
            </div>
            
        </CookiesProvider>
        
    
    </>);


}


export default Header