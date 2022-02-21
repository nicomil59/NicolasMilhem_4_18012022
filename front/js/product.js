// On récupère la chaîne de requête
const search = window.location.search;

// On crée un objet URLSearchParams pour travailler sur la chaîne de requête
const searchParams = new URLSearchParams(search);

// Grâce à la méthode get() de URLSearchParams, on récupère l'id qu'on affecte à productId
let productId = searchParams.get('id');

// Récupère les infos sur le produit à partir de son id et l'affiche

async function getProduct(id) {

    try {
        let product = await loadAPI(`${urlAPI}${id}`);
        showProductDetails(product);

    } catch (err) {
        alert("Il y a un problème avec l'API");
        console.log(err);
    }

}

// Affiche les infos du produit

const showProductDetails = product => {
    const image = document.createElement('img');
    image.setAttribute('src', product.imageUrl);
    image.setAttribute('alt', product.altTxt);
    document.querySelector('.item__img').appendChild(image);

    document.getElementById('title').innerText = product.name;
    document.getElementById('price').innerText = product.price;
    document.getElementById('description').innerText = product.description;

    const colors = document.getElementById('colors');
    product.colors.forEach(color => {
        const option = document.createElement('option');
        option.setAttribute('value', color);
        option.innerText = color;
        colors.appendChild(option);
    });

};

getProduct(productId);

// Gestion clic sur bouton 'ajouter au panier'

document.getElementById('addToCart').addEventListener('click', () => {

    const productToAdd = {
        id: productId,
        color: document.getElementById('colors').value,
        quantity: parseInt(document.getElementById('quantity').value)
    }

    if (isQuantityValid(productToAdd.quantity) && isColorValid(productToAdd.color)) {
        addProductToCart(productToAdd);
        alert("Article(s) bien ajouté(s) au panier");
    } else {
        if(!isQuantityValid(productToAdd.quantity)) {
            alert("Veuillez choisir un nombre d'article(s) entre 1 et 100");
        }
        if(!isColorValid(productToAdd.color)) {
            alert('Veuillez choisir une couleur');
        }
    }
});

// Ajoute produit au panier

const addProductToCart = productToAdd => {
    
    let listOfProducts = getProductsFromLocalStorage();
    updateCart(listOfProducts, productToAdd);
}

// Met à jour la liste des produits du panier avec le produit ajouté

const updateCart = (listOfProducts, productToAdd) => {
    
    // Recherche si le produit avec les mêmes références (id, couleur) est déjà présent dans le panier
    const index = listOfProducts.findIndex(product => productToAdd.id === product.id && productToAdd.color === product.color);
    
    if(index < 0) {
        // Le produit avec les mêmes références n'est pas présent dans le panier, donc on l'ajoute à la liste des produits
        listOfProducts.push(productToAdd);
    } else {
        // Le produit est déjà présent, on incrémente sa quantité
        listOfProducts[index].quantity += productToAdd.quantity;
    }

    // Mise à jour de la liste des produits dans le localStorage
    setProductsInLocalStorage(listOfProducts);
    
}

