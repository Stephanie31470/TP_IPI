$(document).ready(function(){


//GESTION DES PANNEAUX PRINCIPAUX
var onglets = $('#onglets li a');
onglets.click(function(e) {
    var link = $(this);
    onglets.removeClass('active').css("background-color", "#e5e5e5").css("color", "#337ab7");
    link.addClass('active').css("background-color" , "#337ab7").css("color","#ffffff");
    var idPanneau = link.data('panneau-id');
    $('.panneau').hide();
    $('#' + idPanneau).show();
});

//GESTION DU PANNEAUX DE CONNEXION
var login = $('#login');
login.click(function(e) {
    var link =$(this);
    var idPanneau = link.data('panneau-id');
    $('.panneau').hide();
    $('#form_login').show();
});

var unlog = $('#unlogin');
unlog.click(function(e){
    $('#connectionDiv').show();
    $('#deconnectionDiv').hide();
    deconnecteUtilisateur();
});

//GESTION DES PANNEAUX INSCRIPTION ET ENREGISTREMENT
var tab = $('#tab li a');
tab.click(function(e) {
    var link = $(this);
    tab.removeClass('active');
    link.addClass('active');
    var idTab = link.data('tab-id');
    $('.tab').hide();
    $('#' + idTab).show();
});



//VALIDATION DU FORMULAIRE DE CONTACT
$('#form_contact').submit(function(e) {
    // On empêche la soumission du formulaire à un serveur
    e.preventDefault();
    // On sauvegarde la référence au formulaire car on va s'en servir plusieurs fois
    var form = $(this);
    // Encore un sélecteur: input avec attribut ayant la valeur demandée
    var inputEmail = form.find('input[id="mail_contact"]');
    var email = inputEmail.val();
    var message = $('#message').val();
  // Vérification de l'email avec un regex
  //Si ne match pas ou si le message est vide alors on affiche l'erreur
    var re =  /^[A-Za-z][A-Za-z0-9_\.]+@[A-Za-z][A-Za-z0-9_\.]+\.[a-z]{2,}$/;
    if(! email.match(re)) {
        inputEmail.css('border', '1px solid red');
        form.find('input[id="mail_contact"] + div').show();
    } else if (message == "") {
    	$("#message").css('border', '1px solid red');
    	form.find('#message + div').show();
    }
    // Sinon, on affiche la div prévue pour
    else {
        $('#confirmation_envoi').show();
        $('#form_contact').hide();
        form.find('input[id="mail_contact"] + div').hide();
        console.log(email);
    	console.log(message);
    }
});

//VALIDATION DES CHAMPS DU FORMULAIRE D'INSCRIPTION
//-->Validation du champ identifiant
$('#nickname').change(function(e){
    var username = $(this);
    var id = username.val();
    var re = /^[A-Za-z][A-Za-z0-9_]+$/;
    if(! id.match(re)){
        username.css('border', '5px solid red');
        $('#wrongUsername').show();
        $('#register').hide();
    } else { 
        username.css('border', '');
        $('#wrongUsername').hide();
        $('#register').show();
    }
});

//-->Validation du champ email
$('#register-email').change(function(e){
    var mail = $(this);
    var email = mail.val();
    var re = /^[A-Za-z][A-Za-z0-9_\.]+@[A-Za-z][A-Za-z0-9_\.]+\.[a-z]{2,}$/;
    if(! email.match(re)){
        mail.css('border', '5px solid red');
        $('#wrongEmail').show();
        $('#register').hide();
    } else { 
        mail.css('border', '');
        $('#wrongEmail').hide();
        $('#register').show();
    }
});

//-->Validation du champ password
$('#register-password').change(function(e){
    var pwd = $(this);
    var password = pwd.val();
    var re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/;
    if(! password.match(re)){
        pwd.css('border', '5px solid red');
        $('#wrongPwd').show();
        $('#register').hide();
    } else { 
        pwd.css('border', '');
        $('#wrongPwd').hide();
        $('#register').show();
    }
});

//SOUMISSION DU FORMULAIRE D'INSCRIPTION
$('#form-register').submit(function(e) {
    // On empêche la soumission du formulaire à un serveur
    e.preventDefault();

    if(creer())
    {
        $('#alreadyUseEmail').hide();
        alert("Vous êtes maintenant enregistré ...");
        $(this).find('input').val('');
    }
    else
    {
        $('#alreadyUseEmail').show();
    }

});

$('#form-login').submit(function(e) {
    e.preventDefault();

    var identifier = $('#login-identifier').val();
    var password   = $('#login-password').val();

    
    if(utilisateurSaisieEstValide(identifier, password))
    {
        $('#wrongLoggin').hide();
        $('#connectionDiv').hide();
        $('#deconnectionDiv').show();
        alert("Vous êtes maintenant connecté ...");
        $(this).find('input').val('');
    }
    else
    {
        $('#wrongLoggin').show();
    }
    
});

});

