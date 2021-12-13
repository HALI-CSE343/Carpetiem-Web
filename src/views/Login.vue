<template>
  <div class="container d-flex flex-column justify-content-center flex-grow-1">
    <div class="row mt-3 mt-md-0">
      <div class="col-md-5">
        <LoginForm
          header="Yönetici Girişi"
          placeholder="admin@admin.com"
          user_type="firm"
        />
      </div>

      <div class="col-md-2 text-center">
        <div class="vr d-none d-md-inline-block" style="height: 100%"></div>
        <hr class="d-block d-md-none" />
      </div>

      <div class="col-md-5">
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

<style></style>
