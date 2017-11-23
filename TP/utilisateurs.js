var utilisateurs = [];

var estConnecte = false;

var utilisateur = {
    initUser : function(mail, password, pseudo) {
        this.mail = mail;
        this.password = password;
        this.pseudo = pseudo;
    },
    
    ajouter : function() {
        utilisateurs.push(this);
    }
};

$(document).ready(function ($) {
    $.post(
        'json/utilisateurs.json',
        function(data){
            var i = 0;
            while ( i < data.user.length) {
                var util = Object.create(utilisateur);
                util.initUser(data.user[i].email, data.user[i].mdp, data.user[i].identifiant);
                util.ajouter();
                console.log(data.user[i]);
                i++;
            }
        },
        'json'
    );
});

var creer = function() {

    var newUser = Object.create(utilisateur);

    var nouvMail = $('#register-email').val();
    var nouvPseudo = $('#register-username').val();

    if(dejaEnregistre(nouvMail) || dejaEnregistre(nouvPseudo)) {
        return false;
    }

    var nouvPassword = $('#register-password').val();

    newUser.initUser(nouvMail, nouvPassword, nouvPseudo);
                      
    newUser.ajouter();

    return true;
};

var dejaEnregistre = function(identifiant){
    var retour = false;
    utilisateurs.forEach(function(user)
     {
        if ((user.mail == identifiant)||(user.pseudo == identifiant)) 
        {
            retour = true;
        }
    });
    return retour;
};

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

var informationValide = function(identifiant, pass){
    if(identifiant == ""){
        return false;
    }
    if(pass == ""){
        return false;
    }
    return true;
}

var utilisateurSaisieEstValide = function(identifiant, pass){

    if(informationValide(identifiant, pass) == false){
        return false;
    }
    if(existe(identifiant, pass) == false){
        return false;
    }
    estConnecte = true;
    return true;
}

var utilisateurEstConnecte = function() {
    return estConnecte;
}

var deconnecteUtilisateur = function() {
    estConnecte = false;
}

