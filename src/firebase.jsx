import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

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
export const auth = getAuth(app);
export const database = getDatabase(app);
export const firestore = getFirestore(app);
export default app;