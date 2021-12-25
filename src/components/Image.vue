<template>
  <img :src="imageUrl" class="img-fluid rounded-start w-100" />
</template>

<script>
import { ref } from "@vue/reactivity";
import { storage } from "../firebase";
export default {
  async setup() {
    const imageUrl = ref("");
    imageUrl.value = (
      await storage.ref().child("ImageNotFound.png").getDownloadURL()
    ).toString();
    return {
      imageUrl,
    };
  },
};
</script>

<style></style>
