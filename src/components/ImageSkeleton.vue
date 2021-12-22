<template>
  <div class="h-100 w-100 skeleton-img rounded-start"></div>
</template>

<script>
export default {};
</script>

<style scoped>
.skeleton-img {
  opacity: 0.8;
  animation: pulse-bg 1s linear infinite alternate;
}
@keyframes pulse-bg {
  0% {
    background-color: hsl(200, 20%, 45%);
    color: hsl(200, 20%, 45%);
  }
  100% {
    background-color: hsl(200, 20%, 95%);
    color: hsl(200, 20%, 95%);
  }
}
@media (max-width: 576px) {
  .skeleton-img {
    border-bottom-left-radius: 0 !important;
    border-top-left-radius: 0.25rem !important;
    border-top-right-radius: 0.25rem !important;
  }
}
</style>
