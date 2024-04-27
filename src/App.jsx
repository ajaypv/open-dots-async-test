import { useState } from 'react'
import './styles/App.css'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import Dblock from './components/dblock.jsx'
import DanceRoom from './components/danceRoom.jsx';

function App() {
  const [count, setCount] = useState(0)

  return (

    <Router>
    <div className="gallery">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dblock" element={<Dblock />} />
        <Route path="/danceroom" element={<DanceRoom />} />

        {/* Repeat for other images */}
      </Routes>
    </div>
  </Router>

    
   
  )
}

export default App

function Home() {
  return (
    <>
    <div className="item">
  <div className="circle">
    <img className="responsive-image" src="https://lh3.googleusercontent.com/p/AF1QipPXQKcYFKA65GJlh0rYNooVBplVw0AysYZKvzHc=s1360-w1360-h1020" alt="circle" />
  </div>
  <p>Block A</p>
</div>
<div className="item">
  <div className="circle">
    <img className="responsive-image" src="https://lh3.googleusercontent.com/p/AF1QipN2_O0eBNKrjbwQU56tu1LgpY9bRupy6LfBWm3d=s1360-w1360-h1020" alt="circle" />
  </div>
  <p>Block B</p>
</div>
<div className="item">
  <div className="circle">
    <img className="responsive-image" src="https://lh3.googleusercontent.com/p/AF1QipNIqrmFIMDKXi0V8jqu8QnTl_HN1H-jiX6_UDEe=s1360-w1360-h1020" alt="circle" />
  </div>
  <p>Block C</p>
</div>
<div className="item">
  <Link to="/dblock">

  <div className="circle">
    <img className="responsive-image" src="https://lh3.googleusercontent.com/p/AF1QipNCFDRvvw1PVpURpq0swlrFEqJyZmj4wkrM0plN=s1360-w1360-h1020" alt="circle" />
  </div>
  <p>Block D</p>
  </Link>
</div>

    </>
   
  )
}

