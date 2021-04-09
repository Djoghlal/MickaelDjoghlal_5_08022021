//Création des variables générales
const url = 'http://localhost:3000/API/teddies/';
const eventContainer = document.querySelector('#event-status');


function addPanier(idArticle ,optionArticle, quantityArticle) {

    console.log(idArticle);
    console.log(optionArticle);
    console.log(quantityArticle);

    // //On vérifie si le panier est existant ou pas pour la suite des étapes.
    // if (localStorage.getItem("basketTeddies")) {
    //     //Le panier existe donc pas besoin de le créer.
        
    // } else {
    //     //Le panier existe pas, nous pouvons créer le tableau et enregistrer directement l'objet dans le localStorage
    //     let basketTeddies = [{
    //         id: data._id,
    //         name: data.name,
    //         price: data.price/100,
    //         //quantity: 
    //         option: optionChoice
    //     }];

    //     console.log(basketTeddies);
    // }
}