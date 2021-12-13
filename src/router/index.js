import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import EmployeeSettings from "../views/EmployeeSettings.vue";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { primaryApp } from "../firebase";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { requiresUnauth: true },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: { requiresUnauth: true },
  },
  {
    path: "/employee-settings",
    name: "EmployeeSettings",
    component: EmployeeSettings,
    meta: { requiresAuth: true, requiresAdmin: true },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  //const isAuth = firebase.auth().currentUser;
  const isAuth = primaryApp.auth().currentUser;
  const isAdmin = isAuth
    ? isAuth.displayName == "firm"
      ? true
      : false
    : false;
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const requiresUnauth = to.matched.some(
    (record) => record.meta.requiresUnauth
  );
  const requiresAdmin = to.matched.some((record) => record.meta.requiresAdmin);

  if (requiresAuth && !isAuth) next("/login");
  else if (requiresAdmin && !isAdmin) next("/");
  else if (requiresUnauth && isAuth) next("/");
  else next();
});

export default router;
