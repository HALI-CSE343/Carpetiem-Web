<template>
    <body>
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Eleman bilgilerini düzenle</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                            <div class="modal-body">
                                <div id = "app">
                                    <form>
                                        <div class="for-name">
                                            <label for="usr_name">İsim: </label> 
                                            <input id = "usr_name" placeholder="Yeni İsim" type="text">             
                                        </div>
                                        <br>
                                        <div class="for-pwd">
                                            <label for="usr_curr_pwd">Mevcut Şifre:</label>
                                            <input id="usr_curr_pwd" :type="type" placeholder="Mevcut Şifre" />
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
                                            <input type="text" id="usr_email" placeholder="Yeni Email">
                                        </div>
                                        <br>
                                        <div class = "for-adress">
                                            <label for="usr_adress">Adres:</label>
                                            <input type="text" id="usr_adress" placeholder="Yeni Adres">
                                        </div>
                                        <br>
                                        <div class = "for-phone">
                                            <label for="usr_phone">Tel. Numarası:</label>
                                            <input type="text" id="usr_phone" placeholder="Yeni Numara +90 " maxlength="10">
                                        </div>
                                        <br>
                                        <button @click="save" type="button" style="height: 25px; width: 50px; background-color: #24252A; color: white;">Save</button>
                                    </form>   
                                </div>
                            </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Kaydet</button>
                    </div>
                </div>
            </div>
        </div>
        
        

        
    </body>
</template>

<script>
    export default {
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
    }    
</script>
