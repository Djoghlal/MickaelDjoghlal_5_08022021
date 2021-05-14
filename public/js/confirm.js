//Confirmation de la commande donc, on peut supprimer le storage totalement.
localStorage.clear();

//On récupère l'url complète du lien avec l'id à l'intérieur
let urlConfirm = window.location.href;

//On recherche le n° de commande dans l'URL récupérée
let order = urlConfirm.split('?orderid=');
let orderPrivate = order[1];



//On valide le message de commande avec le code client.
eventContainer.innerHTML = `
<h4 class="alert-heading">Commande validée</h4>
<p>Merci de votre confiance.</p>
<p>Votre colis est en route et arrivera dans votre boite au lettres directement.</p>
<p><strong>N° de commande:</strong> ${orderPrivate}</p>
`;
eventContainer.classList.replace('warning-none', 'success-view');
eventContainer.classList.replace('alert-danger', 'alert-success');

setTimeout(function(){ window.location = "../../index.html"; }, 2000);