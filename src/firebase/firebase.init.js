// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA0qvUy5pRS2EaSVLxnasX3CfYVBi3r0z0",
  authDomain: "staynestbd.firebaseapp.com",
  projectId: "staynestbd",
  storageBucket: "staynestbd.firebasestorage.app",
  messagingSenderId: "836885540571",
  appId: "1:836885540571:web:4dc36d779a39b0125266fe",
  measurementId: "G-QPYB44BFLS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default app;
export { analytics };
