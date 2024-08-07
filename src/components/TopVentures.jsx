import React from "react";
import './topVen.css'
import { useState } from "react";
import {useNavigate} from 'react-router-dom'
import { useEffect } from "react";
import axios from "axios";

export default function TopVentures(props){
   

    const [topVentures, setTopVentures] = useState([]);

    const nav = useNavigate();

    function filterAndSetTV(l){
        console.log('In filterAndSetTV'+props.mylist)

        const filtered = l.filter(item=>
                !props.mylist.some(listItem => listItem.ventureName == item.venName)
            )
        
        console.log(filtered);
        setTopVentures(filtered);
    }


    const navv = useNavigate()
    function navi(id, name){
        console.log('in nav')
        navv('/addVenture/'+name+'/'+id)
    }



    useEffect(()=>{
        axios.post('http://localhost:3000/getTopVentures')
        .then((res)=>{
            if(res.data.status=='okay'){setTopVentures(res.data.tv);}
            else if(res.data.status=='err'){console.log('DB Error !')}
        })
        .catch((err)=>{
            console.log('Error ! : '+err)
        })
    },[])


    return(
        <>
            <div className="mainTopVen">
                Top Ventures on Lurn...
                <div className="venList">
                    {
                        topVentures.map((e)=>(
                                <div key={e._id} className="oneVen" onClick={()=>{navi(props.id, e.venName)}}>
                                    <div style={{fontSize:'1.3rem'}}>{e.venName}</div>
                                    <div style={{fontSize:'1rem', paddingTop:'.5rem'}}>{e.venPeopleCount} people</div>

                                </div>

                        ))
                    }
                </div>
            </div>
        </>
    );
}
