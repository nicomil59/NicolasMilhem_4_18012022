// vérifie si la quantité du produit est correcte

const isQuantityValid = quantity => {

    return quantity < 1 || quantity > 100 ? false : true;

}

// vérifie si une couleur du produit a été sélectionnée

const isColorValid = color => {

    return color === "" ? false : true;
    
}