function editNav() {
  const topNav = document.getElementById("myTopnav");
  if (topNav.className === "topnav") {
    topNav.className += " responsive";
  } else {
    topNav.className = "topnav";
  }
}

// DOM Elements
const   modalbg = document.querySelector(".bground"),
        modalBtn = document.querySelectorAll(".modal-btn"),
        formData = document.querySelectorAll(".formData"),
        closeBtn = document.querySelector(".close");

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
const submitButtonForm = document.getElementById('submitButtonForm');


// Fonction : afficher une erreur.
const setError = (element, message) => {
    // On sélectionne la div ayant la class .erreur liée à l'élément que l'on teste grâce à son élément parent
    const inputContainer = element.parentElement;
    const errorDisplay = inputContainer.querySelector('.error');

    //On indique le message à afficher dans cette erreur, et on change la bordure grâce aux classes CSS (passe en rouge ici)
    errorDisplay.innerText = message;
    inputContainer.classList.add('error');
    inputContainer.classList.remove('success');
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

// Fonction : validation des différents champs qui se déroule lorsque le formulaire est en train d'être rempli.
// Elle rassemble chacune des fonctions de validation détaillées plus bas
const validateInputs = () => {
    let firstnameIsValid = validateFirstname();
    let lastnameIsValid = validateLastname();
    let emailIsValid = validateEmail();
    let birthdateIsValid = validateBirthdate();
    let quantityTournamentsIsValid = validateQuantityTournaments();
    let cityIsValid = validateCity();
    let termsOfUseIsValid = validateTermsOfUse();

    // Si au moins un des champs n'est pas valide, le bouton submit n'apparaît pas
    if(firstnameIsValid === false || lastnameIsValid === false || emailIsValid === false || birthdateIsValid === false || quantityTournamentsIsValid === false || cityIsValid === false || termsOfUseIsValid === false){
        submitButtonForm.style.display = "none";
    }
    // Si tous les champs sont valides, le bouton apparaît.
    else {
        submitButtonForm.style.display = "block";
    }
}

// Fonction : validation et envoi du formulaire lorsque l'on clique sur le bouton submit
const validateForm = () => {
    let firstnameIsValid = validateFirstname();
    let lastnameIsValid = validateLastname();
    let emailIsValid = validateEmail();
    let birthdateIsValid = validateBirthdate();
    let quantityTournamentsIsValid = validateQuantityTournaments();
    let cityIsValid = validateCity();
    let termsOfUseIsValid = validateTermsOfUse();

    // Si l'un des éléments n'est pas valide : l'utilisateur reçoit un message d'erreur. Ne devrait pas arriver puisque le bouton n'apparaît que si les champs sont valides, juste au cas où.
    if(firstnameIsValid === false || lastnameIsValid === false || emailIsValid === false || birthdateIsValid === false || quantityTournamentsIsValid === false || cityIsValid === false || termsOfUseIsValid === false){
        alert("Veuillez remplir les champs du formulaire correctement.");
    }
    // Si tous le formulaire est valide, un message de succès s'affiche dans la modale, avec un bouton qui peut permettre de la faire disparaître.
    else {
        document.querySelector('.modal-body').innerHTML = "<div class='modal-thanks'><p>Merci pour votre inscription !</p><br><br><br><button class='modal-btn btn-signup' id='close-after-form'> Fermer </button></div>";
        const closeAfterFormBtn = document.getElementById("close-after-form");
        closeAfterFormBtn.addEventListener("click", closeModal);

    }
}

//Fonction de vérification du format du nom et prénom via une regex
const isValidName = name => {
  const re = /^[A-zÀ-ú\-"' ]+$/;
  return re.test(String(name));
}

// Fonction : validation du prénom
const validateFirstname = () => {
    // On récupère la valeur du champ "firstname". trim() permet d'effacer les espaces avant ou après la chaîne de caractère, sans la modifier.
    const firstnameValue = firstname.value.trim();

    //Si le prénom n'est pas saisi :
    if(firstnameValue === "") {
        setError(firstname, "Veuillez entrer votre prénom");
        return false;
    }
    //Si le prénom contient moins de deux caractères
    else if(firstnameValue.length <= 2){
        setError(firstname, "Votre prénom doit comporter plus de deux caractères");
        return false;
    } 
    //Si le prénom contient d'autres caractères que des lettres
    else if(!isValidName(firstnameValue)) {
      setError(firstname, "Votre prénom ne peut contenir que des lettres.");
      return false;
    }
    // Les conditions sont remplies
    else {
        setSuccess(firstname);
        return true;
    }
}

//Identique à la fonction précédente, mais les messages d'erreur sont légèrement différents
const validateLastname = () => {
    const lastnameValue = lastname.value.trim();

    if(lastnameValue === "") {
        setError(lastname, "Veuillez entrer votre nom");
        return false;
    }else if(lastnameValue.length <= 2){
        setError(lastname, "Votre nom doit comporter plus de deux caractères");
        return false;
    } else if(!isValidName(lastnameValue)) {
        setError(lastname, "Votre nom ne peut contenir que des lettres.");
        return false;
    } else {
        setSuccess(lastname);
        return true;
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
        return false;
    } else if(!isValidEmail(emailValue)){
        setError(email, "Votre email doit être au format : bonjour@contact.com");
        return false;
    } else {
        setSuccess(email);
        return true;
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
        return false;
    } else if(currentAge < 0) {
        setError (birthdate, "Vous n'êtes même pas encore né !");
        return false;
    } else if(currentAge < 18) {
        setError(birthdate, "Vous devez avoir au moins 18 ans pour vous inscrire.");
        return false;
    } else if(currentAge > 150) {
        setError(birthdate, "Vous êtes un peu trop âgé pour nos tournois...");
        return false;
    } else {
        setSuccess(birthdate);
        return true;
    }
}

// Fonction de validation de la quantité de tournois effectués
const validateQuantityTournaments = () => {
    const quantityTournamentsValue = quantityTournaments.value;
    if(quantityTournamentsValue === ""){
        setError(quantityTournaments, "Veuillez entrer le nombre de tournois auxquels vous avez participé.");
        return false;
    } else if(quantityTournamentsValue < 0) {
        setError(quantityTournaments, "Vous ne pouvez pas avoir participé à un nombre négatif de tournois !");
        return false;
    } else if(quantityTournamentsValue > 99) {
        setError(quantityTournaments, "Vous n'avez pas pu participer à autant de tournois !");
        return false;
    } else {
        setSuccess(quantityTournaments);
        return true;
    }
}

// Fonction de validation du tournois choisi.
// Récupération du tableau des boutons radios
const city = document.querySelectorAll('input[type="radio"]');
const validateCity = () => {
    let j = 0;
    //Création d'une boucle qui passe en revue les éléments du tableau
    for(let i = 0; i < city.length; i++){
        // Si l'un des boutons radio est coché, la variable j est augmentée de 1
        if(city[i].checked === true){
            j++;
        }
    }
    // Si j est supérieure à 0, cela signifie qu'un bouton radio est coché : retrait du message d'erreur
    if(j > 0){
        document.querySelector(".cityError").style.display = "none";
        return true;
    }
    //Sinon, cela signifie qu'aucun des boutons radio n'est coché, le message d'erreur reste affiché.
    else {
        document.querySelector(".cityError").style.display = "block";
        return false;
    }
}


// Fonction : validation de l'acceptation des conditions d'utilisation
const termsOfUse = document.getElementById("checkbox1");
const validateTermsOfUse = () => {
    // Si la checkbox est cochée : le message d'erreur disparaît
    if(termsOfUse.checked === true){
        document.querySelector(".termsOfUseError").style.display = "none";
        return true;
    }
    // Si la checkbox n'est pas cochée : le message d'erreur reste affiché
    else {
        document.querySelector(".termsOfUseError").style.display = "block";
        return false;
    }
}