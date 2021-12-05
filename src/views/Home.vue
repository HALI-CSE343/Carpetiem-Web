<template>
  <h1>Home page</h1>
</template>

<script>
import db from "../firebase";
import { ref } from "@vue/reactivity";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
export default {
  name: "Home",
  components: {},
  setup() {
    /*const name = ref("");
    const email = ref("");

    db.collection("customers")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          name.value = doc.data().name;
          email.value = doc.data().email;
        }
      });

    return {
      email,
      name,
    };*/
  },
};
</script>
