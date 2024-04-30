import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import '../styles/danesessions.css'

const firebaseConfig = {
    apiKey: "AIzaSyCOggO8RKta6u0qolwyfOkpTijFznKlysg",
    authDomain: "open-dots-f2.firebaseapp.com",
    databaseURL: "https://open-dots-f2-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "open-dots-f2",
    storageBucket: "open-dots-f2.appspot.com",
    messagingSenderId: "962649740482",
    appId: "1:962649740482:web:3a13f1a391364d4955d75b",
    measurementId: "G-2Z2M6K1PKL"
};

initializeApp(firebaseConfig);
const db = getDatabase();

const DanceSessions = () => {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const sessionsRef = ref(db, 'sessions/');
    onValue(sessionsRef, (snapshot) => {
      const data = snapshot.val();
      const sessionItems = [];
      for(let id in data) {
        sessionItems.push({ id, ...data[id] });
      }
      setSessions(sessionItems);
    });
  }, []);

  return (
    <>
    <div className="gallery">
      <div className="item">
        <Link to="/createsession">
          <div className="circle">
            <img className="responsive-image" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQD7fvO1WtHt0aC-cc5CO48ltbHTxUIPnzuiYqk6BDGKw&s" alt="circle" />
          </div>
          <p>Create Session</p>
        </Link>
      </div>
      {sessions.map((session) => (
  <Link to={`/session/${session.id}`} key={session.id}>
    <div className="item">
      <div className="circle">
        <img className="responsive-image" src="https://www.constantcontact.com/blog/wp-content/uploads/2021/06/Social-4.jpg" alt="circle" />
      </div>
      <p>{session.songName}</p>
      <Link to={`/danceroom/${session.id}`}>
            <button><p>Join</p></button>
          </Link>
    </div>
  </Link>
))}
</div>
    </>
    
  );
};

export default DanceSessions;