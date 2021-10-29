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