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
                    v-on:click="willEdit(employee)"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    data-bs-whatever="@mdo"
                  >
                    Edit
                  </button>
                  <button class="btn btn-danger" @click="removeRow(employee)">
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

        <!-- Moruk burası Pop-up tarafı -->

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
                ></button>
              </div>

              <div class="modal-body">
                <RegisterForm user_type="employee" />
                <!-- <div id = "app"> 
                            <form>
                                <div class="for-name">
                                    <label for="usr_name">İsim: </label> 
                                    <input v-model= "userName"  id = "usr_name" placeholder="Yeni İsim" >             
                                </div>
                                <br>
                                <div class="for-pwd">
                                    <label for="usr_curr_pwd">Mevcut Şifre:</label>
                                    <input v-model= "password" id="usr_curr_pwd"  placeholder="Mevcut Şifre" />
                                </div>
                                <br>
                                <div class= "for-newPwd">
                                    <label for="usr_newpwd">Yeni Şifre:</label>
                                    <input id="usr_new_pwd"  placeholder="Yeni Şifre" />
                                </div>
                                <br>
                                <div class = "for-rePwd">
                                    <label for="usr_pwd_check">Tekrar Yeni Şifre:</label>
                                    <input id="usr_new_pwd_2" placeholder="Tekrar Yeni Şifre" />
                                </div>

                                <br>
                                <div class = "for-email">
                                    <label for="usr_email">Email:</label>
                                    <input v-model= "email"  id="usr_email" placeholder="Yeni Email">
                                </div>
                                <br>
                                <div class = "for-adress">
                                    <label for="usr_adress">Adres:</label>
                                    <input v-model= "adress" id="usr_adress" placeholder="Yeni Adres">
                                </div>
                                <br>
                                <div class = "for-phone">
                                    <label for="usr_phone">Tel. Numarası:</label>
                                    <input v-model= "telNo" id="usr_phone" placeholder="Yeni Numara +90 " maxlength="10">
                                </div>
                                <br>
                                
                            </form>   
                        </div>
                        -->
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
                ></button>
              </div>

              <div class="modal-body">
                <RegisterForm user_type="employee" />
                <!-- 
                        <div id = "app">
                            <form>
                                <div class="for-name">
                                    <label for="usr_name">İsim: </label> 
                                    <input v-model= "userName"  id = "usr_name" placeholder="Yeni İsim" >             
                                </div>
                                <div class= "for-newPwd">
                                    <p></p>
                                    <label for="usr_newpwd">Yeni Şifre:</label>
                                    <input id="usr_new_pwd"  placeholder="Yeni Şifre" />
                                </div>
                                <br>
                                <div class = "for-rePwd">
                                    <label for="usr_pwd_check">Tekrar Yeni Şifre:</label>
                                    <input id="usr_new_pwd_2" placeholder="Tekrar Yeni Şifre" />
                                </div>

                                <br>
                                <div class = "for-email">
                                    <label for="usr_email">Email:</label>
                                    <input v-model= "email"  id="usr_email" placeholder="Yeni Email">
                                </div>
                                <br>
                                <div class = "for-adress">
                                    <label for="usr_adress">Adres:</label>
                                    <input v-model= "adress" id="usr_adress" placeholder="Yeni Adres">
                                </div>
                                <br>
                                <div class = "for-phone">
                                    <label for="usr_phone">Tel. Numarası:</label>
                                    <input v-model= "telNo" id="usr_phone" placeholder="Yeni Numara +90 " maxlength="10">
                                </div>
                                <br>
                                
                            </form>   
                        </div>
                         -->
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
import PopUp from "../components/PopUp.vue";
import RegisterForm from "../components/RegisterForm.vue";
import db from "../firebase";

export default {
  name: "EmployeeSettings",
  components: { PopUp, RegisterForm },
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

    const willEdit = (e) => {
      (this.willEditEmployee = e),
        (this.userName = e.name),
        (this.telNo = e.tel_no),
        (this.email = e.e_mail),
        (this.adress = e.adress),
        (this.password = e.password);
    };

    const removeRow = (e) => {
      db.collection("employees")
        .where("mail", "==", e.mail)
        .get()
        .then((snap) => {
          snap.forEach((doc) => {
            db.collection("employees")
              .doc(doc.id)
              .delete()
              .catch((err) => console.log(err.message));
          });
        });
      employees.value = [];
      db.collection("employees")
        .get()
        .then((snap) => {
          snap.forEach((doc) => {
            employees.value.push(doc.data());
          });
          employees.value.sort(new Intl.Collator("de").compare);
        });
      //window.location.reload();
      //e.isExist = false;
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
      removeRow,
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
