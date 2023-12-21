import React from 'react'
import {useState} from 'react'
import './aForm.css'
import {useParams, useNavigate} from 'react-router-dom'
import axios from 'axios'
// import { all } from 'express/lib/application'


export default function AddForm(props){

    const nav = useNavigate()
    const {name, id} = useParams();

    const [newThingsCount, setNewThingsCount] = useState();
    const [aim, setAim] = useState();
    const [months, setMonths] = useState();


    function validateAndNavigate(){
        var allGood = true;
        // console.log(newThingsCount + '  and  '+aim+' and '+months)
        if(newThingsCount==undefined || newThingsCount==0){alert("Select appropritate count !"); allGood = false;}
        if(aim==undefined || aim==''){alert('Come on, Set some aim !!!'); allGood = false;}
        if(months==undefined || months==0){alert('Choose some good months please !'); allGood = false;}
        
        if(allGood){
            axios.post('http://localhost:3000/addNewVenture', {id:id, name:name})
            .then((res)=>{
                console.log(res.data);
                if(res.data.status=='done'){nav('/home/'+id)}
            })
            .catch((err)=>{
                console.log('ERROR  :  ---> '+err)
            })
            // nav('/venture/'+name)
        }

    }



    return(
        <>
            <div className="addNewVen">
                <div className="title" style={{fontSize:'1.5rem'}}>{name}</div>
                <br/><br/><br/>
                How many new things do you wish to learn each month ?? <br/><input onChange={(e)=>{setNewThingsCount(e.target.value)}} type="number" placeholder='Most Common : 20' />
                <br/><br/><br/>
                What do you aim to learn from {name} ?? <br/> <input onChange={(e)=>{setAim(e.target.value)}} type="text" placeholder='Get proficient in 2 months' />
                <br/><br/><br/>
                How many months are you planning to achieve this goal in ?? <br/><input onChange={(e)=>{setMonths(e.target.value)}} type="number" placeholder='2 months, maybe ??' />
                <br/>
                {/* <a href="http://localhost:5173/" target='_blank'>GOMD</a> */}
                <button onClick={()=>{validateAndNavigate()}}> Let's go ! </button>

            </div>
        </>
    );
}