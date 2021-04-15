//On récupère le contenu du localStorage
const storageBasket = window.localStorage.getItem('basketTeddies');
let resultBasketContainer = '';

//Si le localStorage n'est pas vide, on traite la liste du contenu.
//Sinon on dit au visiteur que son panier est vide.
if (storageBasket != null) {
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
                    <td>Nom du produit</td>
                    <td>Prix</td>
                    <td>Quantité</td>
                    <td>Option</td>
                    <td>Action</td>
                </tr>
            </tbody>
        </table>
    `;
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