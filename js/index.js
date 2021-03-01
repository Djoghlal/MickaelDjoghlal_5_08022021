//On créer la variable de l'API
let url = 'http://localhost:3000/api/teddies';

//On travaille avec fetch afin d'appeler l'API et d'avoir en retour des promesses.
fetch(url)
    //On créer la première promesse qui va nous renvoyer la réponse de l'API
    .then(function(response) {
        return response.json();
    })
    //On créer la 2ème promesse qui nous renvoi les données (data)
    .then(function(data) {
        //On met un console.log de la réponse, afin d'avoir les descriptions de l'API (dans ce cas les articles)
        console.log(data);
        //On créer une boucle pour afficher les articles.
        let teddiesContainer = '';
        for (let teddiesList of data) {
            teddiesContainer += `
                <div class="card text-center cards-container" style="width: 18rem;">
                    <div class="card-price">${teddiesList.price}€</div>
                    <img src="${teddiesList.imageUrl}" class="card-img-top cards-picture" height="200"  alt="Teddie ${teddiesList.name}">
                    <div class="card-body">
                        <h5 class="card-title">${teddiesList.name} Teddie</h5>
                        <p class="card-text">${teddiesList.description}</p>
                        <div class="btn btn-primary">Détails</div>
                    </div>
                </div>
            `;
        }

        //On va séléctionner le conteneur afin d'y afficher le resultat !
        document.querySelector('#cards-list').innerHTML = teddiesContainer;
    });