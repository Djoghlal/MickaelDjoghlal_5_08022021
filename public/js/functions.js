//Création des variables générales
const url = 'http://localhost:3000/API/teddies/';
const eventContainer = document.querySelector('#event-status');


function addBasket(idArticle ,optionArticle, quantityArticle) {
    //On vérifie avant tout le formulaire si le champ quantité est vide ou pas ainsi que le champ option
    let i = 0;
    let regNumber = new RegExp('^[0-9]');
    let descError = "";
    if (regNumber.test(quantityArticle)) {
        //On met le logo qui correspond à la validation
        document.querySelector('.quantity-check').classList.replace('result-input-none', 'result-input-view');
        document.querySelector('.quantity-error').classList.replace('result-input-view', 'result-input-none');
    } else {
        document.querySelector('.quantity-error').classList.replace('result-input-none', 'result-input-view');
        document.querySelector('.quantity-check').classList.replace('result-input-view', 'result-input-none');
        descError += '<li>Vous devez entrer un nombre correcte sur la quantité.</li>';
        i++;
    }

    if (i == 0) {
        eventContainer.classList.replace('warning-view', 'warning-none');

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

                        setTimeout(function(){ window.location.reload(1); }, 2000);
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

            setTimeout(function(){ window.location.reload(1); }, 2000);
        }
        
    } else {
        eventContainer.innerHTML = `
            <h4 class="alert-heading">Erreur</h4>
            <p><i>Vous avez ${i} erreur(s) sur votre demande:</i></p>
            <ul>
                ${descError}
            </ul>
        `;
        eventContainer.classList.replace('warning-none', 'warning-view');
    }
 }



function deleteBasket(idArticle, optionArticle) {
    //On a l'article concerné par la demande de suppression
    //Le panier existe, on parcours le localStorage et vérifier à chaque boucle si l'ID et l'option existe.
    let basketContainerJson = localStorage.getItem("basketTeddies");
    let basketContainer = JSON.parse(basketContainerJson);

    for (let i = 0; i < basketContainer.length; i++) {
        //Dans chaque boucle, on vérifie si l'Id et l'Article sont dans le localStorage
        if (idArticle == basketContainer[i].id && optionArticle == basketContainer[i].option) {
                //console.log('Article Ok, on peut le supprimer du panier !');
                //On utilise splice pour supprimer l'article de l'Array récupéré sur le localStorage
                const deleteNewArticle = basketContainer.splice(i, 1);
            break;
        } else {
            console.log('Suivant article non concerné !');
        }
    }

    //On peut mettre à jour le localStorage
    basketContainerJson = JSON.stringify(basketContainer);
    localStorage.setItem("basketTeddies", basketContainerJson);

    //On valide le message de suppression au panier.
    eventContainer.innerHTML = `
        <h4 class="alert-heading">Validation</h4>
        <p>Votre article a été correctement supprimé du panier.</p>
    `;
    eventContainer.classList.replace('warning-none', 'success-view');
    eventContainer.classList.replace('alert-danger', 'alert-success');

    setTimeout(function(){ window.location.reload(1); }, 2000);
}



function deleteAll() {
    //On supprime la totalité du contenu dans le localStorage
    localStorage.removeItem('basketTeddies');

    //On valide le message de suppression au panier.
    eventContainer.innerHTML = `
        <h4 class="alert-heading">Validation</h4>
        <p>Votre panier à été vidé entièrement.</p>
    `;
    eventContainer.classList.replace('warning-none', 'success-view');
    eventContainer.classList.replace('alert-danger', 'alert-success');

    setTimeout(function(){ window.location.reload(1); }, 2000);
}