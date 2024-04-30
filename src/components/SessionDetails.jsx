import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDatabase, ref, onValue,update } from "firebase/database";
import { initializeApp } from "firebase/app";
import { count } from 'firebase/firestore';

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

const SessionDetails = () => {
  const { sessionId } = useParams();
  const [session, setSession] = useState(null);

  useEffect(() => {
    const sessionRef = ref(db, `sessions/${sessionId}`);
    onValue(sessionRef, (snapshot) => {
      setSession(snapshot.val());
    });
  }, [sessionId, db]);

  const playerRef = useRef(null);
  let player = null;
  let interval = null;

  useEffect(() => {
    if (session && session.youtubeLink) {
      const videoId = extractVideoId(session.youtubeLink);
      if (videoId) {
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";

        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        window.onYouTubeIframeAPIReady = () => {
          player = new window.YT.Player(playerRef.current, {
            height: '390',
            width: '640',
            videoId: videoId,
            playerVars: {
              'playsinline': 1,
              'controls': 1,
            },
            events: {
              'onReady': (event) => {
                console.log('Video is ready');
                update(ref(db, `sessions/${sessionId}`), {
                  timestamp: player.getCurrentTime(),
                  date: new Date().toISOString() // This will record the current date and time in ISO format
                });
                event.target.playVideo(); // Start the video automatically
              },
              'onStateChange': (event) => {
                switch (event.data) {
                  case window.YT.PlayerState.PLAYING:
                    console.log('Video is playing');
                    // Update state in database
                    update(ref(db, `sessions/${sessionId}`), {
                      state: 'PLAYING',
                      timestamp: player.getCurrentTime(),
                      date: new Date().toISOString()
                    });

                    let count = 0;

                    // Start updating timestamp and time every 3 seconds
                    interval = setInterval(() => {
                      count++;
                      if(count <= 3){

                     
                      update(ref(db, `sessions/${sessionId}`), {
                        timestamp: player.getCurrentTime(),
                        date: new Date().toISOString() // This will record the current date and time in ISO format
                      }); }
                    }, 2000);
                  
                    break;
                  case window.YT.PlayerState.PAUSED:
                    console.log('Video is paused');
                    // Update state in database
                    update(ref(db, `sessions/${sessionId}`), {
                      state: 'PAUSED',
                      timestamp: player.getCurrentTime(),
                      date: new Date().toISOString()
                    });
                    break;
                  case window.YT.PlayerState.ENDED:
                    console.log('Video has ended');
                    clearInterval(interval);
                    // Update state in database
                    update(ref(db, `sessions/${sessionId}`), {
                      state: 'ENDED'
                    });
                    break;
                  // Additional states can be handled here, like buffering, etc.
                  default:
                    break;
                }
              }
            }
          });
        };
      }
    }
  }, [session]);

  return (
    <>
      <div id="player" ref={playerRef}></div>
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

export default SessionDetails;
