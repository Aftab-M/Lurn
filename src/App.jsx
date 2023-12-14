import { useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Body from './components/Body'
import VenturePage from './components/VenturePage'
import NewVenture from './components/NewVenture'
import AddForm from './components/AddForm'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    {/* <Header/> */}
    <BrowserRouter>
      <Routes>
        <Route path='/venture/:name' element={<VenturePage/>}/>
        <Route path='/newVenture' element={<NewVenture/>} />
        <Route path='/addVenture/:name' element={<AddForm/>} />
        <Route path='/' element={<Body/>} />
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
