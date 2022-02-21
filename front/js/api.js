const urlAPI = 'http://localhost:3000/api/products/';

// Effectue requête GET pour charger l'API

async function loadAPI(url) {

    let res = await fetch(url);

    if (res.ok) {
        return await res.json();
    } else {
        throw new Error(`Erreur HTTP ! statut : ${res.status}`);
    }
}

// Effectue requête POST sur l'API

async function postAPI(url, data) {

    const options = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    
    let res = await fetch(url, options);

    if (res.ok) {
        return await res.json();
    } else {
        throw new Error(`Erreur HTTP ! statut : ${res.status}`);
    }

}