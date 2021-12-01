const app = Vue.createApp({

    data(){
        return{
            type : 'password',
            eye : 'bi bi-eye-slash',
        }
    },

    methods: {
        toggleEyeSlash(){
            this.type = this.type === 'password' ? 'text' : 'password'
            this.eye = this.eye === 'bi bi-eye-slash' ? 'bi-eye' : 'bi bi-eye-slash'
        },
        save(){
            
        },
    }
});
app.mount('#app');