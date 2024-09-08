import { useState } from 'react'
import './styles/App.css'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import Dblock from './components/dblock.jsx'
import DanceRoom from './components/danceRoom.jsx';
import DanceSessions from './components/danceSessions.jsx';
import CreateSession from './components/createsession.jsx';
import SessionDetails from "./components/SessionDetails";
import Home from './components/Home.jsx';
import { AuthProvider } from "./context/AuthContext.jsx";
import Splash from './components/Splash.jsx';
import SignUp from './components/SignUp.jsx';
import Ablock from './components/Ablock.jsx'; // Import the new Ablock component
import FoosballLeaderboard from './components/LeaderboardRow.jsx';
function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/dblock" element={<Dblock />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<Splash />} />
          <Route path='/foosball' element={<FoosballLeaderboard />} />
          <Route path="/danceroom/:sessionId" element={<DanceRoom />} />
          <Route path="/dancesessions" element={<DanceSessions />} />
          <Route path="/createsession" element={<CreateSession />} />
          <Route path="/session/:sessionId" element={<SessionDetails />} />
          <Route path="/ablock" element={<Ablock />} /> {/* Add this new route */}
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App