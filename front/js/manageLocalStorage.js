// récupère liste des produits depuis LocalStorage
const getProductsFromLocalStorage = () => {
    
    let result = [];
    
    // s'il y a la clé 'cart', retourne le tableau des produits
    // sinon renvoyer tableau vide

    if(isKeyInLocalStorage('cart')) {
        result = JSON.parse(localStorage.getItem('cart'));
    }
    
    return result;
}

// met à jour ou crée données dans LocalStorage
const setProductsInLocalStorage = data => {
    localStorage.setItem('cart', JSON.stringify(data));
}

// vérifie si clé existe dans LocalStorage
const isKeyInLocalStorage = key => {
    return localStorage.hasOwnProperty(key);
}





