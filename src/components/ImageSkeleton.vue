<template>
  <div class="h-100 w-100 skeleton-img rounded-start"></div>
</template>

<script>
export default {};
</script>

<style scoped>
.skeleton-img {
  opacity: 0.8;
  animation: skeleton-loading 1s linear infinite alternate;
}

@media (max-width: 767px) {
  .skeleton-img {
    border-bottom-left-radius: 0 !important;
    border-top-left-radius: 0.25rem !important;
    border-top-right-radius: 0.25rem !important;
  }
}
</style>
