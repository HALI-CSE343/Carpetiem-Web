<template>
  <div class="input-group has-validation">home page</div>
  <button @click="show">click</button>
</template>

<script>
//import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
//import { doc, setDoc } from "firebase/firestore";
import db from "../firebase";
import { ref } from "@vue/reactivity";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
export default {
  name: "Home",
  components: {},
  setup() {
    //const auth = getAuth();
    const email = ref("a@gamil.com");
    const password = ref("123456");
    /*createUserWithEmailAndPassword(auth, email.value, password.value)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setDoc(doc(db, "customers", userCredential.user.uid), {
          name: "Los Angeles",
          state: "CA",
          country: "USA",
        });

        console.log(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // ..
      });*/
    const show = () => {
      firebase.auth().signOut();
    };

    const register = () => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email.value, password.value)
        .then((cred) => {
          db.collection("customers").doc(cred.user.uid).set({
            name: "Los Angeles",
            state: "CA",
            country: "USA",
          });
          console.log(cred.user);
        })
        .catch((err) => console.log(err.code, err.message));
      /*createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          setDoc(doc(db, "customers", userCredential.user.uid), {
            name: "Los Angeles",
            state: "CA",
            country: "USA",
          });

          console.log(user);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
          // ..
        });*/
    };

    return {
      register,
      show,
    };
  },
};
</script>
