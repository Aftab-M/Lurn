import { useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Body from './components/Body'
import VenturePage from './components/VenturePage'
import NewVenture from './components/NewVenture'
import AddForm from './components/AddForm'
import Profile from './components/Profile'
import LoginPage from './components/LoginPage'
import LandingPage from './LandingPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    {/* <Header/> */} 
    <BrowserRouter>
      <Routes>
      
        <Route path='/:uname/venture/:name' element={<VenturePage/>}/>
        <Route path='/newVenture/:id' element={<NewVenture/>} />
        <Route path='/addVenture/:name/:id' element={<AddForm/>} />
        <Route path='/:uname/profile' element={<Profile/>}/>  
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/home/:id' element={<Body/>} />
        <Route path='/' element={<LoginPage/>} />
      </Routes>
    </BrowserRouter>
      {/* <div className='mainClass'>
        <Header/>
        <Body/>
      </div>
       */}
    </>
  )
}

export default App
