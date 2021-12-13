<template>
  <button class="btn">Skeleton</button>
</template>

<script>
export default {};
</script>

<style scoped>
.navbar-dark .navbar-nav .btn {
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
</style>
