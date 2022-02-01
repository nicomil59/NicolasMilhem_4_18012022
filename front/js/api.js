const urlAPI = 'http://localhost:3000/api/products/';

// charge l'API

async function loadAPI(url) {

    let res = await fetch(url);

    if(res.ok) {
        return await res.json();
    } else {
        throw new Error(`Erreur HTTP ! statut : ${res.status}`);
    }
}






