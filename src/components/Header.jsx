import React from "react";
import './CompoCss.css';
import { useNavigate } from "react-router-dom";

function Header(){
    const nav = useNavigate()
    return(
    <>

        <div className='header' onClick={()=>{nav('/')}}>LURN</div>
    
    </>);


}


export default Header