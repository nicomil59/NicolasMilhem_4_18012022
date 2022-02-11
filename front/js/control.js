// vérifie si la quantité du produit est correcte

const isQuantityValid = quantity => {

    return quantity < 1 || quantity > 100 ? false : true;

}

// vérifie si une couleur du produit a été sélectionnée

const isColorValid = color => {

    return color === "" ? false : true;
    
}

// vérifie si la commande est conforme (pas de panier vide ou de quantité non conforme)

const isCartValid = () => {

    let result = true;
    
    const totalQuantity = parseInt(document.getElementById('totalQuantity').textContent);

    if(totalQuantity === 0) {
        alert('Votre panier est vide !');
        result = false;
    }

    if(!isCartQuantityValid) {
        alert('Un ou des articles ne possèdent pas la bonne quantité !');
        result = false;
    }

    return result;

}

// teste les données entrées dans le formulaire

const validateContact = contact => {

    let result = true;
    
    // document.getElementById('firstNameErrorMsg').textContent = isInputValid(contact.firstName, regName) ? "" : "Veuillez renseigner un prénom au bon format";

    // document.getElementById('lastNameErrorMsg').textContent = isInputValid(contact.lastName, regName) ? "" : "Veuillez renseigner un nom de famille au bon format";

    // document.getElementById('addressErrorMsg').textContent = isInputValid(contact.address, regAddress) ? "" : "Veuillez renseigner une adresse au bon format";

    // document.getElementById('cityErrorMsg').textContent = isInputValid(contact.city, regName) ? "" : "Veuillez renseigner une ville au bon format";

    // document.getElementById('emailErrorMsg').textContent = isInputValid(contact.email, regEmail) ? "" : "Veuillez renseigner une adresse email au bon format";

    // return isInputValid(contact.firstName, regName) && isInputValid(contact.lastName, regName) && isInputValid(contact.address, regAddress) && isInputValid(contact.city, regName) && isInputValid(contact.email, regEmail); 

    
    const firstNameErrorMsg = document.getElementById('firstNameErrorMsg');
    if(isInputValid(contact.firstName, regName)) {
        firstNameErrorMsg.textContent = "";
    } else {
        firstNameErrorMsg.textContent = "Veuillez renseigner un prénom au bon format";
        result = false;
    }

    const lastNameErrorMsg = document.getElementById('lastNameErrorMsg');
    if(isInputValid(contact.lastName, regName)) {
        lastNameErrorMsg.textContent = "";
    } else {
        lastNameErrorMsg.textContent = "Veuillez renseigner un nom au bon format";
        result = false;
    }
    
    const addressErrorMsg = document.getElementById('addressErrorMsg');
    if(isInputValid(contact.address, regAddress)) {
        addressErrorMsg.textContent = "";
    } else {
        addressErrorMsg.textContent = "Veuillez renseigner une adresse au bon format";
        result = false;
    }

    const cityErrorMsg = document.getElementById('cityErrorMsg');
    if(isInputValid(contact.city, regName)) {
        cityErrorMsg.textContent = "";
    } else {
        cityErrorMsg.textContent = "Veuillez renseigner une ville au bon format";
        result = false;
    }

    const emailErrorMsg = document.getElementById('emailErrorMsg');
    if(isInputValid(contact.email, regEmail)) {
        emailErrorMsg.textContent = "";
    } else {
        emailErrorMsg.textContent = "Veuillez entrer une adresse email au bon format";
        result = false;
    }

    return result;

}

// teste une valeur entrée dans le formulaire au moyen d'une expression régulière

const isInputValid = (value, reg) => {
    return reg.test(value);
}

// expressions régulières pour tester les champs du forumulaire

const regName = /^[a-z\éèàêâîiïù\-' ]{1,30}$/i;

const regEmail = /^([a-z\d\._-]+)@([a-z\d_-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/i;

const regAddress = /^[a-z\éèàêâîiïù\d\-' ]{5,50}$/i;
