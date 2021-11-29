import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDUnAcrNGKFvrqsah67dhZIIEyAjDaHmug",
  authDomain: "carpetiem-bbfe2.firebaseapp.com",
  projectId: "carpetiem-bbfe2",
  storageBucket: "carpetiem-bbfe2.appspot.com",
  messagingSenderId: "1094829919948",
  appId: "1:1094829919948:web:69c9e5106629a2edf63c69",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { timestamp };
export default firebaseApp.firestore();
