const apiURL = 'http://localhost:3000/api/products';

const items = document.getElementById('items');

async function loadData() {
    const response = await fetch(apiURL);
    if(!response.ok) {
        throw new Error(`Erreur HTTP ! statut : ${response.status}`);
    }
    const data = await response.json();
    return data;
}

loadData().then(products => {
    products.forEach(product => {
        items.innerHTML += showProduct(product);
    });
})

// fetch(apiURL)
//     .then(response => response.json())
//     .then(products => {
//         products.forEach(product => {
//             items.innerHTML += showProduct(product);
//         });
//     })
//     .catch(err => console.log(err));

// affiche un produit sur la page

const showProduct = product => {
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