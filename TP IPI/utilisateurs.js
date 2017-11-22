$(document).ready(function ($) {

var utilisateurs = [];

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

var creer = function() {

    var newUser = Object.create(users);

    var nouvMail = $('').val();
    var nouvPassword = document.forms["usersForm"].elements["password"].value;
    var nouvPseudo = document.forms["usersForm"].elements["pseudo"].value;

    newUser.initUser(nouvMail, nouvPassword, nouvPseudo);
                      
    newUser.ajouter();
};

var existe = function(identifiant, pass){
	utilisateurs.forEach(function(user)
	 {
		if (((user.mail == identifiant)||(user.pseudo == identifiant)) && (user.password == pass)) 
		{
            console.log("oui");
            return true;
        } 
        else
        {
        	console.log('non');
        }
    });
	return false;
};

	var connexion valid
else if (user.identifier == "" || user.password == "") {
                        //MyApp.alert('danger', "Veuillez saisir tous les champs");
                    } else {}


});