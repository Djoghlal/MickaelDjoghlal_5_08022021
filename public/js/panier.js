//On récupère le contenu du localStorage
const storageBasketJson = window.localStorage.getItem('basketTeddies');
let resultBasketContainer = '';
let arrayBasketFinaly = [];

//Si le localStorage n'est pas vide, on traite la liste du contenu.
//Sinon on dit au visiteur que son panier est vide.
if (storageBasketJson != null) {
    //On récupère le contenu du localStorage
    let storageBasket = JSON.parse(storageBasketJson);

    for (const elt of storageBasket) { 
        let urlProduct = url + elt.id;

        fetch(urlProduct) .then(function(response) {
            return response.json();
        }) .then(function(dataBasket) {

            //On affiche la ligne correspondante au tableau des résultats
            dataBasketObject = {
                id: elt.id,
                name: dataBasket.name,
                quantity: elt.quantity,
                option: elt.option,
                price: dataBasket.price
            };

            arrayBasketFinaly.push(dataBasketObject);
        })

        .catch(error => {
            console.log(error);
        });
    }

    console.log(arrayBasketFinaly[1]);

    // resultBasketContainer = `
    //     <table class="table">
    //         <thead class="thead-light">
    //             <tr>
    //                 <th scope="col">#</th>
    //                 <th scope="col">Produit</th>
    //                 <th scope="col">Prix</th>
    //                 <th scope="col">Quantité</th>
    //                 <th scope="col">Option</th>
    //                 <th scope="col">Action</th>
    //             </tr>
    //         </thead>
    //         <tbody>`;

    // for (i=0; i < arrayBasketFinaly.length; i++) {
    //     console.log(arrayBasketFinaly);
    // }

    // resultBasketContainer += `
    //         </tbody>
    //     </table>`;

} else {
    resultBasketContainer = `
        <table class="table">
            <thead class="thead-light">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nom du produit</th>
                    <th scope="col">Prix</th>
                    <th scope="col">Quantité</th>
                    <th scope="col">Option</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">0</th>
                    <td colspan="5">Votre panier est vide !</td>
                </tr>
            </tbody>
        </table>
    `;
}

//On insère le tableau dans le container de la page
let panierContainer = document.querySelector('#panier-container').innerHTML = resultBasketContainer;