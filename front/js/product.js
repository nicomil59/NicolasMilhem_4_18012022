const url = new URL(window.location.href);
const searchParams = new URLSearchParams(url.search);
let productId = searchParams.get('id');

// récupère les infos sur le produit à partir de son id et l'affiche

async function getProduct(id) {

    try {
        let product = await loadAPI(`${urlAPI}${id}`);
        showProductDetails(product);

    } catch (err) {
        alert("Il y a un problème avec l'API");
        console.log(err);
    }

}

// affiche les infos du produit

const showProductDetails = product => {
    const itemImage = document.querySelector('.item__img');
    const image = document.createElement('img');
    image.setAttribute('src', product.imageUrl);
    image.setAttribute('alt', product.altTxt);
    itemImage.appendChild(image);

    const title = document.getElementById('title');
    title.innerText = product.name;

    const price = document.getElementById('price');
    price.innerText = product.price;

    const description = document.getElementById('description');
    description.innerText = product.description;

    const colors = document.getElementById('colors');
    product.colors.forEach(color => {
        const option = document.createElement('option');
        option.setAttribute('value', color);
        option.innerText = color;
        colors.appendChild(option);
    });

};

getProduct(productId);

// gestion clic sur bouton 'ajouter au panier'

document.getElementById('addToCart').addEventListener('click', () => {

    const productToAdd = {
        id: productId,
        color: document.getElementById('colors').value,
        quantity: parseInt(document.getElementById('quantity').value)
    }

    console.log(productToAdd);

    if (isQuantityValid(productToAdd) && isColorValid(productToAdd)) {
        addProductToCart(productToAdd);
        console.log('commande possible');
    } else {
        if(!isQuantityValid(productToAdd)) {
            alert("veuillez choisir un nombre d'article(s) entre 1 et 100");
        }
        if(!isColorValid(productToAdd)) {
            alert('veuillez choisir une couleur');
        }
    }
});

// vérifie si la quantité est correcte

const isQuantityValid = productToAdd => {

    return productToAdd.quantity < 1 || productToAdd.quantity > 100 ? false : true;

}

// vérifie si une couleur a été sélectionnée

const isColorValid = productToAdd => {

    return productToAdd.color === "" ? false : true;
    
}


// ajoute produit au panier

const addProductToCart = productToAdd => {
    
    let listOfProducts = [];

    if (isKeyInLocalStorage('cart')) {
        console.log('je récupère le panier depuis le LocalStorage');
        listOfProducts = getDataFromLocalStorage('cart');
    } else {
        console.log('création du panier');
    }

    updateCart(listOfProducts, productToAdd);
    console.log("panier mis à jour", listOfProducts);
}

// met à jour la liste des produits et par conséquent le panier avec le produit ajouté

const updateCart = (listOfProducts, productToAdd) => {
    
    const index = listOfProducts.findIndex(product => productToAdd.id === product.id && productToAdd.color === product.color);
    
    if(index < 0) {
        console.log('produit pas trouvé');
        listOfProducts.push(productToAdd);
    } else {
        console.log('produit déjà dans le panier');
        listOfProducts[index].quantity += productToAdd.quantity;
    }

    updateDataInLocalStorage('cart', listOfProducts);
    
}


// vérifie si le produit à ajouter figure déjà dans le panier

// const isProductInCart = productToAdd => {
//     const index = cart.findIndex(product => productToAdd.id === product.id && productToAdd.color === product.color);
//     console.log(index);
//     return index;
// }