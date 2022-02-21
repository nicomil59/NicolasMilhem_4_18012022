// Récupère l'id de commande et l'affiche sur la page

const displayOrderId = () => {
    
    const search = window.location.search;
    const searchParams = new URLSearchParams(search);
    const orderId = searchParams.get('orderId');
    document.getElementById('orderId').textContent = orderId;
    
}

displayOrderId();