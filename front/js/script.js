const apiURL = 'http://localhost:3000/api/products';

const items = document.getElementById('items');

async function loadData() {
    const response = await fetch(apiURL);
    if (!response.ok) {
        throw new Error(`Erreur HTTP ! statut : ${response.status}`);
    }
    return await response.json();
}

loadData()
    .then(products => {
        let productCards = [];
        products.forEach(product => {
            productCards.push(getProductCard(product));
        })
        items.innerHTML = productCards.join('');
    })
    .catch(e => console.log(e))

// affiche un produit sur la page

const getProductCard = product => {
    return `
    <a href="./product.html?id=${product._id}">
        <article>
            <img src="${product.imageUrl}" alt=${product.altTxt}>
            <h3 class="productName">${product.name}</h3>
            <p class="productDescription">${product.description}</p>
        </article>
    </a>
    `;
};