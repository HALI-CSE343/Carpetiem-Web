<template>
  <div class="container d-flex flex-column justify-content-center flex-grow-1">
    <div class="row mt-3 mt-md-0">
      <div class="col-md-5">
        <RegisterForm header="Admin Login" placeholder="admin@admin.com" />
      </div>

      <div class="col-md-2 text-center">
        <div class="vr d-none d-md-inline-block" style="height: 100%"></div>
        <hr class="d-block d-md-none" />
      </div>

      <div class="col-md-5">
        <RegisterForm
          header="Customer Login"
          placeholder="example@example.com"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
