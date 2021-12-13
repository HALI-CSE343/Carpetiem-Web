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
                    class="btn btn-warning"
                    @click="willEdit(employee)"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    data-bs-whatever="@mdo"
                  >
                    Edit
                  </button>
                  <button
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
          employees.value.push(doc.data());
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

    /*const addEmp = async () => {
      employees.value = [];

      snap = await db.collection("employees").get();
      snap.forEach((doc) => {
        employees.value.push(doc.data());
      });
      employees.value.sort(new Intl.Collator("de").compare);
    };*/

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

    const closeRegister = async () => {
      document.getElementById("close-register-btn").click();
      employees.value = [];

      var snap = await db.collection("employees").get();
      snap.forEach((doc) => {
        employees.value.push(doc.data());
      });
      employees.value.sort(new Intl.Collator("de").compare);
    };

    const closeEdit = async () => {
      document.getElementById("close-edit-btn").click();
      willEditEmployee.value = "";
      employees.value = [];

      var snap = await db.collection("employees").get();
      snap.forEach((doc) => {
        employees.value.push(doc.data());
      });
      employees.value.sort(new Intl.Collator("de").compare);
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
  margin: 0 0;
  padding: 0em;
  min-height: 100vh;
  max-width: 100vw;
  display: flex;
  flex-direction: column;
}
article {
  flex: 1;
  border: 1px solid orange;
}
header,
footer,
article {
  padding: 1em;
}
header,
footer {
  display: flex;
  height: 100px;
  width: 100%;
  align-items: center;
  justify-content: center;
}
article {
  font-size: 18px;
}
table,
thead,
tbody,
tr,
th,
td {
  border-collapse: collapse;
}
table {
  width: 100%;
}
header,
footer,
thead {
  color: white;
  background-color: orange;
}
th,
td {
  padding: 0.5em 0.2em;
}

tr:nth-child(odd) {
  background-color: orange;
}
.cell-small {
  width: 5%;
}
.cell-medium {
  width: 20%;
}
.cell-large {
  width: 25%;
}
.text-right {
  text-align: right;
}
.text-center {
  text-align: center;
}
.text-left {
  text-align: left;
}

input[id="dltBttn"] {
  margin-right: 1em;
}

@media screen and (max-width: 750px) {
  article,
  body {
    padding: 0;
  }
  table,
  thead,
  tbody,
  tr,
  th,
  td {
    display: block;
  }

  td {
    /* Behave  like a "row" */
    border: none;
    border-bottom: 1px solid #eee;
    position: relative;
    padding-left: 50%;
  }
  td:before {
    /* Now like a table header */
    position: absolute;
    /* Top/left values mimic padding */
    top: 6px;
    left: 6px;
    width: 45%;
    padding-right: 10px;
    white-space: nowrap;
    text-align: left;
  }

  td:nth-of-type(1):before {
    content: "Name: ";
  }
  td:nth-of-type(2):before {
    content: "Tel-no: ";
  }
  td:nth-of-type(3):before {
    content: "E-posta: ";
  }
  td:nth-of-type(4):before {
    content: "Adres: ";
  }
  td:nth-of-type(5):before {
    content: "Şifre: ";
  }
}

/*pop up içi form sonu*/

form {
  padding: 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
label {
  width: 100px;
  display: inline-block;
  text-align: center;
}
.for-pwd label,
input {
  vertical-align: middle;
}
.for-pwd {
  border-style: groove;
}
.bi-eye-slash {
  margin-left: 40px;
}
.bi-eye {
  margin-left: 40px;
}

/*pop up içi form sonu*/
</style>
