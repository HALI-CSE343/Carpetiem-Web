<template>
  <h1>Home page</h1>
  <button class="btn" type="button" @click="showUsers">click</button>
  <ul class="list-group" v-if="show">
    <li v-for="user in users" :key="user" class="list-group-item">
      {{ user }}
    </li>
  </ul>
</template>

<script>
import db from "../firebase";
import { ref } from "@vue/reactivity";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/functions";
export default {
  name: "Home",
  components: {},
  setup() {
    const users = ref([]);
    const show = ref(false);
    const showUsers = async () => {
      /*const authList = firebase.functions().httpsCallable("getAuthList");
      console.log(authList);
      authList("customer")
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err.code, err.message, err.details);
        });
      show.value = true;*/
      /*const userIDs = [];
      await db
        .collection("employees")
        .get()
        .then((docs) => {
          docs.forEach((doc) => userIDs.push({ uid: doc.id }));
        });*/
      /*const deneme = firebase.functions().httpsCallable("deneme");
      const res = await deneme({ collection: "employees" });
      console.log(res.data);
      const cred = firebase.functions().httpsCallable("getUserCred");
      const res2 = await cred({ id: "DrXGn3nAw9WZPpDxDa4W6SQNY2K2" });
      console.log(res2.data);
      console.log({ ...res.data.at(0), ...res2.data });*/
      /*const getAllUsers = firebase.functions().httpsCallable("getAllUsers");
      const res = await getAllUsers("");
      console.log(res.data);
      users.value = res.data;
      show.value = true;*/
      const getUser = firebase.functions().httpsCallable("getUser");
      const res = await getUser({
        id: "DrXGn3nAw9WZPpDxDa4W6SQNY2K2",
        collection: "employees",
      });
      console.log(res.data);
    };

    return {
      showUsers,
      users,
      show,
    };
  },
};
</script>
