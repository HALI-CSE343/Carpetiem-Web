<template>
  <div class="d-flex flex-column" style="height: 100vh">
    <nav
      class="navbar navbar-expand-md navbar-dark"
      style="background-color: #24252a"
    >
      <div class="container-fluid mx-5">
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navmenu"
          @click="isDropdown = !isDropdown"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <router-link :to="{ name: 'Home' }" class="navbar-brand">
          Carpetiem
        </router-link>
        <div class="collapse navbar-collapse" id="navmenu">
          <ul class="navbar-nav m-auto">
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
            <li class="nav-item">
              <router-link :to="{ name: 'About' }" class="nav-link">
                About
              </router-link>
            </li>
          </ul>
        </div>
        <transition name="fade">
          <div class="dropdown-container" v-if="isDropdown">
            <ul class="navbar-nav">
              <li class="nav-item dropdown">
                <button
                  class="btn dropdown-toggle"
                  href="#"
                  id="user-dropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  type="button"
                >
                  User
                </button>
                <ul
                  class="dropdown-menu dropdown-menu-dark position-absolute"
                  aria-labelledby="user-dropdown"
                >
                  <li v-if="isLogin">
                    <router-link class="dropdown-item" to="#">
                      Action
                    </router-link>
                  </li>
                  <li v-if="isLogin">
                    <router-link class="dropdown-item" to="#">
                      Another action
                    </router-link>
                  </li>
                  <li v-if="isLogin">
                    <router-link class="dropdown-item" to="#">
                      Something else here
                    </router-link>
                  </li>
                  <li v-if="!isLogin">
                    <router-link class="dropdown-item" :to="{ name: 'Login' }">
                      Login
                    </router-link>
                  </li>
                  <li v-if="!isLogin">
                    <router-link class="dropdown-item" to="#">
                      Register
                    </router-link>
                  </li>
                </ul>
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
import db from "./firebase";
export default {
  name: "App",
  setup() {
    const isLogin = ref(false);
    const isDropdown = ref(true);
    /*db.collection("deneme")
      .where("name", "==", "name1")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          console.log(doc.id, "=>", doc.data());
        });
      })
      .catch((error) => {
        console.log("Error: ", error);
      });*/
    return { isLogin, isDropdown };
  },
};
</script>

<style scoped>
.dropdown-container {
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
