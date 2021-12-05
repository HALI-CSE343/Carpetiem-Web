<template>
    <body>
        <div id="nav-placeholder"></div>
        <div id = "app">
            <form>
                <div class="for-name">
                    <label for="usr_name">İsim: </label> 
                    <input v-model= "userName"  id = "usr_name" placeholder="Yeni İsim" >             
                </div>
                <br>
                <div class="for-pwd">
                    <label for="usr_curr_pwd">Mevcut Şifre:</label>
                    <input v-model= "password" :type="type" id="usr_curr_pwd"  placeholder="Mevcut Şifre" />
                </div>
                <br>
                <div class= "for-newPwd">
                    <label for="usr_newpwd">Yeni Şifre:</label>
                     <input id="usr_new_pwd" :type="type" placeholder="Yeni Şifre" />
                </div>
                <br>
                <div class = "for-rePwd">
                    <label for="usr_pwd_check">Tekrar Yeni Şifre:</label>
                    <input id="usr_new_pwd_2" :type="type" placeholder="Tekrar Yeni Şifre" />
                    <button @click="toggleEyeSlash" type="button" :class="eye"  id="togglePassword"></button>
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
                <button @click="save" type="button" class="btn btn-secondary" style="background-color: #24252A">Save</button>

            </form>      
        </div>
    </body>
</template>

<script>
import { ref } from "@vue/reactivity";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import db from "../firebase";

/*db.collection("customers").where("name", "==", "burak" )
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data().email);
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });*/

export default {
  name: "App",

    setup(){
        const userName = ref("");
        const telNo = ref("");
        const email = ref("");
        const adress = ref("");
        const password = ref("");
        const type = ref("password");
        const eye = ref("bi bi-eye-slash");

        db.collection("customers")
        .doc(firebase.auth().currentUser.uid)
        .get()
        .then( (doc) => {
            if(doc.exists){
                userName.value = doc.data().name;
                telNo.value = doc.data().phone;
                email.value = doc.data().email;
                adress.value = doc.data().address;
                userName.value = doc.data().name;
            }
            });

        return{
            userName,
            telNo,
            email,
            adress,
            password,
            type,
            eye,
        };
    },

    methods: {
        toggleEyeSlash(){
            this.type = this.type === 'password' ? 'text' : 'password'
            this.eye = this.eye === 'bi bi-eye-slash' ? 'bi-eye' : 'bi bi-eye-slash'
        },
        save(){
            
        },
    }
}

</script>

<style scoped>
    form{
        background-color: grey;
        padding: 9.5% ;
        display: flex;
        flex-direction: column;
        align-items: center; 
    }
    label{
        width: 100px;
        display: inline-block;
        text-align: center;
        vertical-align: middle;
    }
    .for-rePwd button{
        height:25px; 
        width:25px;
        background-color:transparent;
        border-style: solid;
        border: none;
        margin-left: -25px;
    }

</style>