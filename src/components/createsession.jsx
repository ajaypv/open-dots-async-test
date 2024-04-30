import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";
import React, { useState } from 'react';
import { push } from "firebase/database";
import { getAuth } from "firebase/auth";
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
  
const app = initializeApp(firebaseConfig);
const db = getDatabase();
const CreateSession = () => {
    const [username, setUsername] = useState('');
    const [songName, setSongName] = useState('');
    const [startTime, setStartTime] = useState('');
    const [youtubeLink, setYoutubeLink] = useState('');

    
   
  
    const handleSubmit = async (event) => {
      event.preventDefault();

      const auth = getAuth();
      const user = auth.currentUser;

      const sessionData = {
        username: user.displayName || username, // use the user's display name if available, otherwise use the username from the form
        email: user.email, // get the email from the user
        uid: user.uid, // get the uid from the user
        songName,
        startTime,
        youtubeLink
      };
  
     
  
      await push(ref(db, 'sessions/'), sessionData);
      alert('Session created successfully');
    };
    return (
        <div>
          <h1>Create Session</h1>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
            <input type="text" placeholder="Song Name" value={songName} onChange={(e) => setSongName(e.target.value)} required />
            <input type="text" placeholder="Start Time" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
            <input type="text" placeholder="Youtube Link" value={youtubeLink} onChange={(e) => setYoutubeLink(e.target.value)} required />
            <button type="submit">Create Session</button>
          </form>
        </div>
      );
    };
      


export default CreateSession;
