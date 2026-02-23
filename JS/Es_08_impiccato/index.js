"use strict";


const nomi =
["Italia", "Lavagna", "Pizza", "Lasagne", "Spiedino", "Ananas", "Gnocchi", "Gorgonzola", "Broccoli", "Mango", "Biscotti", 
	"Giornale", "Carabina", "Affettati", "Lungimirante", "Affaticato", "Effervescente", "Ambulante", "Ambulanza", "Ostetricia"];
const MAX_TENTATIVI=5;

const txtParola=document.getElementById("txtParola")
const txtLettera=document.getElementById("txtLettera")
const btnInvia=document.getElementsByTagName("button")[0]
const img=document.getElementsByTagName("img")[0]

btnInvia.disabled=true

let parolaSegreta=nomi[random(0, nomi.length)].toUpperCase()
console.log(parolaSegreta)

for(let i=0;i<parolaSegreta.length;i++){
	txtParola.value=txtParola.value+"*"
}

function converti(){
	txtLettera.value=txtLettera.value.toUpperCase()
	// if(txtLettera.value.length>0)
	// 	btnInvia.disabled=false
	// else
	// 	btnInvia.disabled=true
	btnInvia.disabled = txtLettera.value.length>0 ? false : true
}

function filtra(event){
	if(!(event.key>="A"&&event.key<="Z" || event.key>="a"&& event.key<="z" || event.key=="Backspace"))
		event.preventDefault()
}

let cont=0
function elabora(){
	
	let lettera=txtLettera.value
	txtLettera.value=""
	
	let aus=txtParola.value
	txtParola.value=""
	let presente=false
	
	for(let i=0;i<parolaSegreta.length;i++){
		//se la lettera inserita è uguale alla lettera corrente nella parola segreta concateno la
		//lettera inserita altrimenti concateno il vecchio valore
		if(lettera==parolaSegreta[i]){
			txtParola.value+=lettera
			presente=true;
		}
		else{
			txtParola.value+=aus[i]
		}
	}
	if(!presente){
		cont++;
		img.src=`img/Fig${cont}.png`
		if(cont==MAX_TENTATIVI){
			alert("HAI PERSO")
			btnInvia.disabled=true
		}
	}
	else{
		if(txtParola.value==parolaSegreta){
			alert("HAI VINTO")
			btnInvia.disabled=true	
		}
	}
}

function random(a, b){
	return Math.floor((b-a)*Math.random()) + a;
}