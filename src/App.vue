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
              <router-link :to="{ name: 'EmployeeSettings' }" class="nav-link">
                Employee Settings
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
                    <router-link class="dropdown-item" :to="{ name: 'Settings' }">
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
import { ref } from "@vue/reactivity";
import { useRouter, useRoute } from "vue-router";
import { onBeforeMount } from "@vue/runtime-core";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
export default {
  name: "App",
  setup() {
    const logged_in = ref(firebase.auth().currentUser ? true : false);
    const show_buttons = ref(true);
    const router = useRouter();
    const route = useRoute();
    const user_type = ref(
      firebase.auth().currentUser
        ? firebase.auth().currentUser.displayName
        : "none"
    );

    onBeforeMount(() => {
      firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
          if (route.path != "/register") {
            router.replace("/login");
          }
          logged_in.value = false;
          user_type.value = "none";
        } else if (route.path == "/login" || route.path == "/register") {
          router.replace("/");
          logged_in.value = true;
          user_type.value = user.displayName;
          //console.log(user.displayName);
        }
      });
    });

    const logout = () => {
      firebase.auth().signOut();
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
