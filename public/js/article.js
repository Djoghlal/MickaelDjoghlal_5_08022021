//On récupère l'url complète du lien avec l'id à l'intérieur
let url = window.location.href;

//On recherche l'ID dans l'URL récupérée
let id = url.split('?id=');
let idPrivate = id[1];
console.log(idPrivate);

//On appelle l'API pour trouver les informations du nounours avec l'ID correspondant.
let urlPrivate = `http://localhost:3000/api/teddies/${idPrivate}`;

fetch(urlPrivate)
    //On créer la première promesse qui va nous renvoyer la réponse de l'API en objet.
    .then(response => response.json())

    //On créer la 2ème promesse qui nous renvoi les données (data)
    .then(data => {
        //On met un console.log de la réponse, afin d'avoir les descriptions de l'API (dans ce cas l'article correspondant à l'ID)
        console.log(data);

        teddieChoice = `<h1>${data.name}</h1>`;

        //On va séléctionner le conteneur afin d'y afficher le resultat !
        document.querySelector('#articleChoice').innerHTML = teddieChoice;
    })

    .catch(error => {
        console.log(error);
            //Une erreur, on affiche un message dans le container dédié à ça.
            let errorServer = document.querySelector('#event-status');

            errorServer.innerHTML = `<h4 class="alert-heading">Erreur serveur</h4>
            <p>Un problème sur le site est detecté, notre équipe met tout en oeuvre pour le résoudre au plus vite.</p>
            <p>A bientôt sur notre boutique !</p>`;

            errorServer.classList.remove('warning-none'); //On supprime la classe si elle est existante
            errorServer.classList.add('warning-view'); //On ajoute la class qui va afficher l'erreur.

            // On peut à la place de revenir en arrière, mettre un timer pour raffraichir la page.
            // setTimeout(function() { document.location.reload() }, 2000);
    });