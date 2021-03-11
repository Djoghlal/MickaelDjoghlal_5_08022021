//On créer la variable de l'API
const url = 'http://localhost:3000/API/teddies';

//On travaille avec fetch afin d'appeler l'API et d'avoir en retour des promesses.
fetch(url)
    //On créer la première promesse qui va nous renvoyer la réponse de l'API en objet.
    .then(response => response.json())

    //On créer la 2ème promesse qui nous renvoi les données (data)
    .then(data => {
        //On met un console.log de la réponse, afin d'avoir les descriptions de l'API (dans ce cas les articles)
        console.log(data);
        //On créer une boucle pour afficher les articles.
        let teddiesContainer = '';
        for (let teddiesList of data) {
            teddiesContainer += `
                <div class="card text-center cards-container" style="width: 18rem;">
                    <div class="card-price">${teddiesList.price/100}€</div>
                    <img src="${teddiesList.imageUrl}" class="card-img-top cards-picture" height="200"  alt="Teddie ${teddiesList.name}">
                    <div class="card-body">
                        <h5 class="card-title">${teddiesList.name} Teddie</h5>
                        <p class="card-text">${teddiesList.description}</p>
                        <a href="./teddies.html?id=${teddiesList._id}"><div class="btn btn-primary">Détails</div></a>
                    </div>
                </div>
            `;
        }

        //On va séléctionner le conteneur afin d'y afficher le resultat !
        document.querySelector('#card-list').innerHTML = teddiesContainer;
    })

    .catch(error => {
        console.log(error);
            //Une erreur, on affiche un message dans le container dédié à ça.
            let errorServer = document.querySelector('#event-status');

            errorServer.innerHTML = `<h4 class="alert-heading">Erreur serveur</h4>
            <p>Un problème sur le site est detecté, notre équipe met tout en oeuvre pour le résoudre au plus vite.</p>
            <p>A bientôt sur notre boutique !</p>`;

            errorServer.classList.remove('warning-none'); //On supprime la classe si elle est existante
            errorServer.classList.add('warning-view'); //On ajoute la class qui va afficher l'erreur.

            // On peut à la place de revenir en arrière, mettre un timer pour raffraichir la page.
            // setTimeout(function() { document.location.reload() }, 2000);
    });