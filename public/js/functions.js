//Création des variables générales
const url = 'http://localhost:3000/API/teddies/';
const eventContainer = document.querySelector('#event-status');


function addPanier(data) {
    //Au clic, on récupère les valeurs id, option et la quantité
    const optionChoice = document.querySelector('#optionTeddie').value;
    const idChoice = idPrivate;

    //On vérifie si le panier est existant ou pas pour la suite des étapes.
    if (localStorage.getItem("basketTeddies")) {
        //Le panier existe donc pas besoin de le créer.

    } else {
        //Le panier existe pas, nous pouvons créer le tableau et enregistrer directement l'objet dans le localStorage
        let basketTeddies = [{
            id: data._id,
            name: data.name,
            price: data.price/100,
            quantity: 
            option: optionChoice
        }];

        console.log(basketTeddies);
    }
}





//Chercher le contenu du local storage voir si j'ai mon élément.
    //Si il existe je l'ajoute +1 quantité.


    //Sinon je l'ajoute à 1.


    // //On créer l'objet de ce que nous récupérons.
    // let productAdd = {
    //     id: data._id,
    //     name: data.name,
    //     option: document.querySelector('#optionTeddie').value,
    //     price: data.price/100,
    //     quantity: 0
    // }

    // //On créer la variable général du panier
    // //const basketContainer = [];

    // // //On vérifie si le panier est existant ou non
    // if (typeof basketContainer != "undefined") {
    //     //Du coup le array existe donc on y ajoute le nouvel objet

    //     //console.log(basketContainer);
        
    // } else {
    //     console.log(eventContainer);
    //     // eventContainer.innerHTML = `<h4 class="alert-heading">Erreur interne</h4>
    //     //     <p>Un problème sur le site est detecté, notre équipe met tout en oeuvre pour le résoudre au plus vite.</p>
    //     //     <p>A bientôt sur notre boutique !</p>`;
    // }   