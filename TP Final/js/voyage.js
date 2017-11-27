(function() {
  var app = angular.module('tripStore', []);

  var voyages = [];

app.controller('tripstore', function(){
    this.Moproducts = montagnes;
    this.Meproducts = mers;
    this.Etproducts = etrangers;
  });

this.tousLesVoyages = function(){
	return(voyages);
}

app.controller('searchCtrl', function(){

	var wifi;
	var bar;
	var service;
	var restaurant;
	var budget;
	var destination;
	var nspp = "Ne se prononce pas";
	var undef = "? undefined:undefined ?";
	this.resultats = [];
	var concat1 = montagnes.concat(mers);
	voyages = concat1.concat(etrangers);

  	this.produits = voyages;
  	console.log(this.produits);

	this.rechercher = function() {

		resultats = [];

		var select = document.getElementById("destination");
		destination = select.options[select.selectedIndex].value;

		select = document.getElementById("wifi");
		wifi = select.options[select.selectedIndex].value;

		select = document.getElementById("bar");
		bar = select.options[select.selectedIndex].value;

		select = document.getElementById("service");
		service = select.options[select.selectedIndex].value;
		
		select = document.getElementById("budget");
		budget = select.options[select.selectedIndex].value;

		select = document.getElementById("restaurant");
		restaurant = select.options[select.selectedIndex].value;

		console.log("destination : " + destination, "- wifi : " + wifi , "- bar : " + bar, "- service : " + service, "- budget : " + budget, "- restaurant : " + restaurant);

		var compte = compter();
		console.log(compte);

		if (compte < 2) {
			var erreur = document.getElementById("errRech");
			erreur.style.visibility="visible";
			return; 
		} else {
			var erreur = document.getElementById("errRech");
			erreur.style.visibility="hidden";
		};
		comparer();
		afficher();
	};

	function comparer(){
		//Compare les caractéristiques de chaque voyage avec les critères souhaités par l'utilisateur.
		angular.forEach(voyages, function(voyage){

			if ((destination!=nspp)&&(destination!=undef)) {
				if((destination != voyage.type)){
					return;
				}
			}

			if ((wifi!=nspp)&&(wifi!=undef)){
				if ((wifi!=voyage.wifi)){
					return;
				}
			}

			if ((bar!=nspp)&&(bar!=undef)){
				if (bar=="oui") {
					if (voyage.nb_Bars==0) {
						return;
					}
				} else if (bar == "non") {
					if (voyage.nb_Bars!=0) {
						return;
					}
				}
			}

			if((service!=nspp)&&(service!=undef)){
				if (service!=voyage.serv_Chambre) {
					return;
				}
			}

			if ((restaurant!=nspp)&&(restaurant!=undef)){
				if (restaurant=="oui") {
					if (voyage.nb_restau==0) {
						return;
					}
				} else if (restaurant == "non") {
					if (voyage.nb_restau!=0) {
						return;
					}
				}
			}

			if ((budget!=nspp)&&(budget!=undef)){
				if(budget=="inf800"){
					if(voyage.prix_min>800){
						return;
					} 
				} else if (budget=="sup801"){
					if(voyage.prix_min<800){
						return;
					}
				}
			}

			console.log("Le voyage trouvé est : ");
			console.log(voyage);

			ajouter(voyage);
				
		});

		console.log("Les voyages trouvés sont : ");
		angular.forEach(resultats, function(voyage){
			console.log(voyage);
		});
	};

	function compter() {
		var compteur = 0;
		if ((wifi != undef)&&(wifi != nspp)) {
			compteur += 1;
		console.log(compteur);
		};
		if ((destination != nspp)&&(destination != undef)) {
			compteur += 1;
		console.log(compteur);

		};
		if ((bar != nspp)&&(bar != undef)) {
			compteur += 1;
		console.log(compteur);

		};
		if ((service != nspp)&&(service != undef)) {
			compteur += 1;
		console.log(compteur);

		};
		if ((budget != nspp)&&(budget != undef)) {
			compteur += 1;
		console.log(compteur);

		};
		if ((restaurant != nspp)&&(restaurant != undef)) {
			compteur += 1;
		console.log(compteur);

		};

		return compteur;
	};

	function ajouter(voyage){
		resultats.push(voyage);
	};

});

function afficher(){
	var div = document.getElementById("result");
//Vérifie la longueur du tableau résultat. Si 0 alors erreur
	if(resultats.length == 0) {
		div.style.visibility="hidden";
		var noResults = document.getElementById("noResults").style.visibility="visible";
	}
	else {
		//montre la div contenant le tableau de résultats
		div.style.visibility="visible";
		var noResults = document.getElementById("noResults").style.visibility="hidden";
	}
	//récupère le tableau tabresult de l'html
	var table = document.getElementById("tabresult");

	//le réinitialise au cas où des résultats y sont déjà stockés
	for (var i = table.rows.length - 1; i > 0; i--) {
		table.deleteRow(i);
	}
	//Pour chaque voyage contenu dans le tableau tabresult
	angular.forEach(resultats, function(voyage){
		// Créer une ligne vide
		var row = table.insertRow(table.rows.length);

		// Créer les céllules pour chaque ligne
		var cell = row.insertCell(0);
		cell.innerHTML = voyage.nom;
		cell = row.insertCell(1);
		cell.innerHTML = voyage.prix_min;
		cell = row.insertCell(2);
		cell.innerHTML = voyage.serv_Chambre;
		cell = row.insertCell(3);
		cell.innerHTML = voyage.nb_Bars;
		cell = row.insertCell(4);
		cell.innerHTML = voyage.nb_restau;
		cell = row.insertCell(5);
		cell.innerHTML = voyage.wifi;
		cell = row.insertCell(6);
		cell.innerHTML = voyage.nb_chambre;
		cell = row.insertCell(7);
		cell.innerHTML = "<button class=\"choix btn btn-primary reservation\" type=\"submit\" onclick=\"reserver("+voyage.produit+")\"> Reserver </button>";

	});
};

this.reserver = function(id){

	if (utilisateurEstConnecte()){

		document.getElementById("reservation").style.display="";
		document.getElementById("panneau7").style.display="none";
	} else {
		alert("Veuillez vous connecter ou vous inscrire.");
		redirigerVers("reservation");//stocke la page vers où je dois aller apres m'être inscrite
		document.getElementById("form_login").style.display="";//montre la page d'inscrition
		document.getElementById("panneau7").style.display="none";
	}
	//cache a page ou je suis

}






var montagnes = [
{
produit : 1,
nom : "Les Alpes",
type : "montagne",	
description :"Au coeur du Massif des Ecrins, LES 2 ALPES est une station dynamique et moderne où tout a été conçu pour profiter au maximum des joies du ski et de l'après-ski. La station se divise en 2 quartiers (des navettes relient toute la station) : 2 ALPES 1800, à l'entrée et dominant la station et le Centre, à 1600 m, qui s'étend jusqu'à la Place de Venosc. Du sommet du glacier, le plus grand glacier skiable d'Europe, vous aurez une vue unique sur l'ensemble des Alpes.",
image1 : "image/alpes1.jpeg",
image2 :"image/alpes2.jpeg",
image3 :"image/alpes3.jpg",
wifi : "oui",
serv_Chambre : "non",
nb_Bars : 1,
nb_restau : 1,
nb_chambre : 40,
prix_min : 630,
dim_chambre : 20,

tarif_nuit : 90,
tarif_demi_p : 15,
tarif_complet : 30,
tarif_assu : 75

},

{
produit : 2,	
nom : "Les Pyrénées",
type : "montagne",	
description :"Familles à la recherche d’air pur et d'activités pour les enfants, sportifs amateurs de sensations fortes, seniors en quête de quiétude, ou simples amoureux de la nature, la montagne en été dans les Pyrénées-Orientales met tout le monde d’accord… Amateurs de grands espaces, ne ratez pas l’accès à nos lacs de montagne en télésiège, féérie assurée…",
image1 : "image/pyrenees1.jpg",
image2 :"image/pyrenees2.jpg",
image3 :"image/pyrenees3.jpg",
wifi : "oui",
serv_Chambre : "non",
nb_Bars : 0,
nb_restau : 2,
nb_chambre : 90,
prix_min : 800,
dim_chambre : 30,
tarif_nuit : 114,
tarif_demi_p : 15 ,
tarif_complet : 80,
tarif_assu : 100

}];


var mers = [
{
produit : 3,	
nom : "La Corse",
type : "mer",	
description :"Un merveilleux mélange de trésors naturels, de sites préhistoriques et de richesses architecturales. Elle propose ainsi nature et dépaysement avec les calanche de Piana, la réserve de Scandola, le golfe de Porto, l'Alta Rocca et les aiguilles de Bavella. Détente et activités nautiques avec ses multiples plages de sable et ses fonds marins exceptionnels. Découverte et culture avec la cité médiévale de Bonifacio et ses hautes falaises blanches, le site préhistorique de Filitosa, l'ancienne citadelle génoise de Sartène, et Ajaccio, capitale de la Corse et ville natale de Napoléon.",
image1 : "image/corse1.jpg",
image2 :"image/corse2.jpg",
image3 :"image/corse3.jpg",
wifi : "non",
serv_Chambre : "oui",
nb_Bars : 3,
nb_restau : 2,
nb_chambre : 150,
prix_min : 1200 ,
dim_chambre : 50,
tarif_nuit : 170,
tarif_demi_p : 20 ,
tarif_complet : 100,
tarif_assu : 150 

},

{
produit : 4,	
nom : "La Bretagne",
type : "mer",	
description :"Marchez, naviguez, visitez, dégustez... Vous avez mille et une façons de découvrir notre presqu’île normande. Sur la plage, dans l’eau, à la campagne, profitez de notre terre riche de paysages, de sites et de loisirs. De la baie du Mont Saint-Michel au Cotentin, la diversité des senteurs, des couleurs, des sons et même des saveurs vous fera vivre un moment hors du temps. Ne manquez pas de faire une escale dans les îles, que ce soit Chausey, Tatihou ou les îles anglo-normandes, le dépaysement est assuré !",
image1 : "image/bretagne1.jpg",
image2 :"image/bretagne2.jpg",
image3 :"image/bretagne3.jpg",
wifi : "oui",
serv_Chambre : "oui",
nb_Bars : 0,
nb_restau : 0,
nb_chambre :48,
prix_min : 834,
dim_chambre : 30,
tarif_nuit :119,
tarif_demi_p :12,
tarif_complet : 54,
tarif_assu :54 

},

{
produit : 5,	
nom : "La côte d\'Azur",
type : "mer",	
description :"Partez sur la Côte d’Azur où vous pourrez profiter de l’agréable douceur du climat. Découvrez Port-Grimaud, cité lacustre nommée la « petite Venise provençale », Grasse, la capitale mondiale du parfum, Nice, capitale de la côte d’Azur, Monaco, principauté perchée sur son célèbre rocher, Ramatuelle qui offre un panorama prestigieux face à la baie de Pampelonne, Cannes, la fameuse Croisette et ses palaces et enfin Saint-Tropez, ancien comptoir maritime fondé par les Grecs, qui se trouve au cœur d’un golfe magnifique qui a très vite attiré peintres et écrivains. Vous apprécierez votre hébergement à proximité de la plage de Sainte-Maxime et le panorama prestigieux de cette région.montagnes",
image1 : "image/cotedazur1.jpg",
image2 :"image/cotedazur2.jpg",
image3 :"image/cotedazur3.jpg",
wifi :"non" ,
serv_Chambre : "oui",
nb_Bars : 1,
nb_restau :1,
nb_chambre : 64,
prix_min : 938,
dim_chambre : 44,
tarif_nuit :134,
tarif_demi_p :8,
tarif_complet :43,
tarif_assu : 25
}

];

var etrangers = [
{
produit : 6,	
nom : "L'Asie",
type : "étranger",	
description :"L'Asie, un voyage inoubliable Plus grand continent du monde, l’Asie s’étend jusqu’aux frontières de l’Europe, de l’Amérique, de l'Afrique et de l’Océanie. Elle est marquée par la diversité de ses paysages, de ses cultures et de ses religions. Des temples d'Angkor aux palais des maharajahs, des sommets de l'Himalaya aux plages de Bali, de nombreux trésors vous attendent... Êtes-vous prêt pour votre voyage en Asie?",
image1 : "image/asie1.jpg",
image2 :"image/asie2.jpg",
image3 :"image/asie3.jpg",
wifi : "oui",
serv_Chambre :"oui" ,
nb_Bars :3,
nb_restau : 1,
nb_chambre : 1,
prix_min : 965,
dim_chambre : 47,
tarif_nuit : 137,
tarif_demi_p : 15,
tarif_complet :65,
tarif_assu :52

},

{
produit : 7,	
nom : "L'île Maurice",
type : "étranger",	
description :"Partez pour votre plus belle aventure créole et laissez-vous guider par la gentillesse des Mauriciens sur cette île préservée. Des paysages luxuriants aux infinies plages paradisiaques, votre séjour tout compris sur l’île Maurice révèle des merveilles insoupçonnées. Au Sud de l’île, Chamarel, « Terre des Sept Couleurs », est aussi splendide que surprenante : une cascade grandiose en arrière-plan, la clairière dévoile ses sols bosselés et multicolores, teintés d’ocre et de marron, de rouge et de violacé. Plus au Nord, à 20min de votre resort La Pointe aux Canonniers, le SSR Botanic Garden, jardin botanique de 37ha, vous attend à Pamplemousse avec ses dizaines de variétés de palmiers, ses étangs et une étonnante collection de nénuphars. A 1h de là et de vos resorts Club Med La Plantation d’Albion et Les Villas d'Albion, se découvre une autre merveille de l’île : eau translucide, cocotiers et plage de sable fin en plein océan Indien, l’île aux Cerfs embrasse le plus grand lagon de l'île Maurice.",
image1 : "image/iles1.jpg",
image2 :"image/iles2.jpg",
image3 :"image/iles3.jpeg",
wifi :"non" ,
serv_Chambre : "non",
nb_Bars : 0 ,
nb_restau : 0,
nb_chambre : 39,
prix_min : 562,
dim_chambre : 28,
tarif_nuit :80,
tarif_demi_p : 6,
tarif_complet : 43,
tarif_assu : 49

},

{
produit : 8,	
nom : "Las Vegas",
type : "étranger",	
description :"Connue partout dans le monde comme étant le lieu de prédilection en matière de jeux, Las Vegas a acquis ce privilège grâce aux lois de l'état du Nevada régissant les jeux d'argent. Ainsi, cette ville implantée au milieu du désert est l'un des faire-valoir des États-Unis, portée par la réputation de ses revues et de ses salles de casino. Ville de la démesure, c'est aussi une ville courue des accros au shopping, friands de ces centres commerciaux imposants notamment le Fashion Show Mall qui se trouve sur l'un des boulevards emblématiques de la ville : le Strip boulevard. Entre paillettes et shows à gogos, cette ville aux mille lumières vit totalement à l'heure des casinos, des spectacles et du jeu. Hôtels et casinos rivalisent de talents pour offrir les meilleurs spectacles et les joueurs venus de tous les coins du monde s'emparent des salles de jeu en remontant le Strip Boulevard.",
image1 : "image/vegas1.jpg",
image2 :"image/vegas2.jpg",
image3 :"image/vegas3.jpg",
wifi : "oui",
serv_Chambre : "non",
nb_Bars :0,
nb_restau :2,
nb_chambre :48,
prix_min : 812,
dim_chambre : 31,
tarif_nuit : 116,
tarif_demi_p : 12,
tarif_complet :51,
tarif_assu :39 

}

];

})();