import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import './App.css'
import Gradebook from './gradebook/gradebook';
import Home from './Home/Home';
import logo from './assets/gpa.png'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
    <div>
      <div className='pd-hz nav'>
      <img src={logo} className='logo'/>
      <NavLink to="/gradebook">Gradebook</NavLink>
      <NavLink to="/">Grade Entry</NavLink>
      </div>
    <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/gradebook" element={<Gradebook/>} />
      </Routes>
      </div>
    </Router>
    

      
  )
}

export default App
