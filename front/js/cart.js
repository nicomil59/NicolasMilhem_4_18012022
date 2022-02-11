// ************ gestion de l'affichage du panier ************

// affiche le panier

const displayCart = storedProducts => {

    getProductsFromAPI()
        .then(productsFromAPI => {

        let html = '';
        let items = [];

        storedProducts.forEach(storedProduct => {
            
            let productData = productsFromAPI.find(productfromAPI => productfromAPI._id ===  storedProduct.id);

            const item = {
                id: storedProduct.id,
                color: storedProduct.color,
                quantity: storedProduct.quantity,
                name: productData.name,
                price: productData.price,
                imageUrl: productData.imageUrl,
                altTxt: productData.altTxt
            }

            items.push(item);

            html += createCartItem(item);
            document.getElementById('cart__items').innerHTML = html;

        });
        
        getTotal(items);

        // gestion de la modification de la quantité d'un article dans le panier

        document.querySelectorAll('.itemQuantity').forEach(input => {
            input.addEventListener('change', e => {
                let article = e.target.closest('article');
                let quantity = parseInt(e.target.value);

                if (isQuantityValid(quantity)) {
                    
                    isCartQuantityValid = true;

                    // recherche de l'index de l'article pour lequel on modifie la quantité
                    let id = article.dataset.id;
                    let color = article.dataset.color;
                    let indexItem = items.findIndex(item => item.id === id && item.color === color);

                    // modification de la quantité du produit dans le tableau items
                    items[indexItem].quantity = quantity;

                    // mise à jour prix total suite modification quantité
                    getTotal(items);                    

                    // mise à jour du panier dans le localStorage
                    storedProducts[indexItem].quantity = quantity;
                    setProductsInLocalStorage(storedProducts);                    
                    
                    alert("Panier mis à jour");

                } else {
                    alert("Veuillez choisir un nombre d'article(s) entre 1 et 100");
                    isCartQuantityValid = false;
                }

                
            })
        });

        // gestion de la suppression d'un article dans le panier (clic sur bouton 'Supprimer')

        document.querySelectorAll('.deleteItem').forEach(btn => {
            btn.addEventListener('click', e => {

                let article = e.target.closest('article');

                deleteArticle(article, items, storedProducts);

                alert("Produit bien supprimé");
                
            })
        });

        })
        .catch(err => console.log(err));
    
    
    
}

// on affiche le contenu du panier à partir des produits stockés dans le LocalStorage

let isCartQuantityValid = true; 
displayCart(getProductsFromLocalStorage());

// récupère les données de tous les produits depuis l'API

async function getProductsFromAPI() {
    return await loadAPI(`${urlAPI}`);
}


// crée une ligne correspondante à un article dans le panier

const createCartItem = item => {
    return `
        <article class="cart__item" data-id="${item.id}" data-color="${item.color}">
            <div class="cart__item__img">
                <img src="${item.imageUrl}" alt="${item.altTxt}">
            </div>
            <div class="cart__item__content">
                <div class="cart__item__content__description">
                    <h2>${item.name}</h2>
                    <p>${item.color}</p>
                    <p>${item.price}€</p>
                </div>
                <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                        <p>Qté :</p>
                        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${item.quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                        <p class="deleteItem">Supprimer</p>
                    </div>
                </div>
            </div>
    </article>
    `;
}

// calcule la quantité et le prix total de la commande

const getTotal = items => {

    let totalQuantity = 0;
    let totalPrice = 0;
    
    items.forEach(item => {
        totalQuantity += item.quantity;
        totalPrice += item.quantity * item.price;
    });

    document.getElementById('totalQuantity').textContent = totalQuantity;
    document.getElementById('totalPrice').textContent = totalPrice;
}

// supprime un article du panier de commande

const deleteArticle = (article, items, storedProducts) => {
    
    // suppression dans le DOM
    article.remove();
                    
    // recherche de l'index du produit à supprimer
    let id = article.dataset.id;
    let color = article.dataset.color;
    let indexItem = items.findIndex(item => item.id === id && item.color === color);

    // suppression du produit du tableau items à l'index correspondant
    items.splice(indexItem, 1);

    // recalcul des totaux après suppression d'un produit
    getTotal(items);

    // supprimer le produit dans le LocalStorage
    storedProducts.splice(indexItem, 1);
    setProductsInLocalStorage(storedProducts);
}

// ************ gestion du formulaire de commande ************

// gestion de la validation des champs du formulaire

const form = document.querySelector('form.cart__order__form');

console.log(form)

form.firstName.addEventListener('change', () => {
    isNameValid(form.firstName);
});

form.lastName.addEventListener('change', () => {
    isNameValid(form.lastName);
});

form.address.addEventListener('change', () => {
    isAddressValid(form.address);
});

form.city.addEventListener('change', () => {
    isNameValid(form.city);
});

form.email.addEventListener('change', () => {
    isEmailValid(form.email)
});

// gestion de la soumission du formulaire

form.addEventListener('submit', e => {

    e.preventDefault();

    // Si le panier est valide, on vérifie si le formulaire est valide
    
    if(isCartValid()) {
        
        console.log('panier valide');

        // si le formulaire est valide, je crée un objet contact à partir des données
        // de celui-ci

        if(isNameValid(form.firstName) && isNameValid(form.lastName) && isNameValid(form.city) && isAddressValid(form.address) && isEmailValid(form.email)) {
            
            console.log('*** formulaire valide ***');

            // création de l'objet contact

            const contact = getContact();
            console.log(contact);

            // création du tableau avec les id des produits depuis le localStorage

            const products = getProductsFromLocalStorage().map(product => product.id);
            console.log(products);

            // récupération de l'id de commande

            getOrderId(contact, products)
                .then(orderId => {

                    // suppression du panier dans le localStorage

                    deleteProductsInLocalStorage();

                    // redirection vers la page Confirmation

                    goToConfirmation(orderId);
                })

        } else {
            console.log('!!!!!!!!! formulaire pas valide !!!!!!!!!');
        }


    } else {
        console.log('panier pas valide');
    }


});

// retourne un objet contact à partir des données entrées dans le formulaire

const getContact = () => {

    return {
        firstName: form.firstName.value.trim(),
        lastName : form.lastName.value.trim(),
        address: form.address.value.trim(),
        city: form.city.value.trim(),
        email: form.email.value.trim()
    }

}

// effectue une requête POST avec l'envoi d'un objet JSON contenant l'objet contact et le tableau de produits
// retourne l'id de la commande 

async function getOrderId(contact, products) {

    try {
        const orderData = {contact, products};
        let respData = await postAPI(`${urlAPI}order`, orderData);
        const orderId = respData.orderId;
        console.log(orderId);
        return orderId;

    } catch (err) {
        alert("Il y a un problème avec l'API");
        console.log(err);
    }

}

// redirige vers la page Confirmation avec l'id dans l'URL

const goToConfirmation = orderId => {
    window.location.href = `./confirmation.html?orderId=${orderId}`;
}







