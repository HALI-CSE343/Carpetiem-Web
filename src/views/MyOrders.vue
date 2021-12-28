<template>
    <body>
        <div id="nav-placeholder"></div>
        <div id = "app">

            <ul id="order_list" class="list-group">
            </ul>

        </div>

    </body>
    
</template>

<script>
import { ref } from "@vue/reactivity";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import db from "../firebase";

export default {
  name: "App",

  setup(){
      db.collection("carpets").where("customer_id", "==", firebase.auth().currentUser.uid)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                append_list("Halının Alanı: " + doc.data().area + " Tipi : " +doc.data().type
                            + " Durumu " + doc.data().status) ;
            });
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });

        function append_list(str) {
            var ul = document.getElementById("order_list");
            var li = document.createElement("li");
            
            li.appendChild(document.createTextNode(str));
            li.setAttribute("class", "list-group-item");
            ul.appendChild(li);
        }
  }
}
</script>

<style scoped>


    .order_list{
        text-align: center;
    }
</style>
