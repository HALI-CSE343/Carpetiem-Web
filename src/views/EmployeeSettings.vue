<template>
  <body>
    <div class="general-container">
      <div id="nav-placeholder"></div>

      <div id="app">
        <div class="table-responsive">
          <h3 class="p-3 text-center">
            Tüm Elemanlarınız Aşağıda Listelenmiştir
          </h3>
          <table class="table table-dark table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Tel_no</th>
                <th>Email</th>
                <th>Adres</th>
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
                  <p class="empText"></p>
                  <button
                    id="edtbtn"
                    class="btn btn-warning"
                    @click="willEdit(employee)"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    data-bs-whatever="@mdo"
                  >
                    Edit
                  </button>
                  <button
                    id="rmwbtn"
                    class="btn btn-danger"
                    @click="removeEmployee(employee)"
                  >
                    Remove
                  </button>
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
                <EditEmployeeForm
                  :employee="willEditEmployee"
                  @closePopUp="closeEdit"
                />
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
                <RegisterForm
                  user_type="employee"
                  @closePopUp="closeRegister"
                />
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

import RegisterForm from "../components/RegisterForm.vue";
import EditEmployeeForm from "../components/EditEmployeeForm.vue";
import db, { secondaryApp } from "../firebase";
//import admin from "../../functions/node_modules/index";

/*
const functions = require("../../node_modules/firebase-functions");
const admin = require("../../node_modules/firebase-admin");
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});
const db1 = admin.firestore();*/

export default {
  name: "EmployeeSettings",
  components: { RegisterForm, EditEmployeeForm },
  setup() {
    const userName = ref("");
    const telNo = ref("");
    const email = ref("");
    const adress = ref("");
    const password = ref("");
    const willEditEmployee = ref("");
    const employees = ref([]);
    db.collection("employees")
      .get()
      .then((snap) => {
        snap.forEach((doc) => {
          var empval = doc.data();

          empval.email = "TEMPMAIL@gmail.com";
          employees.value.push(empval);
        });
        employees.value.sort(new Intl.Collator("de").compare);
      });

    const willEdit = async (e) => {
      willEditEmployee.value = e;
    };

    const refresh = () => {
      employees.value = [];
      db.collection("employees")
        .get()
        .then((snap) => {
          snap.forEach((doc) => {
            employees.value.push(doc.data());
          });
          employees.value.sort(new Intl.Collator("de").compare);
        });
    };

    const removeEmployee = async (e) => {
      try {
        var snap = await db
          .collection("employees")
          .where("email", "==", e.email)
          .get();
        /*.then((snap) => {
            snap.forEach((doc) => {
              db.collection("employees")
                .doc(doc.id)
                .delete()
                .catch((err) => console.log(err.message));
            });
          });*/

        snap.forEach(async (doc) => {
          await db.collection("employees").doc(doc.id).delete();
        });

        secondaryApp
          .auth()
          .signInWithEmailAndPassword(e.email, e.password)
          .then((user) => {
            user.user.delete();
            secondaryApp.auth().signOut();
          });
        //emp.user.delete();
        //secondaryApp.auth().signOut();

        employees.value = [];

        /*await db
          .collection("employees")
          .get()
          .then((snap) => {
            snap.forEach((doc) => {
              employees.value.push(doc.data());
            });
            employees.value.sort(new Intl.Collator("de").compare);
          });*/

        snap = await db.collection("employees").get();
        snap.forEach((doc) => {
          employees.value.push(doc.data());
        });
        employees.value.sort(new Intl.Collator("de").compare);
      } catch (err) {
        console.log(err.message);
      }

      //e.isExist = false;
    };

    const closeRegister = () => {
      document.getElementById("close-register-btn").click();
    };

    const closeEdit = () => {
      document.getElementById("close-edit-btn").click();
      willEditEmployee.value = "";
    };

    return {
      userName,
      telNo,
      email,
      adress,
      password,
      willEditEmployee,
      employees,
      willEdit,
      refresh,
      removeEmployee,
      closeRegister,
      closeEdit,
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
