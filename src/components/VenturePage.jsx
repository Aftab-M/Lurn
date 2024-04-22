import {useParams, useNavigate} from 'react-router-dom'
import './venCss.css'
import { useState, useEffect, useReducer } from 'react'
import Header from './Header'
import axios from 'axios'
import useForceUpdate from 'use-force-update'


function VenturePage(){
    const {uname, name} = useParams()
    const [isInputDialogOpen, setDialogStatus] = useState(false);
    const [isDescriptionOpen, setDescriptionStatus] = useState(false);
    const [clickedItem, setClickedItem] = useState();
    const [list, setList] = useState([]);
    const [topLearnings, setTopLearnings] = useState([]);
    const [prompt, setPrompt] = useState('')
    const [aiResponse, setAiResponse] = useState('')

    
    async function getAIHelp(){
        axios.post('http://localhost:3000/getai', {prompt:prompt}).then((res)=>{
            console.log(res.data);
            setAiResponse(res.data);
            setPrompt('')
        });
    }


    // const list = [
    //     {name:'Cole', desc: 'The Passport Bros', public: true},
    //     {name:'Bassi', desc: 'The Passport Bros', public: true},
    //     {name:'Kendrick', desc: 'Kung Fu Kenny', public: false},
    //     {name:'Cole', desc: 'The Passport Bros', public: true},
    //     {name:'Bassi', desc: 'The Passport Bros', public: false},
    //     {name:'Kendrick', desc: 'Kung Fu Kenny', public: false}
    // ];

    // const topLearnings = [
    //     {name:'ABC', desc:'NOTA'},
    //     {name:'ABC', desc:'NOTA'},
    //     {name:'ABC', desc:'NOTA'},
    //     {name:'ABC', desc:'NOTA'}
    // ];


    useEffect(()=>{
        axios.post('http://localhost:3000/getLearnings', {uname:uname, venName:name})  
        .then((res)=>{
            if(res.data.status=='okay'){
                // console.log('Result got is : '+res.data.learnings)
                setList(res.data.learnings)
                setTopLearnings(res.data.topLearnings)
                // const tempTop = res.data.topLearnings;
                // console.log(tempTop)
            }
            else if(res.data.status=='db_err'){
                console.log('Error fetching the data !')
            }
            
        })
        .catch((err)=>{
            console.log('Error is : '+err)
        })
    },[])


    function Dialog(){

        const [title, setTitle] = useState('');
        const [desc, setDesc] = useState('');
        


        function addNewLearning(){
            if((title=='' || desc=='')){
                alert('Please enter both fields !!')
            }   // if
            else{
                console.log('Adding the learning...')
                axios.post('http://localhost:3000/addNewLearning', {vName:name, username:uname, title:title, desc:desc})
                .then((res)=>{
                    console.log(res.data.status);
                    if(res.data.status=='done'){
                        setDialogStatus(false);
                        alert('Added new learning !')
                        location.reload();
                    }
                    else if(res.data.status=='db_err'){
                        alert('DB Error, Please try again in some time !!')
                    }
                })
                .catch((err)=>{
                    console.log('Error : '+err)
                })
            }
            
        }



        return(
            <>
            <div className='overlay' onClick={()=>{setDialogStatus(false)}}></div>
            
                <div className='dialog'>
                <div style={{'fontSize':'1.5rem', 'padding':'1rem'}}> Let's add what your progress </div>
                <input type="text" placeholder='Title' onChange={(e)=>{setTitle(e.target.value)}} />
                <input type="text" placeholder='Description' onChange={(e)=>{setDesc(e.target.value)}} />
                <button onClick={()=>{addNewLearning()}} style={{'margin':'1rem'}} >Add New Entry</button>
                <button onClick={()=>{setDialogStatus(false)}} >Close Dialog</button>
                </div>
                
            </>
        );
    }

    



    function LearningDetails(props){
        const descc = props.item.learningDesc;
        const [dd, setDd] = useState(descc);
        const [isTextAreaDisabled, setTextAreaDisabled] = useState(true);
        const nav = useNavigate()
        const forceUpdate = useForceUpdate()
        const updateLogic = () => {
            // alert('Updated, maybe !');
            // console.log('In update of description...')
            axios.post('http://localhost:3000/updateLearning', {id:props.item._id, desc: dd})
            .then((res)=>{
                if(res.data.status=='updated'){
                    // alert('Updated !')
                    // console.log(res.data.status)
                    setDescriptionStatus(false);
                    location.reload();
                    
                }
                else if(res.data.status=='not-updated'){
                    console.log(res.data.status)
                    alert("Can't update, please try again !")
                }
            })

        }



        return(
            <>
                <div className='overlay' onClick={()=>{setDescriptionStatus(false)}}></div>
                <div className='learningEnlarged'>
                    <div className="btns">
                        <div className="edit-btn" onClick={()=>{setTextAreaDisabled(!isTextAreaDisabled)}} >Edit</div>
                        <div className="cross-btn" onClick={()=>setDescriptionStatus(false)}>X</div>
                    </div>
                    
                    <div className="inner-container">
                        <div className="learning-title">{props.item.learningTitle}</div>
                        <div className="learning-content">
                           <center> <textarea disabled={isTextAreaDisabled} className='txtarea'  rows="20" defaultValue={dd} onChange={(e)=>{setDd(e.target.value);}}></textarea> </center> 
                           <center> <button className='update-btn' onClick={()=>{updateLogic()}}>UPDATE</button> </center>
                        </div>
                    </div>
                </div>
            </>
        );
    }


    function deleteLearning(e){
        setDescriptionStatus(false);
        axios.post('http://localhost:3000/deleteLearning', {id:e._id})
        .then((res)=>{
            // console.log(res.data.status);
            if(res.data.status=='okay'){
                alert('Learning Deleted !')
                location.reload();
            }
            else if(res.data.status=='err'){
                console.log('Error !! '+ err)
            }
        })
        .catch((err)=>{
            console.log('Caught Error : '+err)
        })
    }


    function toggle(e){
        axios.post('http://localhost:3000/toggleVisibility', {id:e._id, uname:uname, vname:e.ventureName})
        .then((res)=>{
            if(res.data.status=='okay'){
                location.reload()
            }
            else if(res.data.status=='err'){
                alert('Some error occured !');
            }
        })
    }


    return(
    <>
        
        <Header uname={uname}/>
        
        {

            (isInputDialogOpen)
            ?
            <center>
                {/* <div className=''> */}
                <Dialog />
            {/* </div> */}
            </center>
            
            :
            <></>    
        }

        {
            (isDescriptionOpen && 
            <div>
                <LearningDetails item={clickedItem} />
            </div> )
        }


        <div style={{'fontSize':'2rem', 'padding':'1rem', 'paddingLeft':'.5rem', 'display':'flex', justifyContent:'space-between'}}> 
            Let's continue with {name}
            <div className='adding'>
            <button className='add-btn' onClick={()=>{ setDialogStatus(!isInputDialogOpen) ; console.log(isInputDialogOpen)  }} >Add new</button>
            </div> 
        </div>
        
        <div className='venMain'>
        </div>

        
        <div className="get-ai-help">
                Get AI Help 
                <div style={{
                    alignItems: 'center', 
                    justifyContent: 'center',
                    display: 'flex', 
                    flexDirection: 'column'

                }}>
                    <div>
                        <input value={prompt} placeholder='Enter a question' onChange={(e)=>{setPrompt(e.target.value)}} style={{
                            width: '50vw'
                        }} type="text" />
                    </div>
                    <div><button onClick={()=>{getAIHelp()}}>Get Response</button></div>
                    <div style={{margin: '1.5rem'}}>
                        {(aiResponse=='')?'Enter a question and hit "Get Response"':aiResponse}
                    </div>
                </div>
        </div>
        
        
        <div className='learning-list'>
        <div style={{'fontSize':'1.3rem'}}>Things You've learnt so far...</div>
            {
                list.map((e)=>(
                    <div key={e._id} style={{}} className='oneList'>
                    <div>
                        <div style={{'fontSize':'1.5rem'}} onClick={()=>{setDescriptionStatus(true); setClickedItem(e)}} >{e.learningTitle}</div>
                        <div style={{'paddingTop':'1rem'}}>
                            {e.learningDesc}
                        </div>
                    </div>
                        <div className='list-end'>
                            <div className='end-item' style={{border: '1px white solid', padding: '.4rem'}} onClick={()=>{toggle(e)}} >{(e.isPublic)?'Public':'Private'}</div>
                            <div className='end-item' style={{border: '1px white solid', marginLeft:'1rem', padding: '.4rem'}} onClick={()=>{deleteLearning(e)}} >Delete</div>
                        </div>
                    </div>
                ))
            }
        </div>
            <div style={{fontSize:'1.7rem', padding: '1rem', paddingTop: '1.7rem'}}>Top learnings in {name}</div>
        <div className="top-learnings">
            
                <div className="tops">
                    {
                        topLearnings.map((e)=>(
                                <div  key={e._id} className="topOne">
                                    <div style={{fontSize: '1.5rem'}}>{e.learningTitle}</div>
                                    <div style={{fontSize:'.8rem', paddingTop:'.3rem'}}> {e.learningDesc} </div>
                                </div>
                        ))
                    }        
                </div>
                
            
        </div>


        
    </>
    )
}


export default VenturePage





