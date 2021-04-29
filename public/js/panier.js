//On récupère le contenu du localStorage
const storageBasketJson = window.localStorage.getItem('basketTeddies');

//Si le localStorage n'est pas vide, on traite la liste du contenu.
//Sinon on dit au visiteur que son panier est vide.
if (storageBasketJson != null) {
    //On déclare la fonction getServer qui récupère le JSON
    async function getServer() {
        try {
            let response = await fetch(url);
            let data = await response.json();
            //Le return qui contiendra le résultat du fetch
            return data;
        } catch (error) {
            console.log(error)
        }
    };

    //On récupère les données de l'utilisateur avec la fonction getProduct
    async function getProduct() {
        //On créer la variable server qui contient le contenu du fetch (API)
        let server = await getServer();
        let teddieTempo = '';
        //On récupère le contenu du localStorage converti.
        const storageContainer = JSON.parse(storageBasketJson);

        //On boucle pour récupérer les valeurs par teddies
        storageContainer.forEach(function(storageTeddie) {
            let totalUnite = storageTeddie.quantity * storageContainer.price/100;
            let teddieFinaly = `
                <div class="card-body">
                    <h5 class="card-title">Orico ${storageTeddie.name}</h5>
                    <p class="card-text"><span class="badge badge-success badge-price">${storageTeddie.price/100}€</span></p>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item"><strong>Quantité: </strong>${storageTeddie.quantity}</li>
                    <li class="list-group-item"><strong>Option: </strong>${storageTeddie.option}</li>
                    <li class="list-group-item"><strong>Prix total: </strong>${totalUnite}€</li>
                </ul>
                <div class="card-body">
                    <button type="button" class="btn btn-danger"><i class="fas fa-trash-alt"></i></button>
                </div>
            `;

            teddieTempo += teddieFinaly;
        });
        
        //On sélectionne le contenu final et on affiche dedans ce que nous avons trouvé
        document.querySelector('#panier-container').innerHTML = teddieTempo;
    }

    //On lance maintenant la fonction
    getProduct();

} else {
    document.querySelector('#panier-container').innerHTML += `
    <div class="container-fluid">
        <img alt="None" src="../images/ciao.gif" />
        <p class="text-center lead">Votre panier est vide :'(</p>
    </div>`;
}