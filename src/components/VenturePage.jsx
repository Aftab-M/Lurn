import {useParams} from 'react-router-dom'
import './venCss.css'
import { useState } from 'react'
import Header from './Header'

function VenturePage(){
    const {name} = useParams()
    const [isInputDialogOpen, setDialogStatus] = useState(false);
    const [isDescriptionOpen, setDescriptionStatus] = useState(false);
    const [clickedItem, setClickedItem] = useState();
    const list = [
        {name:'Cole', desc: 'The Passport Bros', public: true},
        {name:'Bassi', desc: 'The Passport Bros', public: true},
        {name:'Kendrick', desc: 'Kung Fu Kenny', public: false},
        {name:'Cole', desc: 'The Passport Bros', public: true},
        {name:'Bassi', desc: 'The Passport Bros', public: false},
        {name:'Kendrick', desc: 'Kung Fu Kenny', public: false}
    ];

    const topLearnings = [
        {name:'ABC', desc:'NOTA'},
        {name:'ABC', desc:'NOTA'},
        {name:'ABC', desc:'NOTA'},
        {name:'ABC', desc:'NOTA'}
    ];


    function Dialog(){
        return(
            <>
            <div className='overlay' onClick={()=>{setDialogStatus(false)}}></div>
            
                <div className='dialog'>
                <div style={{'fontSize':'1.5rem', 'padding':'1rem'}}> Let's add what your progress </div>
                <input type="text" placeholder='Title'/>
                <input type="text" placeholder='Description'/>
                <button onClick={()=>{alert('Added !')}} style={{'margin':'1rem'}} >Add New Entry</button>
                <button onClick={()=>{setDialogStatus(false)}} >Close Dialog</button>
                </div>
                
            </>
        );
    }

    const updateLogic = () => {
        alert('Updated, maybe !');
    }



    function LearningDetails(props){
        const descc = props.item.desc;
        const [dd, setDd] = useState(descc);
        const [isTextAreaDisabled, setTextAreaDisabled] = useState(true);
        return(
            <>
                <div className='overlay' onClick={()=>{setDescriptionStatus(false)}}></div>
                <div className='learningEnlarged'>
                    <div className="btns">
                        <div className="edit-btn" onClick={()=>{setTextAreaDisabled(!isTextAreaDisabled)}} >Edit</div>
                        <div className="cross-btn" onClick={()=>setDescriptionStatus(false)}>X</div>
                    </div>
                    
                    <div className="inner-container">
                        <div className="learning-title">{props.item.name}</div>
                        <div className="learning-content">
                           <center> <textarea disabled={isTextAreaDisabled} className='txtarea'  rows="20" defaultValue={dd} onChange={(e)=>{setDd(e.target.value);}}></textarea> </center> 
                           <center> <button className='update-btn' onClick={()=>{updateLogic()}}>UPDATE</button> </center>
                        </div>
                    </div>
                </div>
            </>
        );
    }



    return(
    <>
        
        <Header/>
        
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

        
        <div className='learning-list'>
        <div style={{'fontSize':'1.3rem'}}>Things You've learnt so far...</div>
            {
                list.map((e)=>(
                    <div  style={{}} className='oneList' onClick={()=>{setDescriptionStatus(true); setClickedItem(e)}}>
                    <div>
                        <div style={{'fontSize':'1.2rem'}}>{e.name}</div>
                        <div style={{'paddingTop':'1rem'}}>
                            {e.desc}
                        </div>
                    </div>
                        <div className='list-end'>
                            <div className='end-item' style={{border: '1px white solid', padding: '.4rem'}}>{(e.public)?'Public':'Private'}</div>
                            <div className='end-item' style={{border: '1px white solid', marginLeft:'1rem', padding: '.4rem'}} onClick={()=>{confirm('Ayo you wanna delete for sure ?')}} >Delete</div>
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
                            <>
                            
                                <div className="topOne">
                                    <div style={{fontSize: '1.5rem'}}>{e.name}</div>
                                    <div style={{fontSize:'.8rem', paddingTop:'.3rem'}}> {e.desc} </div>
                                </div>
                            
                            
                                
        
                            </>
                        ))
                    }        
                </div>
                
            
        </div>


        
    </>
    )
}


export default VenturePage





