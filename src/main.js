import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { primaryApp } from "./firebase";

let app;

/*firebase.auth().onAuthStateChanged((user) => {
  if (!app) {
    app = createApp(App).use(router).mount("#app");
  }
});*/

primaryApp.auth().onAuthStateChanged((user) => {
  if (!app) {
    app = createApp(App).use(router).mount("#app");
  }
});
