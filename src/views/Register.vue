<template>
  <div class="container d-flex flex-column justify-content-center flex-grow-1">
    <div class="row mt-3 mt-md-0">
      <div class="col-md-5">
        <RegisterForm header="Firma Kaydı" user_type="firm" />
      </div>

      <div class="col-md-2 text-center">
        <div class="vr d-none d-md-inline-block" style="height: 100%"></div>
        <hr class="d-block d-md-none" />
      </div>

      <div class="col-md-5">
        <RegisterForm header="Kullanıcı Kaydı" user_type="customer" />
      </div>
    </div>
  </div>
</template>

<script>
import RegisterForm from "../components/RegisterForm.vue";
export default {
  components: { RegisterForm },
};
</script>

<style></style>
