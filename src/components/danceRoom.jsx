import React, { useEffect, useState,useRef } from 'react';
import { useParams } from 'react-router-dom';
import { getDatabase, ref, onValue } from "firebase/database";
import { initializeApp } from "firebase/app";
import ReactPlayer from 'react-player'

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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const extractVideoId = (url) => {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  return match ? match[1] : null;
};

const DanceRoom = () => {
  const { sessionId } = useParams();
  const [session, setSession] = useState(null);

  useEffect(() => {
    const sessionRef = ref(db, `sessions/${sessionId}`);
    onValue(sessionRef, (snapshot) => {
      setSession(snapshot.val());
    });
  }, [sessionId, db]);

  const playerRef = useRef(null);

  useEffect(() => {
    if (session && session.youtubeLink) {
      const videoId = extractVideoId(session.youtubeLink);
      if (videoId) {
        const sessionStateRef = ref(db, `sessions/${sessionId}/state`);
        onValue(sessionStateRef, (snapshot) => {
          const state = snapshot.val();
          if (state === 'PLAYING') {
            
            const currentTime = new Date().getTime();
                const sessionTime = new Date(session.date).getTime();
                const timeDifference = (currentTime - sessionTime) / 1000;
                const timeToSeek = session.timestamp + timeDifference + 0.01;
                console.log(timeToSeek);
                console.log(session.timestamp); 
                playerRef.pl
                playerRef.current.seekTo(timeToSeek);
          }
        });
      }
    }
  }, [session]);

  return (
    <>
      <ReactPlayer url={`https://www.youtube.com/watch?v=${session?.youtubeLink}`} controls ref={playerRef} playing={session?.state === 'PLAYING'} />
      {session && (
        <>
          <h1>{session.songName}</h1>
          <p>{session.username}</p>
          <p>{session.startTime}</p>
          <p>{session.youtubeLink}</p>
        </>
      )}
    </>
  );
};

export default DanceRoom;