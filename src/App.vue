<template>
  <div class="d-flex flex-column" style="height: 100vh">
    <nav
      class="navbar navbar-expand-md navbar-dark"
      style="background-color: #24252a"
    >
      <div class="container-fluid mx-md-5">
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navmenu"
          @click="show_buttons = !show_buttons"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <router-link :to="{ name: 'Home' }" class="navbar-brand">
          Carpetiem
        </router-link>
        <div class="collapse navbar-collapse ms-5" id="navmenu">
          <ul class="navbar-nav mx-auto">
            <li class="nav-item">
              <router-link :to="{ name: 'About' }" class="nav-link">
                About
              </router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{ name: 'About' }" class="nav-link">
                About
              </router-link>
            </li>
          </ul>
        </div>
        <transition name="fade">
          <div :class="{ 'me-5': logged_in }" v-if="show_buttons">
            <ul class="navbar-nav list-group d-flex flex-row">
              <li class="nav-item dropdown mx-2" v-if="logged_in">
                <button
                  class="btn dropdown-toggle"
                  id="user-dropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  type="button"
                >
                  {{ user_type }}
                </button>
                <ul
                  class="dropdown-menu dropdown-menu-dark position-absolute"
                  aria-labelledby="user-dropdown"
                >
                  <li>
                    <router-link class="dropdown-item" to="#">
                      My Orders
                    </router-link>
                  </li>
                  <li>
                    <router-link class="dropdown-item" to="#">
                      Profile Settings
                    </router-link>
                  </li>
                  <li>
                    <div
                      class="dropdown-item"
                      @click="logout"
                      style="cursor: pointer"
                    >
                      Logout
                    </div>
                  </li>
                </ul>
              </li>
              <li class="nav-item mx-2 d-none d-sm-block" v-if="!logged_in">
                <router-link class="btn" :to="{ name: 'Login' }">
                  Login
                </router-link>
              </li>
              <li class="nav-item mx-2 d-none d-sm-block" v-if="!logged_in">
                <router-link class="btn" :to="{ name: 'Register' }">
                  Register
                </router-link>
              </li>
            </ul>
          </div>
        </transition>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script>
import { computed, ref } from "@vue/reactivity";
import { useRouter, useRoute } from "vue-router";
import { onBeforeMount, watch, watchEffect } from "@vue/runtime-core";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { getUserState, useAuthState } from "./firebase";
import db from "./firebase";
const registered = ref("none");

export const registeredType = (type) => {
  registered.value = type;
};

export default {
  name: "App",
  setup() {
    const show_buttons = ref(true);
    const router = useRouter();
    //const route = useRoute();
    /*const state = computed(() => useAuthState());
    const logged_in = computed(() => state.value.isAuthenticated.value);
    const user_type = computed(() =>
      logged_in.value ? state.value.user.value.displayName : "none"
    );*/

    const logged_in = ref(false);
    const user_type = ref("none");

    firebase.auth().onAuthStateChanged((user) => {
      logged_in.value = !!user;
      user_type.value = !!user
        ? registered.value == "none"
          ? user.displayName
          : registered.value
        : "none";
      //if(registered.value == )
      /*user_type.value = !!user ? user.displayName : "none";*/
      //user_type.value = (await db.collection("customers").doc(user.uid).get()) ? "customer" : "firm"
      /*firebase
        .auth()
        .updateCurrentUser()
        .then(() => {
          user_type.value = !!user ? user.displayName : "none";
        });*/
      //user_type.value = !!user ? user.displayName : "none";
      /*if (logged_in.value) {
        var doc = await db.collection("customers").doc(user.uid).get();
        user_type.value = doc.exists ? "customer" : "firm";
      } else {
        user_type.value = "none";
      }*/
    });

    /*watchEffect(async () => {
      let user = useAuthState();
      logged_in.value = (await getUserState()) ? true : false;
      user_type.value = logged_in.value ? user.user.value.displayName : "none";
      console.log(logged_in.value, user_type.value);
      console.log(user.isAuthenticated.value);
    });*/

    //console.log(logged_in.value, user_type.value);

    /*watch(state.user, () => {
      logged_in.value = state.isAuthenticated.value;
      user_type.value = logged_in.value ? state.user.value.displayName : "none";
      console.log(logged_in.value, user_type.value);
    });*/

    /*onBeforeMount(() => {
      console.log(logged_in.value, user_type.value);

      firebase.auth().onAuthStateChanged((user) => {
        console.log(route.path);
        if (!user) {
          if (route.path != "/register") {
            router.replace("/login");
          }
          logged_in.value = false;
          user_type.value = "none";
          console.log("NO USER");
        } else if (route.path == "/login") {
          router.replace("/");
          logged_in.value = true;
          user_type.value = user.displayName;
          console.log("LOGIN");
        } else if (route.path == "/register") {
          setTimeout(() => {
            router.replace("/");
            console.log("REGISTER");
            logged_in.value = true;
            user_type.value = user.displayName;
          }, 500);
        }
      });
    });*/

    const logout = () => {
      firebase.auth().signOut();
      router.replace("/login");
    };

    return {
      logged_in,
      show_buttons,
      logout,
      user_type,
    };
  },
};
</script>

<style scoped>
.button-container {
  flex-grow: 0.1;
}

.navbar-dark .navbar-nav .nav-link:hover {
  color: rgb(120, 150, 120);
}

.navbar-dark .navbar-toggler {
  color: rgb(120, 150, 120);
}

.navbar-dark .navbar-nav .btn {
  background-color: rgb(120, 150, 120);
}

.navbar-dark .navbar-nav .btn:hover {
  background-color: rgba(120, 150, 120, 0.7);
}

.navbar-dark .navbar-nav .btn:focus {
  box-shadow: none;
}

.dropdown-menu-dark .dropdown-item:active {
  color: #fff;
  background-color: rgba(120, 150, 120, 0.7);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0s ease;
}

.fade-enter-active {
  transition-delay: 0.35s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/*.navbar-dark .navbar-nav .btn:focus {
  box-shadow: 0 0 0 0.25rem rgb(120 150 120 / 25%);
}*/
</style>
