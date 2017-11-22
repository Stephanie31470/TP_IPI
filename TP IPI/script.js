/*var usersList = [];

var users = {
    initUser : function(pseudo, email, password) {
        this.pseudo = pseudo;
        this.mail = mail;
        this.password = password;
    },
    
    decrire : function() {
        var description = "Ce contact est " + this.pseudo + " son email est "+ this.mail + " et son mdp est " + this.password;
        return description;
    },
    
    ajouter : function(pseudo, mail, password) {
        this.initUser(pseudo, mail, password);
        usersList.push(this);
    }
};

var user1 = Object.create(users);
user1.initUser("monpseudo", "monmail@sfr.fr", "monMotdepasse8",);

usersList.push(user1);

var creer = function() {
    var newUser = Object.create(users);
            nouvPseudo = document.forms["usersForm"].elements["pseudo"].value;
            nouvMail = document.forms["usersForm"].elements["mail"].value;
            nouvPassword = document.forms["usersForm"].elements["password"].value;
                      
            newUser.ajouter( nouvPseudo, nouvMail, nouvPassword);
};

var describe = function() {
            usersList.forEach(function(user) {
                console.log(user.decrire());
        });
}*/