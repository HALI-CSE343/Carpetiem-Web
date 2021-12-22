<template>
  <input type="file" @change="getFile" />
  <div class="card mt-3 mx-3" style="max-width: 540px">
    <div class="row g-0">
      <div class="col-sm-4">
        <!--<img
          src="../assets/ImageNotFound.png"
          class="img-fluid rounded-start w-100"
        />-->
        <ImageSkeleton />
      </div>
      <div class="col-sm-8">
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <p class="card-text">
            This is a wider card with supporting text below as a natural lead-in
            to additional content. This content is a little bit longer.
          </p>
          <p class="card-text">
            <small class="text-muted">Last updated 3 mins ago</small>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { storage } from "../firebase";
import ImageSkeleton from "../components/ImageSkeleton.vue";
export default {
  components: { ImageSkeleton },
  setup() {
    var file;
    const getFile = async (e) => {
      file = e.target.files[0];
      let ref = storage.ref().child(file.name);
      let res = await ref.put(file);
      console.log(res);
    };
    return {
      getFile,
    };
  },
};
</script>

<style scoped>
@media (max-width: 576px) {
  .card img {
    border-bottom-left-radius: 0 !important;
    border-top-left-radius: 0.25rem !important;
    border-top-right-radius: 0.25rem !important;
  }
}
</style>
