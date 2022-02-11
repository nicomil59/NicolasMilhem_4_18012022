// récupère l'id de commande et l'affiche sur la page

const displayOrderId = () => {
    
    const url = new URL(window.location.href);
    const searchParams = new URLSearchParams(url.search);
    const orderId = searchParams.get('orderId');
    console.log(orderId);
    document.getElementById('orderId').textContent = orderId;
    
}

displayOrderId();