fetch(url)
    .then(response => response.json())

    .then(data => {
        let teddiesContainer = '';
        for (let teddiesList of data) {
            teddiesContainer += `
                <div class="card text-center cards-container" style="width: 18rem;">
                    <div class="card-price">${teddiesList.price/100}€</div>
                    <img src="${teddiesList.imageUrl}" class="card-img-top cards-picture" height="200"  alt="Teddie ${teddiesList.name}">
                    <div class="card-body">
                        <h5 class="card-title">${teddiesList.name} Teddie</h5>
                        <p class="card-text">${teddiesList.description}</p>
                        <a href="./public/pages/article.html?id=${teddiesList._id}"><div class="btn btn-primary">Détails</div></a>
                    </div>
                </div>
            `;
        }

        document.querySelector('#card-list').innerHTML = teddiesContainer;
    })

    .catch(error => {
        console.log(error);
            let errorServer = document.querySelector('#event-status');

            errorServer.innerHTML = `<h4 class="alert-heading">Erreur serveur</h4>
            <p>Un problème sur le site est detecté, notre équipe met tout en oeuvre pour le résoudre au plus vite.</p>
            <p>A bientôt sur notre boutique !</p>`;

            errorServer.classList.remove('warning-none');
            errorServer.classList.add('warning-view');

            // On peut à la place de revenir en arrière, mettre un timer pour raffraichir la page.
            // setTimeout(function() { document.location.reload() }, 2000);
    });