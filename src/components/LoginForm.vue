<template>
  <h4 class="text-center mb-3">{{ header }}</h4>
  <form novalidate>
    <div class="row justify-content-center mb-3">
      <div class="col-md-12 col-lg-12">
        <label for="email" class="form-label">Email</label>
        <div class="input-group">
          <span class="input-group-text">
            <i class="bi bi-envelope-fill"></i>
          </span>
          <input
            ref="emailInput"
            id="email"
            type="email"
            class="form-control"
            :placeholder="placeholder"
            autocomplete="off"
            v-model="email"
            @keyup="validateEmail"
            @blur="addValidationEmail"
            required
          />
          <div class="invalid-feedback">Valid email is required</div>
        </div>
      </div>
    </div>
    <div class="row justify-content-center mb-3">
      <div class="col-md-12 col-lg-12">
        <label for="password" class="form-label">Password</label>
        <div class="input-group">
          <span class="input-group-text">
            <i class="bi bi-lock-fill"></i>
          </span>
          <input
            ref="passwordInput"
            id="password"
            type="password"
            class="form-control"
            autocomplete="off"
            v-model="password"
            @blur="addValidationPassword"
            required
          />
          <div class="invalid-feedback">Password is required</div>
        </div>
      </div>
    </div>
    <div class="row mb-5">
      <div class="d-grid col-md-12 col-lg-12 mx-auto">
        <button
          class="btn btn-primary"
          type="button"
          :disabled="password.length == 0 || !isValidEmail"
        >
          Login
        </button>
      </div>
    </div>
    <div class="row mb-1">
      <div class="col-md-auto mx-auto">
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            value=""
            id="alwaysLogin"
          />
          <label class="form-check-label" for="alwaysLogin">
            Always Login
          </label>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-auto mx-auto mb-1">
        <router-link to="#" style="text-decoration: none">
          Şifrenizi mi unuttunuz <i class="bi bi-box-arrow-up-right"></i>
        </router-link>
      </div>
    </div>
    <div class="row">
      <div class="col-md-auto mx-auto">
        Hesabınız yok mu?
        <router-link to="#" style="text-decoration: none">
          Şimdi oluşturun <i class="bi bi-box-arrow-up-right"></i>
        </router-link>
      </div>
    </div>
  </form>
</template>

<script>
import { ref } from "@vue/reactivity";
export default {
  name: "LoginForm",
  props: ["header", "placeholder"],
  setup() {
    const email = ref("");
    const password = ref("");
    const isValidEmail = ref(false);
    const emailInput = ref(null);
    const passwordInput = ref(null);

    const validateEmail = () => {
      const pattern = /^([a-z][a-z0-9_-]*@[a-z]+\.[a-z]+)$/;
      isValidEmail.value = pattern.test(email.value) ? true : false;
    };

    const addValidationEmail = () => {
      if (isValidEmail.value) {
        emailInput.value.classList.remove("is-invalid");
        emailInput.value.classList.add("is-valid");
      } else {
        emailInput.value.classList.remove("is-valid");
        emailInput.value.classList.add("is-invalid");
      }
    };

    const addValidationPassword = () => {
      if (password.value.length != 0) {
        passwordInput.value.classList.remove("is-invalid");
        passwordInput.value.classList.add("is-valid");
      } else {
        passwordInput.value.classList.remove("is-valid");
        passwordInput.value.classList.add("is-invalid");
      }
    };

    return {
      email,
      password,
      isValidEmail,
      emailInput,
      passwordInput,
      validateEmail,
      addValidationEmail,
      addValidationPassword,
    };
  },
};
</script>
