<template>
    <body>
        <div id="nav-placeholder"></div>
        <div id = "app">


            <ul>
                <li v-for="value in carpets" :key='value.id'>
                    {{ value.id }}

                </li>
            </ul>

            <div id="order_list">
                <div class="row g-0">
                    <div class="col-sm-4">
                    </div>
                    <div class="col-sm-8">
                    <div class="card-body">
                        <h5 class="card-title"> {{  }} </h5>
                        <p class="card-text">
                        bbbbbbbbbb
                        </p>
                        <p class="card-text">
                        <small class="text-muted">xx</small>
                        </p>
                    </div>
                    </div>
                </div>
            </div>

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

      carpets: [
        { text: 'Learn JavaScript' },
        { text: 'Learn Vue' },
        { text: 'Build something awesome' }
        ]

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
            var order_l = document.getElementById("order_list");
            var card_body = document.createElement("div");
            var card = document.createElement("div");
            var card_title = document.createElement("h5");

            card.setAttribute("class" , "card");
            card_body.setAttribute("class" , "card-body");
            card_title.setAttribute("class" , "card-title");
            card_title.innerText = "qq";

            card.appendChild(card_title);  
            card.appendChild(document.createTextNode(str));
            order_l.appendChild(card);          
        }
  }
}
</script>

<style scoped>

    .order_list{
        align-items: center;
    }
</style>
