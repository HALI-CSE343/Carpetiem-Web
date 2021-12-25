<template>
  <div
    class="container-fluid py-3"
    style="background-color: hsl(120, 12.5%, 70%)"
  >
    <div class="row d-flex justify-content-center">
      <div class="col-10">
        <div class="row rounded bar" style="background-color: #fff">
          <div class="col-sm-4 py-3">
            <div class="row row-cols-1">
              <div class="col">
                <label for="city" class="form-label"> <b>İl:</b> </label>
              </div>
              <div class="col">
                <select id="city" class="form-select" v-model="city">
                  <option value="default">Herhangi</option>
                </select>
              </div>
            </div>
          </div>
          <div class="col-sm-4 py-3">
            <div class="row row-cols-1">
              <div class="col">
                <label for="dist" class="form-label"> <b>İlçe:</b> </label>
              </div>
              <div class="col">
                <select id="dist" class="form-select" v-model="dist">
                  <option value="default">Herhangi</option>
                </select>
              </div>
            </div>
          </div>
          <div class="col-sm-4 py-3">
            <div class="row row-cols-1">
              <div class="col">
                <label for="nbhd" class="form-label"> <b>Mahalle:</b> </label>
              </div>
              <div class="col">
                <select id="nbhd" class="form-select" v-model="nbhd">
                  <option value="default">Herhangi</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="w-100"></div>
      <div class="col-10 mt-3">
        <div class="row gap-2 gap-md-0">
          <div class="col-sm-6 col-md-3 col-lg-4">
            <div class="row row-cols-1">
              <div class="col">
                <label for="sort" class="form-label"> <b>Sırala:</b> </label>
              </div>
              <div class="col">
                <select id="sort" class="form-select">
                  <option value="default">Herhangi</option>
                </select>
              </div>
            </div>
          </div>
          <div class="col-sm-5 col-md-4 col-lg-3">
            <div class="row row-cols-1">
              <div class="col">
                <label for="price" class="form-label">
                  <b>Fiyata Göre Filtrele:</b>
                </label>
              </div>
              <div class="col">
                <div class="d-flex justify-content-between gap-2">
                  <div class="">
                    <input type="text" class="form-control" placeholder="min" />
                  </div>
                  <span
                    class="d-flex justify-content-center align-items-center"
                  >
                    -
                  </span>
                  <div class="">
                    <input type="text" class="form-control" placeholder="max" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-4 col-lg-4 d-flex align-items-end">
            <div class="form-check form-switch form-switch-md mb-2">
              <input
                class="form-check-input"
                type="checkbox"
                id="onlyOpenOnes"
              />
              <label class="form-check-label mt-1 ms-1" for="onlyOpenOnes"
                >Sadece açık olanlar</label
              >
            </div>
          </div>
          <div class="col-md-1 d-grid align-items-end ps-md-0">
            <button class="btn mb-md-1" @click="find">Bul</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div
    class="container-xl d-flex flex-column justify-content-start flex-grow-1"
  >
    <!--<div class="card mx-3 mt-3" style="max-width: 540px">
          <div class="row g-0">
            <div class="col-sm-4">
              <Suspense>
                <template #default>
                  <Image />
                </template>
                <template #fallback>
                  <ImageSkeleton />
                </template>
              </Suspense>
            </div>
            <div class="col-sm-8">
              <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">
                  This is a wider card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </p>
                <p class="card-text">
                  <small class="text-muted"
                    >Gebze Teknik Üniversitesi, Kocaeli</small
                  >
                </p>
              </div>
            </div>
          </div>
        </div>-->
    <p class="ms-3 mt-3" v-if="true"><b>8 sonuç bulundu</b></p>
    <div class="ms-3 mt-3 result-skeleton"></div>
    <div class="row justify-content-center" v-if="skeleton">
      <div class="col-10 col-sm-6 d-flex d-sm-block flex-column">
        <CardSkeleton v-for="index in 4" :key="index" />
      </div>
      <div class="col-10 col-sm-6 d-flex d-sm-block flex-column">
        <CardSkeleton v-for="index in 4" :key="index" />
      </div>
    </div>
    <nav aria-label="Page navigation example">
      <ul class="pagination justify-content-center">
        <li class="page-item">
          <a class="page-link" href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li class="page-item">
          <router-link class="page-link" to="#">1</router-link>
        </li>
        <li class="page-item">
          <router-link class="page-link" to="#">2</router-link>
        </li>
        <li class="page-item">
          <router-link class="page-link" to="#">3</router-link>
        </li>
        <li class="page-item">
          <router-link class="page-link" to="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { storage } from "../firebase";
import ImageSkeleton from "../components/ImageSkeleton.vue";
import Image from "../components/Image.vue";
import CardSkeleton from "../components/CardSkeleton.vue";
import { ref } from "@vue/reactivity";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/functions";
import db from "../firebase";
import { onBeforeMount } from "@vue/runtime-core";
export default {
  components: { ImageSkeleton, Image, CardSkeleton },
  setup() {
    const skeleton = ref(true);
    const city = ref("");
    const dist = ref("");
    const nbhd = ref("");
    const cities = ref([]);
    const districts = ref([]);
    const neighborhoods = ref([]);

    onBeforeMount(async () => {
      if (firebase.auth().currentUser) {
        const getUser = firebase.functions().httpsCallable("getUser");
        const res = await getUser({
          id: firebase.auth().currentUser.uid,
          collection: firebase.auth().currentUser.displayName + "s",
        });
        const user = res.data;
        console.log(user);
        city.value = user.city;
        dist.value = user.district;
        nbhd.value = user.neighborhood;
        const cityDoc = await db
          .collection("cities")
          .where("name", "==", city.value)
          .get();
        /*.then((snap) => {
            snap.forEach((doc) => {
              doc.data().districts.forEach((district) => {
                districts.value.push(district.name);
              });
            });
            districts.value.sort(new Intl.Collator("de").compare);
          });*/
        cityDoc.forEach((doc) => {
          doc.data().districts.forEach((district) => {
            districts.value.push(district.name);
          });
        });
        districts.value.sort(new Intl.Collator("de").compare);

        /*db.collection("cities")
          .where("name", "==", city.value)
          .get()
          .then((snap) => {
            snap.forEach((doc) => {
              doc.data().districts.some((district) => {
                if (district.name === dist.value) {
                  district.neighborhoods.forEach((neighborhood) => {
                    neighborhoods.value.push(neighborhood);
                  });
                  return true;
                }
              });
            });
            districts.value.sort(new Intl.Collator("de").compare);
          });*/
        cityDoc.forEach((doc) => {
          doc.data().districts.some((district) => {
            if (district.name === dist.value) {
              district.neighborhoods.forEach((neighborhood) => {
                neighborhoods.value.push(neighborhood);
              });
              return true;
            }
          });
        });
        neighborhoods.value.sort(new Intl.Collator("de").compare);
      } else {
        city.value = "default";
        dist.value = "default";
        nbhd.value = "default";
      }
    });
    /*var file;
    const getFile = async (e) => {
      file = e.target.files[0];
      let ref = storage.ref().child(file.name);
      let res = await ref.put(file);
      console.log(res);
    };*/
    db.collection("cities")
      .get()
      .then((snap) => {
        snap.forEach((doc) => {
          cities.value.push(doc.data().name);
        });
        cities.value.sort(new Intl.Collator("de").compare);
      });

    const onCityChange = async () => {
      districts.value = [];

      let snap = await db
        .collection("cities")
        .where("name", "==", city.value)
        .get();

      snap.forEach((doc) => {
        doc.data().districts.forEach((district) => {
          districts.value.push(district.name);
        });
      });

      districts.value.sort(new Intl.Collator("de").compare);
      dist.value = "default";
      nbhd.value = "default";
      is_dist_valid.value = null;
      is_nbhd_valid.value = null;
      is_city_valid.value = city.value != "default";
    };

    const onDistrictChange = async () => {
      neighborhoods.value = [];

      let snap = await db
        .collection("cities")
        .where("name", "==", city.value)
        .get();

      snap.forEach((doc) => {
        doc.data().districts.some((district) => {
          if (district.name === dist.value) {
            district.neighborhoods.forEach((neighborhood) => {
              neighborhoods.value.push(neighborhood);
            });
            return true;
          }
        });
      });

      neighborhoods.value.sort(new Intl.Collator("de").compare);
      nbhd.value = "default";
      is_nbhd_valid.value = null;
      is_dist_valid.value = dist.value != "default";
    };
    const find = () => {};

    return {
      //getFile,
      skeleton,
      find,
      city,
      dist,
      nbhd,
      onCityChange,
      onDistrictChange,
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

.card:not(.skeleton-card):hover {
  box-shadow: 0 10px 25px 5px hsl(120, 12.5%, 52.9%);
  background-color: hsl(120, 12.5%, 52.9%);
}

.bar {
  box-shadow: 0 10px 15px 0 rgba(0, 0, 0, 0.25);
}

.form-switch.form-switch-md .form-check-input {
  height: 1.5rem;
  width: calc(2rem + 0.75rem);
  border-radius: 3rem;
}

@media (max-width: 400px) {
  .col-10.col-sm-6.d-flex.d-sm-block.flex-column {
    width: 100%;
  }
}

.result-skeleton {
  width: 15%;
  height: 1rem;
  border-radius: 0.125rem;
  opacity: 0.8;
  animation: skeleton-loading 1s linear infinite alternate;
}
</style>
