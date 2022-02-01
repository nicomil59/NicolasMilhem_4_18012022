// if (!localStorage.getItem('cart')) {
//     localStorage.setItem('cart', JSON.stringify([]));
// } 

// récupère données depuis LocalStorage
const getDataFromLocalStorage = key => {
    return JSON.parse(localStorage.getItem(key));
}

// met à jour ou crée données dans LocalStorage
const updateDataInLocalStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
}

// vérifie si clé existe dans LocalStorage
const isKeyInLocalStorage = key => {
    return localStorage.hasOwnProperty(key);
}





