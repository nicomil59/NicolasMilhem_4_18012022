const url = new URL(window.location.href);
console.log(url.search);
const searchParams = new URLSearchParams(url.search);
let productId;

if (searchParams.has('id')) {
    productId = searchParams.get('id');
} else console.log('id introuvable');

console.log(productId);

async function getProduct(id) {

    try {

        const response = await fetch(`http://localhost:3000/api/products/${id}`);

        if (!response.ok) {
            throw new Error(`Erreur HTTP ! statut : ${response.status}`);
        }

        const product = await response.json();
        console.log(product);
        showProductDetails(product);

    } catch (e) {
        console.log(e);
    }

}

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