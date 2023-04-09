import { initializeApp, getApps, getApp } from "firebase/app";
const firebaseConfig = {
    apiKey: "AIzaSyAx_ywmxxKuoQPxv1WwnPnfVNV1Ni-5kbI",
    authDomain: "auth-firebase-v1-54f2b.firebaseapp.com",
    projectId: "auth-firebase-v1-54f2b",
    storageBucket: "auth-firebase-v1-54f2b.appspot.com",
    messagingSenderId: "380837257350",
    appId: "1:380837257350:web:bdfcf234e9c4ca9c55f107",
    measurementId: "G-3GG9QJVY1W"
  };

/*
if (getApps().length === 0 ) {
    firebaseApp = initializeApp(firebaseConfig);
}else{
    console.log("Ya hay una app iniciada")
    firebaseApp = getApp();

}
*/
export const firebaseApp = (getApps().length === 0) ? initializeApp(firebaseConfig) : getApp();

