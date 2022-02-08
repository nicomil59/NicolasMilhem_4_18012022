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
    
    let totalQuantity = parseInt(document.getElementById('totalQuantity').textContent);
    // console.log('totalQuantity',totalQuantity);   

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

// valide le données entrées dans le formulaire

const validateContact = contact => {

    if(testReg(contact.firstName, regName)) {
        console.log('Prénom ok');
        document.getElementById('firstNameErrorMsg').textContent = "";
    } else {
        console.log('***veuillez corriger le prénom !');
        document.getElementById('firstNameErrorMsg').textContent = "Veuillez renseigner un prénom au bon format";
    }

    if(testReg(contact.lastName, regName)) {
        console.log('Nom ok');
        document.getElementById('lastNameErrorMsg').textContent = "";
    } else {
        console.log('***veuillez corriger le nom !');
        document.getElementById('lastNameErrorMsg').textContent = "Veuillez renseigner un nom au bon format";
    }

    if(testReg(contact.address, regAddress)) {
        console.log('Adresse ok');
        document.getElementById('addressErrorMsg').textContent = "";
    } else {
        console.log("***Veuillez corriger l'adresse");
        document.getElementById('addressErrorMsg').textContent = "Veuillez renseigner une adresse au bon format";
    }

    if(testReg(contact.city, regName)) {
        console.log('Ville ok');
        document.getElementById('cityErrorMsg').textContent = "";
    } else {
        console.log('***veuillez corriger la ville !');
        document.getElementById('cityErrorMsg').textContent = "Veuillez renseigner une ville au bon format";
    }

    if(testReg(contact.email, regEmail)) {
        console.log('Email ok');
        document.getElementById('emailErrorMsg').textContent = "";
    } else {
        console.log("***Veuillez corriger l'Email");
        document.getElementById('emailErrorMsg').textContent = "Veuillez entrer une adresse email au bon format";
    }

    return testReg(contact.firstName, regName) && testReg(contact.lastName, regName) && testReg(contact.address, regAddress) && testReg(contact.city, regName) && testReg(contact.email, regEmail);


}

// teste une valeur entrée dans le formulaire au moyen d'une expression régulière

const testReg = (value, reg) => {
    return reg.test(value);
}

const regName = /^[a-z\éèàêâîiïù\-' ]{1,30}$/i;

const regEmail = /^([a-z\d\._-]+)@([a-z\d_-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/i;

const regAddress = /^[a-z\éèàêâîiïù\d\-' ]{5,50}$/i;
