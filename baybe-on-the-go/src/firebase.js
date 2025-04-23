// firebase.js
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyATVroQ9ND5RMflyoTumw__BXZ3fRN-DgQ",
    authDomain: "baybe-d3c04.firebaseapp.com",
    projectId: "baybe-d3c04",
    storageBucket: "baybe-d3c04.firebasestorage.app",
    messagingSenderId: "492574901107",
    appId: "1:492574901107:web:c3eb5177d770ed50853b06",
    measurementId: "G-DPM56MLT4N"
  };

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
