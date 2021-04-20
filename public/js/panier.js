//On récupère le contenu du localStorage
const storageBasket = window.localStorage.getItem('basketTeddies');
let resultBasketContainer;

//Si le localStorage n'est pas vide, on traite la liste du contenu.
//Sinon on dit au visiteur que son panier est vide.
if (storageBasket != null) {
    //On récupère le contenu du localStorage
    let storageBasketJson = localStorage.getItem('basketTeddies');
    let storageBasket = JSON.parse(storageBasketJson);

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
            <tbody>`;

    for (let i = 0; i < storageBasket.length; i++) { 
        let urlProduct = url + storageBasket[i].id;

        fetch(urlProduct) .then(function(response) {
            return response.json();
        })
        
        .then(function(dataBasket) {

            //On affiche la ligne correspondante au tableau des résultats
                resultBasketContainer += `
                    <tr>
                        <td>${i}</td>
                        <td>${dataBasket.name}</td>
                        <td>${dataBasket.price}</td>
                        <td>${storageBasket[i].option}</td>
                        <td>${storageBasket[i].quantity}</td>
                        <td>Action</td>
                    </tr>
                `;
        })

        .catch(error => {
            console.log(error);
        });
    }

    resultBasketContainer += `</tbody></table>`;

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