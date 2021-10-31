const app = Vue.createApp({
    //data,functions
    //template :'<h2>I am template</h2>'

    data() {
        return {
            title: 'the final empire',
            author: "DADdy",
            age: "22",
            showBox : true,
            employees: [
                {name: "Fatih ",tel_no: "5675768",e_mail: "dsfhgsdf@dsgh",adress: "İstanbul dfhfghdfgjdfghf fdhjghkfgjkfhgjk fdhgjdghfkghj",password: "zzz56dfhfdgh75768" },
                {name: "Rian",tel_no: "59999999",e_mail: "asdfasd@fsdgd",adress: "Rusya",password: "aaa567fghdjd5768" },
                {name: "Tuğkan ",tel_no: "00005675768",e_mail: "yyhgsdf@dsgh",adress: "Almanya",password: "kkkk67589h75768" },
                {name: "Burak",tel_no: "77759999999",e_mail: "bbbfasd@fsdgd",adress: "van",password: "llll567fghdjd5768" }
                
            ]
        }
    },

    methods: {
        changeTitle(){
            this.title = "ZAAAAAAAAAAAAAA"
        }
    }    
})

app.mount('#app')