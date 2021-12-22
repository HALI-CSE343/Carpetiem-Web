<template>
  <div class="container d-flex flex-column justify-content-center flex-grow-1">
    <div class="row mt-3 mt-md-0">
      <div class="d-grid mx-auto col-md-5 rounded border py-3">
        <LoginForm
          header="Kullanıcı Girişi"
          placeholder="example@example.com"
          user_type="customer"
        />
      </div>
    </div>
  </div>
</template>

<script>
import LoginForm from "../components/LoginForm.vue";
export default {
  name: "Login",
  components: { LoginForm },
};
</script>
