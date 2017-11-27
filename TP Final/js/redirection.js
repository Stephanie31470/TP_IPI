var redirection = "";

//STOCK LE PANNEAU VERS LEQUEL ON DOIT SE REDIRIGER APRES UNE ACTION

var redirigerVers = function(id) {
	if (redirection == "") {
		redirection=id ;
	}
}


//APRES L'ACTION MONTRE LE PANNEAU VERS LEQUEL ON DEVAIT SE DIRIGER
var rediriger = function(id) {
	if (redirection != "") {
		document.getElementById(redirection).style.display="";
		document.getElementById(id).style.display="none";
		redirection = "";
	}

}