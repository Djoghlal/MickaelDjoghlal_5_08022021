//On récupère le contenu du localStorage
const storageBasketJson = window.localStorage.getItem('basketTeddies');

//Si le localStorage n'est pas vide, on traite la liste du contenu.
//Sinon on dit au visiteur que son panier est vide.
if (storageBasketJson != null) {
    //On récupère le contenu du localStorage
    let storageBasket = JSON.parse(storageBasketJson);
    document.querySelector('#panier-container').innerHTML = '';

    //Supprimer le panier si il n'y a rien à l'intérieur.
    if (storageBasket.length < 1) {
        deleteAll();
    }

    async function selectProducts() {
        //On créer le contenu de prix global
        let storagePrice = 0;

        //On exécute la boucle pour retrouver les produits avec les ID
        for (const elt of storageBasket) { 
            let urlProduct = url + elt.id;

            await fetch(urlProduct) .then(function(response) {
                return response.json();
            }) .then(function(dataBasket) {
                    let articlePriceFinaly = elt.quantity * (dataBasket.price/100);
                    document.querySelector('#panier-container').innerHTML += `
                        <div class="card card-basket" style="width: 18rem;">
                            <div class="card-body">
                                <h5 class="card-title">Orico ${dataBasket.name}</h5>
                                <p class="card-text"><span class="badge badge-success badge-price">${dataBasket.price/100}€</span></p>
                            </div>
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item"><strong>Quantité: </strong>${elt.quantity}</li>
                                <li class="list-group-item"><strong>Option: </strong>${elt.option}</li>
                                <li class="list-group-item"><strong>Prix total: </strong>${articlePriceFinaly}€</li>
                            </ul>
                            <div class="card-body">
                                <button type="button" class="btn btn-danger" id="deleteBasket" onclick="deleteBasket('${elt.id}', '${elt.option}')"><i class="fas fa-trash-alt"></i></button>
                            </div>
                        </div>
                    `;

                    //On implémente le prix de l'article à chaque boucle
                    storagePrice += articlePriceFinaly;
            })

            .catch(error => {
                console.log(error);
            })
        }

        document.querySelector('#container-price').innerHTML = `<strong>Prix total à payer:</strong> ${storagePrice}€`;
        
    }

    selectProducts();

    //On fait l'event de suppression du panier complet
    let btnDelAll = document.querySelector('#delete-all-basket');
    btnDelAll.innerHTML = `<button type="button" class="btn btn-danger float-center btn-view" id="deleteAllBasket">Supprimer le panier</button>`;
    btnDelAll.addEventListener('click', function () {
        deleteAll();
    });


    //Envoi des données sur le serveur avec la méthode fetch POST
    getBasket.addEventListener('submit', function (event) {
        event.preventDefault()

        //L'utilisateur que nous devons envoyer en tant qu'objet avec POST
        const contact = {
            firstName: firstName.value,
            lastName: lastName.value,
            address: address.value,
            city: city.value,
            email: email.value
        };

        //Le tableau des produits envoyé au backend doit être un array de strings produits
        const produits = [];
        const order = { contact, produits };

        //On parcours storageBasket pour les articles
        for (i = 0; i < storageBasket.length; i++) {
            let productFinal = storageBasket[i].id; 
            produits.push(productFinal);
        }

        console.log(order);

        //On peut maintenant tout transformer en JSON pour l'envoyer au serveur
        let urlOrder = url + 'order';

        let fetchInit = { 
            method: 'POST',
            body: JSON.stringify(order),
            headers: {
                "Content-Type": "application/json",
            },
        };

        fetch(urlOrder, fetchInit) 
        .then(response => response.json())
        .then(result => {
            //On fait le traitement du retour du serveur
            const orderId = result.order_id;
            //On supprime le contenu du Storage
            //localStorage.removeItem('basketTeddies');
            //On redirectionne le client vers la page de confirmation.
            //location.href = `../pages/confirm.html?orderid=${orderId}`;

            console.log(orderId);
        })
        .catch((error) => {
            alert(error);
        });
    });




} else {
    document.querySelector('#panier-container').innerHTML += `
    <div class="container-fluid">
        <img alt="None" src="../images/ciao.gif" />
        <p class="text-center lead">Votre panier est vide :'(</p>
    </div>`;

    document.querySelector('#container-price').innerHTML = `<strong>Prix total à payer:</strong> 0€`;

    //On cache le bouton de suppression du panier total car on a rien à y faire si il n'y a rien au panier.
    btnDelAll = document.querySelector('#delete-all-basket');
    btnDelAll.classList.replace("btn-view", "btn-none");

    //On cache également le formulaire de contact qui ne sert à rien dans ce cas
    formGuest = document.querySelector('#getBasket');
    formGuest.classList.replace("get-basket-view", "get-basket-none");
}