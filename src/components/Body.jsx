import React from 'react';
import './CompoCss.css'
import {useNavigate} from 'react-router-dom';
import Header from './Header';
import TopVentures from './TopVentures';
import LoginPage from './LoginPage'
import {CookiesProvider, useCookies} from 'react-cookie'
 

function Body(){

    const username = 'Eminem';

    const [cookies, setCookies] = useCookies(["user"]);

    function handleLogin(user){
        // setCookies(name, value, options[])       -- SYNTAX
        setCookies("user", user, {path:'/'});
        setCookies('isLoggedIn', true);
    }

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
        <Header/>

        <CookiesProvider>
            {

                (cookies.user) 
                ?
                <>
                <div className='body'>

                    <div onClick={()=>{navv('/newVenture')}} style={{'fontSize':'2rem', 'paddingBottom':'1rem', display:'flex', alignItems:'center', justifyContent:'space-between'}}> 
                        Hello, {cookies.user.email} 
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
                :
                <LoginPage onLogin={handleLogin} />
            }
            


        </CookiesProvider>

        

    </>);
}

export default Body