// crée le template d'une card représentant un produit

function createProductCard(product) {
    return `
    <a href="./product.html?id=${product._id}">
        <article>
            <img src="${product.imageUrl}" alt=${product.altTxt}>
            <h3 class="productName">${product.name}</h3>
            <p class="productDescription">${product.description}</p>
        </article>
    </a>
    `;
}

// affiche l'ensemble des produits

function displayProducts(products) {

    let html = '';
    products.forEach(product => {
        html += createProductCard(product);
    });

    document.getElementById('items').innerHTML = html;
}

// récupère les produits et les affiche

// loadAPI(urlAPI)
//     .then(products => {
//         console.log(products);
//         displayProducts(products);
//     })
//     .catch(err => {
//         alert("Problème avec l'API");
//         console.log(err);
//     })

async function getAllProducts() {
    try {
        let products = await loadAPI(urlAPI);
        displayProducts(products)
    } catch (err) {
        alert("Problème avec l'API");
        console.log(err);
    }
}

getAllProducts();



