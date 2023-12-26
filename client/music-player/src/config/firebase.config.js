import { getApp, getApps, initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  // apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  // authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  // projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  // storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGIN_ID,
  // appId: process.env.REACT_APP_FIREBASE_APPI_ID,
  apiKey: "AIzaSyD8W6-YxgzZLtKQq3f7-R_45azkUEFDx5w",
  authDomain: "music-app-73280.firebaseapp.com",
  projectId: "music-app-73280",
  storageBucket: "music-app-73280.appspot.com",
  messagingSenderId: "250460142024",
  appId: "1:250460142024:web:1b04e86c19f7ec4053a8fd",
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const storage = getStorage(app);

export { app, storage };
