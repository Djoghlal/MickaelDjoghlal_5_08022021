//On commence à créer le tableau pour afficher le contenu du panier
let tabTeddies = `
<table class="table table-hover">
    <thead>
        <tr>
            <th scope="col">#</th>
            <th scope="col">Nom du produit</th>
            <th scope="col">Option</th>
            <th scope="col">Prix TTC</th>
            <th scope="col">Action</th>
        </tr>
    </thead>
    <tbody>
`;

//On récupère le contenu du localStorage grâce à une boucle et key.
for (let i = 0; i < localStorage.length; i++) {
    let teddieListJson = localStorage.getItem(localStorage.key(i));
    let teddieListConvert = JSON.parse(teddieListJson);

    //On créer l'intérieur du tableau
    tabTeddies += `
    <tr>
        <th scope="row">${i}</th>
        <td>${teddieListConvert.name}</td>
        <td>${teddieListConvert.option}</td>
        <td>${teddieListConvert.price}€</td>
        <td><button type="button" class="btn btn-danger">Supprimer le produit</button></td>
    </tr>
    `;    
 }

 prixTotal();

 tabTeddies += `
        <tr>
            <th scope="col"></th>
            <th colspan="2">Prix total à payer:</th>
            <td scope="col"></td>
        </tr>
    </tbody>
</table>
 `;

 //On insère le tableau dans le container de la page
 let panierContainer = document.querySelector('#panier-container').innerHTML = tabTeddies;