"use strict";

let nomi =
	["Italia", "Lavagna", "Pizzeria", "Lasagne", "Spiedino", "Ananas", "Gnocchi",
		"Gorgonzola", "Broccoli", "Mango", "Biscotti", "Giornale", "Carabina",
		"Affettati", "Lungimirante", "Affaticato", "Effervescente", "Ambulante",
		"Ambulanza", "Ostetricia"];


let pos = random(0, nomi.length);
let parolaSegreta = nomi[pos].toUpperCase();
const txtCarElements = document.getElementsByName("txtCar");
const chkRisElements = document.getElementsByName("chkRis");
const txtIns = document.getElementById("txtIns");
const btnInvia = document.getElementById("btnInvia");
const txtPunti = document.getElementById("txtPunti");
const btnRisposta = document.getElementById("btnRisposta");


console.log(parolaSegreta);

let punti = 100;


for (const txtCar of txtCarElements) {
	txtCar.readOnly = true;
}

for (const chkRis of chkRisElements) {
	chkRis.checked = false;
	chkRis.disabled = true;
}


for (let i = 0; i < txtCarElements.length; i++) {
	if (i < parolaSegreta.length)
		txtCarElements[i].value = "*";
	else {
		txtCarElements[i].style.display = "none"
		chkRisElements[i].style.display = "none";
	}
}

function filtraLettere(e) {
	if (!(
		(e.key >= "A" && e.key <= "Z") ||
		(e.key >= "a" && e.key <= "z") ||
		e.key == "Backspace" ||
		e.key == "Tab")
	)
		e.preventDefault();
}

function convertiMaiuscolo() {
	txtIns.value = txtIns.value.toUpperCase();
	btnInvia.disabled = txtIns.value.length == 0;
}

function confronta() {
	for (let i = 0; i < parolaSegreta.length; i++) {
		if (txtIns.value == parolaSegreta[i]) {
			txtCarElements[i].value = txtIns.value;
			chkRisElements[i].checked = true;
		}
	}
	txtIns.value = "";
	btnInvia.disabled = true;
	punti -= 5;
}

function rispondi(){
	let p = prompt("Inserisci la risposta: ");
	p= p.toUpperCase();
	if(p== parolaSegreta) {
		alert("Bravo, hai vinto, belin");
		txtIns.disabled = true;
		btnInvia.disabled = true;
		btnRisposta.disabled = true;
	}
	else {
		alert("Cattivo, hai sbagliato...");
		punti -= 10;
	}
}

function random(min, max) {
	//Math.random fa un numero random decimale compreso tra 0 (incluso) e 1 (escluso)
	let n = Math.random() * (max - min) + min;
	//Math.floor arroonda abbattendo
	return Math.floor(n);
}
