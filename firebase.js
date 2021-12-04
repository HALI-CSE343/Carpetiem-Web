// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-app.js";
import { getFirestore , collection , addDoc , getDocs , getDoc , doc} from "https://www.gstatic.com/firebasejs/9.6.0/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBiZ0W8druRY1pr5FPOoCFwlk3H2w_pL6o",
  authDomain: "hali-4cdae.firebaseapp.com",
  databaseURL: "https://hali-4cdae-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "hali-4cdae",
  storageBucket: "hali-4cdae.appspot.com",
  messagingSenderId: "22371174264",
  appId: "1:22371174264:web:94a42bb5dd637fcb226a8d",
  measurementId: "G-EFLR7VGFMK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(); 