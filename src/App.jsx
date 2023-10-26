import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import Gradebook from './gradebook/gradebook';
import Home from './Home/Home';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
    <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/gradebook" element={<Gradebook/>} />
      </Routes>
    </Router>

      
  )
}

export default App
