//On récupère l'url complète du lien avec l'id à l'intérieur
let url = window.location.href;

//On recherche l'ID dans l'URL récupérée
const id = url.split('?id=');
console.log(id);

//const idProduit = id[1];