//On récupère le contenu du localStorage
const storageBasketJson = window.localStorage.getItem('basketTeddies');

//Si le localStorage n'est pas vide, on traite la liste du contenu.
//Sinon on dit au visiteur que son panier est vide.
if (storageBasketJson != null) {
    //On récupère le contenu du localStorage
    let storageBasket = JSON.parse(storageBasketJson);
    document.querySelector('#panier-container').innerHTML = '';

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
                                <button type="button" class="btn btn-danger" id="deleteBasket"><i class="fas fa-trash-alt"></i></button>
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

} else {
    document.querySelector('#panier-container').innerHTML += `
    <div class="container-fluid">
        <img alt="None" src="../images/ciao.gif" />
        <p class="text-center lead">Votre panier est vide :'(</p>
    </div>`;
}