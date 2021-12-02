<template>
  <div
    class="container d-flex flex-column justify-content-center flex-grow-1"
  ></div>
</template>

<script>
import db from "../firebase";
export default {
  setup() {
    /*db.collection("cities")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          db.collection("cities").doc(doc.id).delete();
        });
      });*/
    //cities.sort();
    /*cities.forEach((city) => {
      city.districts.forEach((district) => {
        district.neighborhoods.sort((a, b) => (a > b ? 1 : b > a ? -1 : 0));
      });
      db.collection("cities").add(city);
    });*/
    /*db.collection("cities")
      .where("name", "==", "AFYONKARAHİSAR")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          console.log(
            doc.data().districts.find((element) => element === "ŞUHUT")
          );
        });
      })
      .catch((error) => {
        console.log("Error: ", error);
      });*/
  },
};
</script>

<style></style>
