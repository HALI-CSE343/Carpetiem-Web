<template>
  <body>
    <div class="general-container">
      <div id="app">
        <div class="table-responsive">
          <h3 class="p-3 text-center">Tüm Siparişler Aşağıda Listelenmiştir</h3>
          <table class="table table-dark table-striped">
            <thead>
              <tr>
                <th>Customer Name</th>
                <th>Customer Tel_no</th>
                <th>Customer Email</th>
                <th>Carpet Area</th>
                <th>Carpet Cost</th>
                <th>Carpet Type</th>
                <th>Carpet Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="carpet in carpets" :key="carpet">
                <td class="listElement">
                  <p class="empText">{{ carpet.name }}</p>
                </td>
                <td class="listElement">
                  <p class="empText">aaa</p>
                </td>
                <td class="listElement">
                  <p class="empText">aaa</p>
                </td>
                <td class="listElement">
                  <p class="empText">{{ carpet.area }}</p>
                </td>
                <td class="listElement">
                  <p class="empText">{{ carpet.cost }}</p>
                </td>
                <td class="listElement">
                  <p class="empText">{{ carpet.type }}</p>
                </td>
                <td class="listElement">
                  <!-- <p class="empText">{{ carpet.status }}</p> -->
                  <div v-if="carpet.status == status1" class="progress">
                    <div
                      class="progress-bar"
                      role="progressbar"
                      style="width: 25%"
                      aria-valuenow="0"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      {{ carpet.status }}
                    </div>
                  </div>
                  <div v-if="carpet.status == status2" class="progress">
                    <div
                      class="progress-bar"
                      role="progressbar"
                      style="width: 50%"
                      aria-valuenow="0"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      {{ carpet.status }}
                    </div>
                  </div>
                  <div v-if="carpet.status == status3" class="progress">
                    <div
                      class="progress-bar"
                      role="progressbar"
                      style="width: 75%"
                      aria-valuenow="0"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      {{ carpet.status }}
                    </div>
                  </div>
                  <div v-if="carpet.status == status4" class="progress">
                    <div
                      class="progress-bar bg-success"
                      role="progressbar"
                      style="width: 100%"
                      aria-valuenow="0"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      {{ carpet.status }}
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <!--
          <button
            id="addbtn"
            class="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal2"
            data-bs-whatever="@mdo"
          >
            Add Employee
          </button> -->
        </div>

        <!-- Pop-up tarafı -->

        <div
          class="modal fade"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Eleman bilgilerini düzenle
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  id="close-edit-btn"
                ></button>
              </div>

              <div class="modal-body">
                <!-- INSIDE MODAL -->
              </div>
            </div>
          </div>
        </div>
        <!-- Pop-up sonu -->

        <!-- ikinci Pop-up -->
        <div
          class="modal fade"
          id="exampleModal2"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Eleman Ekle</h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  id="close-register-btn"
                ></button>
              </div>

              <div class="modal-body">
                <!-- INSIDE MODAL -->
              </div>
            </div>
          </div>
        </div>
        <!-- ikinci Pop-up sonu -->
      </div>
    </div>
  </body>
</template>

<script>
import { ref } from "@vue/reactivity";
import db from "../firebase";
export default {
  name: "OrderList",
  components: {},
  setup() {
    const customers = ref([]);
    const carpets = ref([]);
    const status1 = ref("Alındı");
    const status2 = ref("Yıkanıyor");
    const status3 = ref("Kuruyor");
    const status4 = ref("Getiriliyor");

    db.collection("carpets")
      .get()
      .then((snap) => {
        snap.forEach((doc) => {
          var tempdata = doc.data();
          /*db.collection("customers")
            .get()
            .then((querySnapshot) => {
              querySnapshot.forEach((doc1) => {
                console.log(tempdata.customer_id, " => ", doc1.data());
              });
            });*/

          //tempdata.name = "BBB";
          carpets.value.push(tempdata);
        });
        carpets.value.sort(new Intl.Collator("de").compare);
      });
    return {
      customers,
      carpets,
      status1,
      status2,
      status3,
      status4,
    };
  },
};

/*    POPUP    BASI   */

/*    POPUP    SONU   */
</script>

<style scoped>
body {
  margin: 2em;
}
table {
  min-height: 5vh;
  max-width: 100vw;
}
#addbtn {
  background: seagreen;

  max-width: 6em;
  min-width: 6em;
  border: 3px solid green;
  padding: 0em;
}
#rmwbtn {
  background: red;
  margin: 0.1em;
  max-width: 6em;
  min-width: 6em;
}
#edtbtn {
  background: orange;
  margin: 0.1em;
  max-width: 6em;
  min-width: 6em;
}
</style>
