import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBiZ0W8druRY1pr5FPOoCFwlk3H2w_pL6o",
  authDomain: "hali-4cdae.firebaseapp.com",
  databaseURL:
    "https://hali-4cdae-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "hali-4cdae",
  storageBucket: "hali-4cdae.appspot.com",
  messagingSenderId: "22371174264",
  appId: "1:22371174264:web:94a42bb5dd637fcb226a8d",
  measurementId: "G-EFLR7VGFMK",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const timestamp = firebase.firestore.FieldValue.serverTimestamp;
const db = firebaseApp.firestore();
/*const customers = db.collection("customers");
const firms = db.collection("firms");
const employees = db.collection("employees");*/

export { timestamp };
/*export default customers;
export default firms;
export default employees;*/
export default db;
