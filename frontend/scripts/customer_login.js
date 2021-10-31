/*const phone_button = document.getElementById("btn-1");
const phone_input = document.getElementById("phone");
const pwd_button = document.getElementById("btn-2");
const pwd_input = document.getElementById("password");*/
const phone_button = document.getElementsByClassName("user-definer-button")[0];
const phone_input = document.getElementsByClassName("user-definer-input")[0];
const pwd_button = document.getElementsByClassName("user-password-button")[0];
const pwd_input = document.getElementsByClassName("user-password-input")[0];
const signinError = document.getElementsByClassName("signin-error")[0];

const isNumericInput = (event) => {
    const key = event.keyCode;
    return ((key >= 48 && key <= 57) || // Allow number line
        (key >= 96 && key <= 105) // Allow number pad
    );
};

const isModifierKey = (event) => {
    const key = event.keyCode;
    return (event.shiftKey === true || key === 35 || key === 36) || // Allow Shift, Home, End
        (key === 8 || key === 9 || key === 13 || key === 46) || // Allow Backspace, Tab, Enter, Delete
        (key > 36 && key < 41) || // Allow left, up, right, down
        (
            // Allow Ctrl/Command + A,C,V,X,Z
            (event.ctrlKey === true || event.metaKey === true) &&
            (key === 65 || key === 67 || key === 86 || key === 88 || key === 90)
        )
};

const enforceFormat = (event) => {
    // Input must be of a valid number format or a modifier key, and not longer than ten digits
    if(!isNumericInput(event) && !isModifierKey(event)){
        event.preventDefault();
    }
};

const formatToPhone = (event) => {
    if(isModifierKey(event)) {
        if(event.keyCode == 8){
            disableButton(phone_button, true);
        }
        return;
    }

    const input = event.target.value.replace(/\D/g,'').substring(0,10); // First ten digits of input only
    const areaCode = input.substring(0,3);
    const middle = input.substring(3,6);
    const last = input.substring(6,10);

    (input.length == 10) ? disableButton(phone_button, false) : disableButton(phone_button, true);

    if(input.length > 6){event.target.value = `(${areaCode}) ${middle} ${last}`;}
    else if(input.length > 3){event.target.value = `(${areaCode}) ${middle}`;}
    else if(input.length > 0){event.target.value = `(${areaCode}`;}
};

phone_input.addEventListener('keydown',enforceFormat);
phone_input.addEventListener('keyup',formatToPhone);

phone_input.addEventListener("input", (e) => {
    if(phone_button.style.visibility == "hidden"){
        fade(phone_button, 1);
        fade(pwd_input, 0);
        fade(pwd_button, 0);
        pwd_input.value = "";
        disableButton(pwd_button, true);
        if(signinError.style.visibility = "visible") fade(signinError, 0);
    }
});

pwd_input.addEventListener("keyup", (e) => {
    (e.currentTarget.value === "") ? disableButton(pwd_button, true) : disableButton(pwd_button, false);
});

pwd_input.addEventListener("input", (e) => {
    if(pwd_button.style.visibility == "hidden"){
        fade(pwd_button, 1);
        fade(signinError, 0);
    }
});

function showPasswordField() {
    fade(phone_button, 0);
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