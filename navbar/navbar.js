const dropDownMenu = document.getElementById("drop-down-menu");
const navbarLinks = document.getElementsByClassName("navbar-links")[0];
const contactButton = document.getElementById("contact");

contactButton.style.visibility = "visible";
contactButton.style.opacity = "1";

dropDownMenu.addEventListener("click", () => {
    if(contactButton.style.visibility == "visible"){
        navbarLinks.classList.remove("fade-out");
        navbarLinks.classList.add("fade-in");
        contactButton.style.opacity = "0";
        contactButton.style.visibility = "hidden";
    }
    else {
        navbarLinks.classList.remove("fade-in");
        navbarLinks.classList.add("fade-out");
        contactButton.style.visibility = "visible";
        contactButton.style.opacity = "1";
    }
});