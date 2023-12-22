import React from 'react';
import './newVen.css'
import Header from './Header';
import { useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';

export default function NewVenture(){

    const {id} = useParams()

    const topVentures = [
        {name: 'Machine Learning', 'count':20},
        {name: 'Spanish', 'count':10},
        {name: 'Competitive Programming', 'count':12},
        {name: 'Hydraulics', 'count':32},
        {name: 'Music Composition', 'count':39},
        {name: 'JavaScript', 'count':27},
    ];


    const [searchItem, setSearchItem] = useState('');
    const [isEmpty, setIsEmpty] = useState(true);
    const [matchedItems, setMatchedItems] = useState(topVentures);

    const nav = useNavigate();

    const handleChange = (e) =>{
        const filtered = topVentures.filter((match)=>match.name.toLowerCase().includes(searchItem.toLowerCase()))
        setMatchedItems(filtered);
    }


    

    return(
        <>
            <Header/>
            <div className="newVenMain">
                <div style={{fontSize:'1.8rem', padding:'1rem'}}>Search for a venture</div>
                <center> <input onChange={(e)=>{setSearchItem(e.target.value); handleChange(e.target.value); console.log(searchItem)}} type="text" placeholder='Eg : Machine Learning'/> </center> 
            </div>

            

            <div className="venList">
                {
                    (searchItem=='')?
                    topVentures.map((e)=>(
                        <>
                            <div className="oneVen" onClick={()=>{nav('/addVenture/'+e.name+'/'+id)}}>
                                 <div style={{fontSize:'1.3rem'}}>{e.name}</div>
                                 {/* <div style={{fontSize:'1rem', paddingTop:'.5rem'}}>{e.count} people</div> */}
                             </div>
                        </>
                    ))
                    :
                    matchedItems.map((e)=>(
                        <>
                            <div className="oneVen" onClick={()=>{nav('/addVenture/'+e.name+'/'+id)}}>
                                 <div style={{fontSize:'1.3rem'}} >{e.name}</div>
                                 {/* <div style={{fontSize:'1rem', paddingTop:'.5rem'}}>{e.count} people</div> */}
                             </div>
                        </>
                    ))
                    // (searchItem=='')
                    // ?
                    
                    // topVentures.map((e)=>(
                    //     <>
                    //         <div className="oneVen">
                    //             <div style={{fontSize:'1.3rem'}}>{e.name}</div>
                    //             <div style={{fontSize:'1rem', paddingTop:'.5rem'}}>{e.count} people</div>
                    //         </div>
                            
                    //     </>
                    // ))
                    // :
                    // topVentures.map((e)=>(
                    //     <>
                    //         {
                    //         (e.name.includes(searchItem))
                    //         ?
                    //             <div className="oneVen">
                    //             <div style={{fontSize:'1.3rem'}}>{e.name}</div>
                    //             <div style={{fontSize:'1rem', paddingTop:'.5rem'}}>{e.count} people</div>
                    //             </div>
                    //         :
                    //             // setIsEmpty(true)
                    //             <> {()=>{setIsEmpty(true); console.log(isEmpty)}} </>
                    //         }
                            
                    //     </>
                    // ))
                    
                }
                
            </div>
            {
                (matchedItems.length==0)
                ?
                <NoItems searchItem={searchItem} />
                :
                <></>
            }
            
        </>
    );



    function NoItems(props){
        function addVen(){
            // alert('Adding new venture '+props.searchItem)
            axios.post('http://localhost:3000/addNewVenture', {id:id, name:props.searchItem})
            .then((res)=>{
                console.log(res.data);
                if(res.data.status=='done'){nav('/home/'+id)}
            })
            .catch((err)=>{
                console.log('ERROR  :  ---> '+err)
            })
        }
        return(
            <>

                <center>
                    <div className="no-items" >
                        
                    <div>No items related to your search</div>
                    <div className="add-new" style={{marginTop: '1rem'}}>
                        <button onClick={()=>{addVen(props.searchItem); nav('/addVenture/'+props.searchItem+'/'+id)}}>
                            Add new venture - '{props.searchItem}'
                        </button>
                    </div>
                    </div>
                </center>

                <center>
                <img height={400} src="https://static.vecteezy.com/system/resources/previews/024/527/520/original/black-cat-sleeping-with-yarn-ball-error-404-flash-message-resting-cute-pet-wool-ball-empty-state-ui-design-page-not-found-popup-cartoon-image-flat-illustration-concept-on-white-background-vector.jpg" alt="" />
                </center>
            </>
        );
    }




}