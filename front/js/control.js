// Vérifie si la quantité du produit est correcte

const isQuantityValid = quantity => {

    return quantity < 1 || quantity > 100 ? false : true;

}

// Vérifie si une couleur du produit a été sélectionnée

const isColorValid = color => {

    return color === "" ? false : true;
    
}

// Vérifie si la commande est conforme (pas de panier vide)

const isCartValid = () => {

    let result = true;
    
    const totalQuantity = parseInt(document.getElementById('totalQuantity').textContent);

    if(totalQuantity === 0) {
        alert('Votre panier est vide !');
        result = false;
    }

    return result;

}

// ************ validation du formulaire de commande ************

// Vérifie si le prénom, le nom ou la ville est valide

const isNameValid = inputName => {

    if (/^[a-z\éèàêâîiïù\-' ]{1,30}$/i.test(inputName.value)) {
        inputName.nextElementSibling.innerText = "";
        return true;
    } else {

        if (inputName.name === "firstName") {
            inputName.nextElementSibling.innerText = "veuillez entrer un prénom au bon format";
        } else if (inputName.name === "lastName") {
            inputName.nextElementSibling.innerText = "veuillez entrer un nom au bon format";
        } else if (inputName.name === "city") {
            inputName.nextElementSibling.innerText = "veuillez entrer une ville au bon format";
        }
        return false;
    }
}

// Vérifie si l'adresse est valide

const isAddressValid = inputAddress => {

    if (/^[a-z\éèàêâîiïù\d\-' ]{5,50}$/i.test(inputAddress.value)) {
        inputAddress.nextElementSibling.innerText = "";
        return true;
    } else {
        inputAddress.nextElementSibling.innerText = "veuillez entrer une adresse au bon format";
        return false;
    }
}

// Vérifie si l'adresse email est valide

const isEmailValid = inputEmail => {

    if (/^([a-z\d\._-]+)@([a-z\d_-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/i.test(inputEmail.value)) {
        inputEmail.nextElementSibling.innerText = "";
        return true;
    } else {
        inputEmail.nextElementSibling.innerText = "veuillez entrer une adresse au bon format";
        return false;
    }
}
