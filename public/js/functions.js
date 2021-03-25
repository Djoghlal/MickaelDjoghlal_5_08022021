//Création des variables générales
let url = 'http://localhost:3000/API/teddies/';
let eventContainer = document.querySelector('#event-status');

//Fonction ajouter au panier
function addPanier(data) {
    //On vérifie si une option est bien choisie car elles sont obligatoires
        //On récupère la valuer de l'option
        let optionChoice = document.querySelector('#optionTeddie').value;

        if (optionChoice != "") {
            //La valeur est bien rentrée, on y créer l'objet du teddie
            let teddieChoice = {
                id: data._id,
                name: data.name,
                price: data.price/100,
                option: optionChoice
            }

            //On converti le contenu de la variable en JSON
            teddieChoiceJson = JSON.stringify(teddieChoice);

            //On sauvegarde la valeur dans le localStorage avec id + option
            localStorage.setItem(teddieChoice.id + teddieChoice.option, teddieChoiceJson);

            //On affiche le message du succès...
            eventContainer.classList.replace('warning-none', 'success-view');
            eventContainer.classList.replace('alert-danger', 'alert-success');

            eventContainer.innerHTML = `<h4 class="alert-heading">Succès</h4><p>Votre produit a été ajouté au panier.</p>`;

        } else {
            //Message d'erreur concernant le non renseignement de l'option.
            let optionError = querySelector('#event-status');
            optionError.innerHTML = `<h4 class="alert-heading">Attention</h4><p>Veuillez choisir une option pour votre panier.</p>`;
        }
}

//Fonction pour le total du prix à payer
function prixTotal(data) {
    let total = 0;
    // Récupére la somme des prix
    for (let i = 0; i < data.length ; i++){
        total += Number(data[i].price)/100;
    }
    console.log(total);
};