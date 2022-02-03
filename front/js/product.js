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

// gestion clic sur bouton 'ajouter au panier'

document.getElementById('addToCart').addEventListener('click', () => {

    const productToAdd = {
        id: productId,
        color: document.getElementById('colors').value,
        quantity: parseInt(document.getElementById('quantity').value)
    }

    console.log(productToAdd);

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

// ajoute produit au panier

const addProductToCart = productToAdd => {
    
    // let listOfProducts = [];
    let listOfProducts = getProductsFromLocalStorage();

    // if (isKeyInLocalStorage('cart')) {
    //     console.log('je récupère le panier depuis le LocalStorage');
    //     listOfProducts = getProductsFromLocalStorage();
    // } else {
    //     console.log('création du panier');
    // }

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

    setProductsInLocalStorage(listOfProducts);
    
}

