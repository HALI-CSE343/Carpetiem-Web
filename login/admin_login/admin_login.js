const email_button = document.getElementById("btn-1");
const email_input = document.getElementById("phone");
const pwd_button = document.getElementById("btn-2");
const pwd_input = document.getElementById("password");
const signinError = document.getElementsByClassName("signin-error")[0];

email_input.addEventListener("input", (e) => {
    if(email_button.style.visibility == "hidden"){
        fade(email_button, 1);
        fade(pwd_input, 0);
        fade(pwd_button, 0);
        pwd_input.value = "";
        disableButton(pwd_button, true);
        if(signinError.style.visibility = "visible") fade(signinError, 0);
    }
});

email_input.addEventListener("keyup", (e) => {
    (e.currentTarget.value === "" || isAllSpace(e.currentTarget.value)) ? disableButton(email_button, true) : disableButton(email_button, false);
})

pwd_input.addEventListener("keyup", (e) => {
    (e.currentTarget.value === "") ? disableButton(pwd_button, true) : disableButton(pwd_button, false);
});

pwd_input.addEventListener("input", (e) => {
    if(pwd_button.style.visibility == "hidden"){
        fade(pwd_button, 1);
        fade(signinError, 0);
    }
});

function isAllSpace(line) {
    return !line.replace(/\s/g, '').length;
}

function showPasswordField() {
    fade(email_button, 0);
    fade(pwd_input, 1);
    pwd_input.style.marginTop = "5%";
    fade(pwd_button, 1);
    pwd_button.style.top = "58%";
}

function showSignInError(){
    fade(pwd_button, 0);
    fade(signinError, 1);
}

function disableButton(button, value){
    button.disabled = value;
    button.style.color = (value == true) ? "#aaa" : "rgb(120, 150, 120)";
    button.style.cursor = (value == true) ? "default" : "pointer";
}

function fade(element, value){
    if(value == 0) {
        element.style.opacity = "0";
        element.style.visibility = "hidden";
    }
    else{
        element.style.visibility = "visible";
        element.style.opacity = "1";
    }
}