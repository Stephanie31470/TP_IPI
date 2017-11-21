$(document).ready(function ($) {

window.MyApp = window.MyApp || {};

//gestion des différents panneaux de présentation des voyages
var onglets = $('#onglets li a');

onglets.click(function(e) {
    var link = $(this);
    onglets.removeClass('active').css("background-color", "#ffffff").css("color", "#337ab7");
    link.addClass('active').css("background-color" , "#337ab7").css("color","#ffffff");
    var idPanneau = link.data('panneau-id');
    $('.panneau').hide();
    $('#' + idPanneau).show();
});

//Gestion du menu de connexion et d'inscription
//Affiche le menu lorsque l'utilisateur clique sur le bouton

var login = $('#login');
login.click(function(e) {
    var link =$(this);
    var idPanneau = link.data('panneau-id');
    $('.panneau').hide();
    $('#form_login').show();
});

//Formulaire de contact
//Lorsque l'utisateur clique sur le bouton, un message de confirmation apparait en place et lieu du formulaire
$('#form_contact').submit(function(e) {
    // On empêche la soumission du formulaire à un serveur
    e.preventDefault();
    // On sauvegarde la référence au formulaire car on va s'en servir plusieurs fois
    var form = $(this);
    // Encore un sélecteur: input avec attribut ayant la valeur demandée
    var inputEmail = form.find('input[id="email-contact"]');
    var email = inputEmail.val();

    var message = $('#message').val();
    console.log(email);
    console.log(message);

  // Vérification de l'email avec un regex
  //Si ne match pas, alors on affiche l'erreur
    var re =  /^[A-Za-z][A-Za-z0-9_\.]+@[A-Za-z][A-Za-z0-9_\.]+\.[a-z]{2,}$/;
    if(! email.match(re)) {
        inputEmail.css('border', '1px solid red');
        form.find('input[id="email-contact"] + div').show();
    }
    // Sinon, on affiche la div prévue pour
    else {
        $('#next_submit').show();
        $('#form_conteneur').hide();
        form.find('input[id="email-contact"] + div').hide();
    }
});


//Gestionnaire des onglets d'inscription ou de log in
var tab = $('#tab li a');
tab.click(function(e) {
    var link = $(this);
    tab.removeClass('active');
    link.addClass('active');
    var idTab = link.data('tab-id');
    $('.tab').hide();
    $('#' + idTab).show();
});

//Validation du champ identifiant
$('#register-username').change(function(e){
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

//Validation du champ email

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

//Validation du champ password

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


$('#form-register').submit(function(e) {
    // On empêche la soumission du formulaire à un serveur
    e.preventDefault();
    // On sauvegarde la référence au formulaire car on va s'en servir plusieurs fois
    var form = $(this);

    var inputId = form.find('input[id="register-username"]');
    var id = inputId.val();
    console.log(id);

    // Encore un sélecteur: input avec attribut ayant la valeur demandée
    var inputEmail = form.find('input[id="register-email"]');
    var email = inputEmail.val();
    console.log(email);

    var inputPwd = form.find('input[id="register-password"]');
    var Pwd = inputPwd.val();
    console.log(Pwd);

});


$('#form-login').submit(function(e) {


    var identifier = $('#login-identifier').val();
    var password   = $('#login-password').val();
    console.log(identifier);
    console.log(password);
    var user = {
        identifier: identifier,
        password: password
    };
    var userJSON = JSON.stringify(user);

    e.preventDefault();

    $(this).find('input').val('');

    $.post(
        'json/utilisateurs.json',
        userJSON,
        function(data){
            var i = 0;
            while ( i < data.user.length) {
                console.log(userJSON.identifier, userJSON.password, data.user[i], i, data.user.length);
                if (userJSON.identifier == data.user[i].email && userJSON.password == data.user[i].mdp) {
                    MyApp.alert('success', "Vous êtes authentifié" + data.user[i].identifiant);
                    break;
                } else if (i == data.user.length -1) {
                    if (userJSON.identifier == "" || userJSON.password == "") {
                        MyApp.alert('danger', "Veuillez saisir tous les champs");
                    } else {
                        MyApp.alert('danger', "Nous ne parvenons pas à vous identifier");
                    }
                }
                i++;}
            },
        'json'
        );
        
});

           
                       







});

