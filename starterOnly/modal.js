function editNav() {
  const topNav = document.getElementById("myTopnav");
  if (topNav.className === "topnav") {
    topNav.className += " responsive";
  } else {
    topNav.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeBtn = document.querySelector(".close");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// ### Issue 1 : fermeture de la modale ###
closeBtn.addEventListener("click", closeModal);

function closeModal() {
  modalbg.style.display = "none";
}

// ### Issue 2 : validité du formulaire ###
const form = document.getElementById('reserve');
const firstname = document.getElementById('firstname');
const lastname = document.getElementById('lastname');
const email = document.getElementById('email');
const birthdate = document.getElementById('birthdate');
const quantityTournaments = document.getElementById('quantityTournaments');

console.log("coucou");

// form.addEventListener('change', e => {
//     e.preventDefault();

//     validateInputs();
// });

// Fonction : afficher une erreur.
const setError = (element, message) => {
    // On sélectionne la div ayant la class .erreur liée à l'élément que l'on teste grâce à son élément parent
    const inputContainer = element.parentElement;
    const errorDisplay = inputContainer.querySelector('.error');

    //On indique le message à afficher dans cette erreur, et on change la bordure grâce aux classes CSS (passe en rouge ici)
    errorDisplay.innerText = message;
    inputContainer.classList.add('error');
    inputContainer.classList.remove('sucess');
}

// Fonction : signaler un succès.
const setSuccess = (element) => {
    // On sélectionne la div ayant la class .erreur liée à l'élément que l'on teste grâce à son élément parent
    const inputContainer = element.parentElement;
    const errorDisplay = inputContainer.querySelector('.error');

    //On efface le message d'erreur qui pourraît être affiché, et on change la bordure grâce aux classes CSS (passe en vert ici)
    errorDisplay.innerText = "";
    inputContainer.classList.add('success');
    inputContainer.classList.remove('error');
}

// Fonction : validation des différents champs.
// Elle rassemble chacune des fonctions de validation détaillées plus bas
const validateInputs = () => {
    validateFirstname();
    validateLastname();
    validateEmail();
    validateBirthdate();
    validateQuantityTournaments();
    validateCity();
    validateTermsOfUse();
}

//Fonction de vérification du format du nom et prénom via une regex
const isValidName = name => {
  const re = /^[a-zA-Z\u00e0-\u00ff]+(([- ])?[a-z\u00e0-\u00ff])+$/;
  return re.test(String(name));
}

// Fonction : validation du prénom
const validateFirstname = () => {
    // On récupère la valeur du champ "firstname". trim() permet d'effacer les espaces avant ou après la chaîne de caractère, sans la modifier.
    const firstnameValue = firstname.value.trim();

    //Si le prénom n'est pas saisi :
    if(firstnameValue === "") {
        setError(firstname, "Veuillez entrer votre prénom");
    }
    //Si le prénom contient moins de deux caractères
    else if(firstnameValue.length <= 2){
        setError(firstname, "Votre prénom doit comporter plus de deux caractères");
    } 
    //Si le prénom contient d'autres caractères que des lettres
    else if(!isValidName(firstnameValue)) {
      setError(firstname, "Votre prénom ne peut contenir que des lettres.");
    }
    // Les conditions sont remplies
    else {
        setSuccess(firstname);
    }
}

//Identique à la fonction précédente, mais les messages d'erreur sont légèrement différents
const validateLastname = () => {
    const lastnameValue = lastname.value.trim();

    if(lastnameValue === "") {
        setError(lastname, "Veuillez entrer votre nom");
    }else if(lastnameValue.length <= 2){
        setError(lastname, "Votre nom doit comporter plus de deux caractères");
    } else {
        setSuccess(lastname);
    }
}


// Fonction de vérification du format de l'email grâce à l'utilisation d'une regex (expression régulière)
const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Fonction de vérification de l'email. Vérifie si l'email est indiqué, et si le format est bon
const validateEmail = () => {
    const emailValue = email.value.trim();
    if(emailValue === ""){
        setError(email, "Veuillez entrer votre adresse email");
    } else if(!isValidEmail(emailValue)){
        setError(email, "Votre email doit être au format : bonjour@contact.com");
    } else {
        setSuccess(email);
    }
}

// Fonction de vérification de la date de naissance
const validateBirthdate = () => {
    // Récupération de la valeur de l'input birthdate
    const birthdateValue = new Date(birthdate.value);
    // Création de la date du jour
    const currentDate = new Date().toJSON().slice(0,10)+' 01:00:00';
    //Comparaison des deux dates pour définir un âge
    const currentAge = ~~((Date.now(currentDate) - birthdateValue) / (31557600000));

    if(birthdateValue === ""){
        setError(birthdate, "Veuillez entrer votre date de naissance.");
    } else if(currentAge < 18) {
        setError(birthdate, "Vous devez avoir au moins 18 ans pour vous inscrire.");
    } else {
        setSuccess(birthdate);
    }
}

// Fonction de validation de la quantité de tournois effectués
const validateQuantityTournaments = () => {
    const quantityTournamentsValue = quantityTournaments.value;
    if(quantityTournamentsValue === ""){
        setError(quantityTournaments, "Veuillez entrer le nombre de tournois auxquels vous avez participé.");
    } else if(quantityTournamentsValue < 0) {
        setError(quantityTournaments, "Vous ne pouvez pas avoir participé à un nombre négatif de tournois !")
    } else if(quantityTournamentsValue > 99) {
        setError(quantityTournaments, "Vous n'avez pas pu participer à autant de tournois !");
    } else {
        setSuccess(quantityTournaments);
    }
}

// Fonction de validation du tournois choisi.
// Récupération du tableau des boutons radios
const city = document.querySelectorAll('input[type="radio"]');
const validateCity = () => {
    //Création d'une boucle qui passe en revue les éléments du tableau
    for(let i = 0; i < city.length; i++){
        // Si l'un des boutons radio est coché, le message d'erreur disparaît et la boucle s'arrête grâce au break.
        if(city[i].checked === true){
            document.querySelector(".cityError").style.display = "none";
            break;
        }
        //Si aucun des boutons radio n'est coché, le message d'erreur reste affiché.
        else {
            document.querySelector(".cityError").style.display = "block";
        }
    }
}

// Fonction : validation de l'acceptation des conditions d'utilisation
const termsOfUse = document.getElementById("checkbox1");
const validateTermsOfUse = () => {
    // Si la checkbox est cochée : le message d'erreur disparaît
    if(termsOfUse.checked === true){
        document.querySelector(".termsOfUseError").style.display = "none";
    }
    // Si la checkbox n'est pas cochée : le message d'erreur reste affiché
    else {
        document.querySelector(".termsOfUseError").style.display = "block";
    }
}