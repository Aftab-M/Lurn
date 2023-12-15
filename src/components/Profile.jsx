import React from 'react';
import './profile.css'
import { CookiesProvider, useCookies } from 'react-cookie';

export default function Profile(){

    const [cookie, setCookie] = useCookies(['user'])

    return(
        <>
            <div className="profileMain">
                <div className="prof-image-name">
                    <img src='https://i.scdn.co/image/ab67616100005174a00b11c129b27a88fc72f36b'></img>
                    <div className="profile-name" style={{fontSize:'2rem', paddingLeft:'2rem'}}>{cookie.user.email}</div>
                </div>
                <div className="profile-details">
                    <center>
                        <table>
                            <tr>
                                <td>Skills Learnt : 4</td>
                                <td>Public Contributions : 10</td>
                            </tr>
                            <tr>
                                <td>Learnings : 32</td>
                                <td>Main Skill : Spanish</td>
                            </tr>
                        </table>
                    </center>
                    
                </div>
                
            </div>
        </>
    );
}