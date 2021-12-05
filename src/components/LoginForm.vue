<template>
  <h4 class="text-center mb-3">{{ header }}</h4>
  <form novalidate>
    <div class="row mb-3">
      <div class="col-md-12">
        <label for="email" class="form-label">Email</label>
        <div class="input-group has-validation">
          <span class="input-group-text">
            <i class="bi bi-envelope-fill"></i>
          </span>
          <input
            :id="user_type + '-email'"
            type="email"
            class="form-control"
            :placeholder="placeholder"
            autocomplete="off"
            v-model="email"
            @keyup="
              is_email_valid = /^([a-z][a-z0-9_-]*@[a-z]+\.[a-z]+)$/.test(email)
            "
            :class="{
              '': is_email_valid === '',
              'is-valid': is_email_valid,
              'is-invalid': is_email_valid === false,
            }"
            required
          />
          <div class="invalid-feedback">Valid email is required</div>
        </div>
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-md-12">
        <label for="password" class="form-label">Password</label>
        <div class="input-group has-validation">
          <span class="input-group-text">
            <i class="bi bi-lock-fill"></i>
          </span>
          <input
            :id="user_type + '-password'"
            :type="is_pwd ? 'password' : 'text'"
            class="form-control border-end-0"
            autocomplete="off"
            v-model="password"
            @keyup="is_pwd_valid = password.length >= 6"
            :class="{
              '': is_pwd_valid === '',
              'is-valid': is_pwd_valid,
              'is-invalid': is_pwd_valid === false,
            }"
            required
          />
          <span
            class="input-group-text bg-transparent"
            @click="is_pwd = !is_pwd"
            :class="{
              '': is_pwd_valid === '',
              'border-success': is_pwd_valid,
              'border-danger': is_pwd_valid === false,
            }"
          >
            <i
              class="bi"
              :class="{ 'bi-eye-slash': is_pwd, 'bi-eye': !is_pwd }"
            ></i>
          </span>
          <div class="invalid-feedback">
            Password must be at least 6 characters long
          </div>
        </div>
      </div>
    </div>
    <div
      class="alert alert-danger d-flex align-items-center alert-dismissible"
      role="alert"
      v-if="error"
    >
      <i class="bi bi-exclamation-triangle-fill me-2"></i>
      <div>Kullanıcı adı yada şifre hatalı</div>
      <button
        type="button"
        class="btn-close"
        data-hide="alert"
        aria-label="Close"
        @click="error = false"
      ></button>
    </div>
    <div class="row mb-5">
      <div class="d-grid col-md-12 mx-auto">
        <button
          class="btn btn-primary"
          type="button"
          :disabled="!is_pwd_valid || !is_email_valid"
          @click="login"
        >
          Login
        </button>
      </div>
    </div>
    <div class="row mb-1">
      <div class="col-auto mx-auto">
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            value=""
            :id="user_type + 'always-login'"
          />
          <label class="form-check-label" :for="user_type + 'always-login'">
            Always Login
          </label>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-auto mx-auto mb-1">
        <router-link to="#" style="text-decoration: none">
          Şifrenizi mi unuttunuz <i class="bi bi-box-arrow-up-right"></i>
        </router-link>
      </div>
    </div>
    <div class="row">
      <div class="col-auto mx-auto">
        Hesabınız yok mu?
        <router-link :to="{ name: 'Register' }" style="text-decoration: none">
          Şimdi oluşturun <i class="bi bi-box-arrow-up-right"></i>
        </router-link>
      </div>
    </div>
  </form>
</template>

<script>
import { ref } from "@vue/reactivity";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import db from "../firebase";
export default {
  name: "LoginForm",
  props: {
    header: String,
    placeholder: String,
    user_type: String,
  },
  setup(props) {
    const email = ref("");
    const password = ref("");
    const is_email_valid = ref("");
    const is_pwd_valid = ref("");
    const error = ref(false);
    const is_pwd = ref(true);

    //console.log(firebase.auth.OAuthProvider.prototype.credential.toString());

    const login = () => {
      /*firebase
        .auth()
        .signInWithEmailAndPassword(email.value, password.value)
        .then((cred) => {
          return db
            .collection(props.user_type + "s")
            .doc(cred.user.uid)
            .get();
        })
        .then((doc) => {
          console.log(doc.exists, props.user_type);
          if (!doc.exists) {
            firebase.auth().signOut();
            throw "not in the collection";
          }
        })
        .catch((err) => {
          console.log("error");
          error.value = true;
          email.value = "";
          password.value = "";
          is_email_valid.value = "";
          is_pwd_valid.value = "";
        });*/
      db.collection(props.user_type + "s")
        .where("email", "==", email.value)
        .get()
        .then((snap) => {
          if (snap.size == 0) {
            throw "not in collection";
          } else {
            return firebase
              .auth()
              .signInWithEmailAndPassword(email.value, password.value);
          }
        })
        .then((user) => {
          console.log(user.user);
        })
        .catch((err) => {
          error.value = true;
          email.value = "";
          password.value = "";
          is_email_valid.value = "";
          is_pwd_valid.value = "";
        });
    };

    return {
      email,
      password,
      is_email_valid,
      is_pwd_valid,
      login,
      error,
      is_pwd,
    };
  },
};
</script>
