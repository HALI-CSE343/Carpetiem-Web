<template>
  <body>
    <div class="general-container">
      <div id="app">
        <div class="table-responsive">
          <h3 class="p-3 text-center">Tüm Siparişler Aşağıda Listelenmiştir</h3>
          <table class="table table-dark table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Tel_no</th>
                <th>Email</th>
                <th>Adres</th>
                <th>Şifre</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="employee in employees" :key="employee">
                <td class="listElement">
                  <p class="empText">{{ employee.name }}</p>
                </td>
                <td class="listElement">
                  <p class="empText">{{ employee.phone }}</p>
                </td>
                <td class="listElement">
                  <p class="empText">{{ employee.email }}</p>
                </td>
                <td class="listElement">
                  <p class="empText">{{ employee.address }}</p>
                </td>
                <td class="listElement">
                  <p class="empText">{{ employee.password }}</p>
                </td>
                <td class="listElement">
                  <p class="empText"></p>
                  <button
                    id="edtbtn"
                    class="btn btn-warning"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    data-bs-whatever="@mdo"
                  >
                    Edit
                  </button>
                  <button id="rmwbtn">Remove</button>
                </td>
              </tr>
            </tbody>
          </table>

          <button
            id="addbtn"
            class="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal2"
            data-bs-whatever="@mdo"
          >
            Add Employee
          </button>
        </div>

        <!-- Pop-up tarafı -->

        <div
          class="modal fade"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
          v-if="willEditEmployee != ''"
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
export default {
  name: "OrderList",
  components: {},
  setup() {
    return {};
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
