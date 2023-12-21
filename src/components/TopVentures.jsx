import React from "react";
import './topVen.css'
import {useNavigate} from 'react-router-dom'

export default function TopVentures(props){
    const topVentures = [
        {name: 'Machine Learning', 'count':20},
        {name: 'Spanish', 'count':10},
        {name: 'Competitive Programming', 'count':12},
        {name: 'Hydraulics', 'count':32},
        {name: 'Music Composition', 'count':39},
        {name: 'JavaScript', 'count':27},
    ];

    const nav = useNavigate();



    return(
        <>
            <div className="mainTopVen">
                Top Ventures on Lurn...
                <div className="venList">
                    {
                        topVentures.map((e)=>(
                                <div key={e.count} className="oneVen" onClick={()=>{nav('/addVenture/'+e.name+'/'+props.id)}}>
                                    <div style={{fontSize:'1.3rem'}}>{e.name}</div>
                                    <div style={{fontSize:'1rem', paddingTop:'.5rem'}}>{e.count} people</div>

                                </div>

                        ))
                    }
                </div>
            </div>
        </>
    );
}