// Récupère liste des produits depuis localStorage

const getProductsFromLocalStorage = () => {
    
    let result = [];
    
    // S'il y a la clé 'cart', retourne le tableau des produits
    // Sinon renvoyer tableau vide

    if(isKeyInLocalStorage('cart')) {
        result = JSON.parse(localStorage.getItem('cart'));
    }
    
    return result;
}

// Met à jour ou crée données dans localStorage

const setProductsInLocalStorage = data => {
    localStorage.setItem('cart', JSON.stringify(data));
}

// Vérifie si clé existe dans LocalStorage

const isKeyInLocalStorage = key => {
    return localStorage.hasOwnProperty(key);
}

// Supprime la liste des produits dans le localStorage

const deleteProductsInLocalStorage = () => {
    localStorage.removeItem('cart');
}




