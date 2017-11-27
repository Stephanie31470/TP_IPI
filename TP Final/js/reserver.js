var personne = 0;
var duree = 0;
var lieu = "";
var chambre = 0;
var tarifAssu = 33;
var assurance = "";
var total=0;
var pension = 0;




var calculTarif = function(){
total=0;

var temp = document.getElementById("lieu");
lieu = temp.options[temp.selectedIndex].value;
console.log(lieu);

temp = document.getElementById("personne");
personne = temp.value;
console.log(personne);

temp = document.getElementById("chambre");
chambre = temp.value;
console.log(chambre);

temp = document.getElementById("duree");
duree = temp.options[temp.selectedIndex].value;
console.log(duree);

temp = document.getElementById("assurance");
assurance = temp.options[temp.selectedIndex].value;
console.log(assurance);

temp = document.getElementById("pension");
pension= temp.options[temp.selectedIndex].value;

var voyages = tousLesVoyages();
console.log(voyages);

voyages.forEach(function(voyage){
	if (lieu==voyage.nom) {
		var tarif = voyage.tarif_nuit;
		total += personne*tarif*duree*chambre;
		if (assurance=="oui"){
			total += voyage.tarif_assu;
		}
		if (pension=1){
			total += voyage.tarif_demi_p*personne*duree;
		} else {
			total +=  voyage.tarif_complet;
		}
	console.log(total);
	
	}
});

	document.getElementById("totalTTC").style.display="";
	document.getElementById("coutTTC").style.display="";
	document.getElementById("coutTTC").innerHTML=total;

};

var envoyerDemande = function(){
	var temp = document.getElementById("lieu");
	temp.selectedIndex=0;
	temp = document.getElementById("personne");
	temp.value= 1;
	temp = document.getElementById("chambre");
	temp.value=1;
	temp = document.getElementById("duree");
	temp.options[temp.selectedIndex].value=0;
	temp = document.getElementById("assurance");
	temp.selectedIndex=0;
	temp = document.getElementById("pension");
	temp.selectedIndex=0;
	document.getElementById("form_reserv").style.display="none";
	document.getElementById("btnCalculer").style.display="none";
	document.getElementById("coutTTC").style.display="none";
	document.getElementById("confirmationDemande").style.display="";
}


