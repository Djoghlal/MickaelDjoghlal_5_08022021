//Création des variables générales
const url = 'http://localhost:3000/API/teddies/';
const eventContainer = document.querySelector('#event-status');


function addPanier(idArticle ,optionArticle, quantityArticle) {
    //On vérifie si le panier est existant ou pas pour la suite des étapes.
    if (localStorage.getItem("basketTeddies")) {
        //Le panier existe, on parcours le localStorage et vérifier à chaque boucle si l'ID et l'option existe.
        let basketContainerJson = localStorage.getItem("basketTeddies");
        let basketContainer = JSON.parse(basketContainerJson);

        let teddieChoice = {
            id: idArticle,
            option: optionArticle,
            quantity: parseInt(quantityArticle)
        };
        
        for (let i = 0; i < basketContainer.length; i++) {
            //Si id et option existe, on ajoute quantité
            //Sinon, on ajoute l'objet complet
            let count = basketContainer[i];

            if (teddieChoice.id == count.id && teddieChoice.option == count.option) {
                    console.log('Cet objet est déjà dans votre panier');
                    
                    teddieChoice.quantity = parseInt(count.quantity) + teddieChoice.quantity;
                    basketContainer.splice([i], 1, teddieChoice); //On modifie la ligne correspondante dans le tableau avec la nouvelle valeur.

                    basketContainerFinaly = JSON.stringify(basketContainer);
                    localStorage.setItem("basketTeddies", basketContainerFinaly);  
                    
                    eventContainer.innerHTML = `
                    <h4 class="alert-heading">Validation</h4>
                    <p>La quantité de votre article a été mis à jour dans votre panier.</p>
                    `;
                    eventContainer.classList.replace('warning-none', 'success-view');
                    eventContainer.classList.replace('alert-danger', 'alert-success');
                break;
            } else {
                    console.log(`L'objet n'est pas existant dans le panier !`)
                    basketContainer.push(teddieChoice);
                    basketContainerJson = JSON.stringify(basketContainer);
                    localStorage.setItem("basketTeddies", basketContainerJson);

                    //On valide le message d'ajout au panier.
                    eventContainer.innerHTML = `
                    <h4 class="alert-heading">Validation</h4>
                    <p>Votre article a été correctement ajouté au panier.</p>
                    `;
                    eventContainer.classList.replace('warning-none', 'success-view');
                    eventContainer.classList.replace('alert-danger', 'alert-success');
                break;
            }
        }
        
    } else {
        //Le panier existe pas, nous pouvons créer le tableau et enregistrer directement l'objet dans le localStorage
        let basketTeddieChoice = [{
            id: idArticle,
            option: optionArticle,
            quantity: quantityArticle
        }];

        //On l'enregistre dans le localStorage
        teddieChoiceJson = JSON.stringify(basketTeddieChoice);
        localStorage.setItem("basketTeddies", teddieChoiceJson);

        //On valide le message d'ajout au panier.
        eventContainer.innerHTML = `
            <h4 class="alert-heading">Validation</h4>
            <p>Votre article a été correctement ajouté au panier.</p>
        `;
        eventContainer.classList.replace('warning-none', 'success-view');
        eventContainer.classList.replace('alert-danger', 'alert-success');
    }
}