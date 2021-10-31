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
                {name: "Fatih ",tel_no: "5675768",e_mail: "dsfhgsdf@dsgh",adress: "İstanbul dfhfghdfgjdfghf fdhjghkfgjkfhgjk fdhgjdghfkghj",password: "zzz56dfhfdgh75768", isExist: true },
                {name: "Rian",tel_no: "59999999",e_mail: "asdfasd@fsdgd",adress: "Rusya",password: "aaa567fghdjd5768", isExist: true },
                {name: "Tuğkan ",tel_no: "00005675768",e_mail: "yyhgsdf@dsgh",adress: "Almanya",password: "kkkk67589h75768", isExist: true },
                {name: "Burak",tel_no: "77759999999",e_mail: "bbbfasd@fsdgd",adress: "van",password: "llll567fghdjd5768", isExist: true }
                
            ]
        }
    },

    methods: {
        changeTitle(){
            this.title = "ZAAAAAAAAAAAAAA"
        },
        
        removeRow(e) {
            e.isExist = false;
        }
    }    
    
})




/*    POPUP    BASI   */

const togglePassword = document.getElementById("togglePassword");
const password = document.getElementById("usr_curr_pwd");
const togglePassword2 = document.getElementById("togglePassword2");
const password2 = document.getElementById("usr_newpwd");
const togglePassword3 = document.getElementById("togglePassword3");
const password3 = document.getElementById("usr_pwd_check");

togglePassword.addEventListener('click', function () {
    // toggle the type attribute
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
    // toggle the eye / eye slash icon
    const eye = togglePassword.getAttribute('class') === 'bi bi-eye-slash' ? 'bi-eye' : 'bi bi-eye-slash'; 
    togglePassword.setAttribute('class' , eye);
});
togglePassword2.addEventListener('click', function () {
    // toggle the type attribute
    const type = password2.getAttribute('type') === 'password' ? 'text' : 'password';
    password2.setAttribute('type', type);
    // toggle the eye / eye slash icon
    const eye = togglePassword2.getAttribute('class') === 'bi bi-eye-slash' ? 'bi-eye' : 'bi bi-eye-slash'; 
    togglePassword2.setAttribute('class' , eye);
});
togglePassword3.addEventListener('click', function () {
    // toggle the type attribute
    const type = password3.getAttribute('type') === 'password' ? 'text' : 'password';
    password3.setAttribute('type', type);
    // toggle the eye / eye slash icon
    const eye = togglePassword3.getAttribute('class') === 'bi bi-eye-slash' ? 'bi-eye' : 'bi bi-eye-slash'; 
    togglePassword3.setAttribute('class' , eye);
});

/*    POPUP    SONU   */









app.mount('#app')