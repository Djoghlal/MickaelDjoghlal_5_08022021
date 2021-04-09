//On récupère l'url complète du lien avec l'id à l'intérieur
let urlProduit = window.location.href;

//On recherche l'ID dans l'URL récupérée
let id = urlProduit.split('?id=');
let idPrivate = id[1];
//console.log(idPrivate);

//On appelle l'API pour trouver les informations du nounours avec l'ID correspondant.
let urlPrivate = url + idPrivate;

fetch(urlPrivate)
    .then(response => response.json())

    .then(data => {
        //console.log(data);

        //On défini la variable du contenu de la boucle pour l'afficher après
        let = teddieOption = '<select id="optionTeddie">';
        for (let i=0; i < data.colors.length; i++) {
            teddieOption += `<option value="${data.colors[i]}">${data.colors[i]}</option>`;
        }
        teddieOption += '</select>';

        //Contenu de la card
        teddieChoice = `
            <div class="card mb-3" style="max-width: 540px;">
                <div class="row no-gutters">
                    <div class="col-md-4">
                        <img src="${data.imageUrl}" class="card-img border border-light rounded" alt="Photo teddie ${data.name}">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                        <h5 class="card-title">Orico-${data.name}</h5>
                        <span class="badge badge-success badge-price">${data.price/100}€</span>

                        <input type="text" id="idTeddie" value="${data._id}"></input>

                        <p class="card-text"><strong>Quantité:</strong></p>
                        <input type="number" id="quantityTeddie"></input>

                        <br /><br />

                        <p class="card-text"><strong>Option(s):</strong></p>
                        <p class="card-text">${teddieOption}</p>

                        <p class="card-text">${data.description}</p>
                        <button type="button" class="btn btn-primary" id="btn-panier">Ajouter au panier</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        //On va séléctionner le conteneur afin d'y afficher le resultat !
        document.querySelector('#articleChoice').innerHTML = teddieChoice;

        //Evenement si on clique sur le bouton d'ajout au panier
        let btnAdd = document.querySelector('#btn-panier');
        btnAdd.addEventListener('click', function () {

            const idChoice = document.querySelector('#idTeddie').value;
            const optionChoice = document.querySelector('#optionTeddie').value;
            const quantityChoice = document.querySelector('#quantityTeddie').value;

            addPanier(idChoice ,optionChoice, quantityChoice);
        });

    })

    .catch(error => {
        console.log(error);
            let errorServer = document.querySelector('#event-status');

            errorServer.innerHTML = `<h4 class="alert-heading">Erreur serveur</h4>
            <p>Un problème sur le site est detecté, notre équipe met tout en oeuvre pour le résoudre au plus vite.</p>
            <p>A bientôt sur notre boutique !</p>`;

            errorServer.classList.remove('warning-none');
            errorServer.classList.add('warning-view');
    });