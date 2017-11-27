//etape 1 : recuperer fichier json


//CREATION D'UN TABLEAU CONTENANT TOUS LES UTILISATEURS
var utilisateurs = [];

//Variable pour savoir si un utlisateur est connecté
var estConnecte = false;

//création d'un prototype utilisateurs
var utilisateur = {
    //initialiser l'utilisateurs
    initialiser : function(mail, password, pseudo) {
        this.mail = mail;
        this.password = password;
        this.pseudo = pseudo;
    },
    //ajouter cet utilisateur dans le tableau
    ajouter : function() {
        utilisateurs.push(this);
    }
};

//Charger tous les utilisateurs présents dans le fichier json pour les ajouter dans le tableau
$(document).ready(function ($) {
    $.post(
        'json/utilisateurs.json',//lien fichier json
        function(data){ //recupere le json et le stocker dand un tableau
            var i = 0;
            while ( i < data.user.length) {
                var util = Object.create(utilisateur);
                util.initialiser(data.user[i].email, data.user[i].mdp, data.user[i].identifiant);//rempli son email...
                util.ajouter(); //push dans le tableau
                console.log(data.user[i]);//verification fonctionnement
                i++;
            }
        },
        'json'
    );
});

console.log(utilisateurs);

//Verifier l'email et le mot de passe
var verifierSiDejaEnregistre = function(nouvMail, nouvPseudo){
    retour = false;
    utilisateurs.forEach(function(unDesUtilisateurs){
        if ((nouvMail == unDesUtilisateurs.mail) || (nouvPseudo == unDesUtilisateurs.pseudo))
        {
            retour=true;
        }
    });
    return retour;
};

//Créer un utilisateur lors d'une inscription via le formulaire
var creer = function(nouvMail, nouvPseudo, nouvPassword) {
//creation d'un nouveau utilisateur
    var nouvelUtilisateur = Object.create(utilisateur);
    nouvelUtilisateur.initialiser(nouvMail, nouvPassword, nouvPseudo);
    nouvelUtilisateur.ajouter();
    utilisateurs.forEach(function(user){
        console.log(user);
    });
};

//verifier si l'utilisateur existe déjà dans la base de données
var existe = function(identifiant, pass){
    var retour = false;
	utilisateurs.forEach(function(user)
	 {
		if (((user.mail == identifiant)||(user.pseudo == identifiant)) && (user.password == pass)) 
		{
            retour = true;
        }
    });
	return retour;
};

//Vérifie que tous les champs sont remplis
var informationValide = function(identifiant, pass){
    if(identifiant == ""){
        return false;
    }
    if(pass == ""){
        return false;
    }
    return true;
}

/*//verifie les parametre et regarde si un utilisateur existe
var utilisateurSaisieEstValide = function(identifiant, pass){

    if(informationValide(identifiant, pass) == false){
        return false;
    }
    if(existe(identifiant, pass) == false){
        return false;
    }
    estConnecte = true;
    return true;
}*/

var utilisateurEstConnecte = function() {
    return estConnecte;
}

var deconnecteUtilisateur = function() {
    estConnecte = false;
}

var connecteUtilisateur = function(){
    estConnecte = true;
}
