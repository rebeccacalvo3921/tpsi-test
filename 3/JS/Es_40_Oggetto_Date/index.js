"use strict";

let txtData1 = document.getElementById("txtData1");
let txtData2 = document.getElementById("txtData2");
let button = document.getElementsByTagName("button")[0];
let log = document.getElementById("log");

let dataCorrente = new Date()


let stDataCorrente1 = dataCorrente.toISOString().substring(0, 10);
let stDataCorrente2 = dataCorrente.toISOString().substring(0, 16);

//txtData1.value = stDataCorrente1;
//txtData2.value = stDataCorrente2;
txtData1.valueAsDate = dataCorrente; // value as date funziona solo con gli oggetti date e non date time ( se provassimo con il txtData2 non funzionerebbe perché ha pure il time)

let dataCorrenteLocale = rimuoviOffest(dataCorrente); // per mettere l'ora locale dato che noi siamo due ore avanti rispetto al meridiano di Greenwich
txtData2.value = dataCorrenteLocale.toISOString().substring(0, 16);


function rimuoviOffest(d) {
	const offset = d.getTimezoneOffset(); //restituisce i minuti, in Italia oggi, in giugno, restituisce -120 (offset in minuti ora legale)
	return new Date(d.getTime() - (offset * 60 * 1000))
}

button.addEventListener("click", function () {
	log.innerHTML = ""

	// 1 semplice value
	log.innerHTML += txtData1.value + "<br>"
	log.innerHTML += txtData2.value + "<br><br>"

	let data1 = new Date(txtData1.value);
	let data2 = new Date(txtData2.value);
	// 2 serializzazione tramite il metodo .toString()
	log.innerHTML += data1.toString() + "<br>"
	log.innerHTML += data2 + "<br><br>"
	
	// 3 serializzazione tramite il metodo .toISOString()
	log.innerHTML += data1.toISOString() + "<br>"
	log.innerHTML += data2.toISOString() + "<br><br>"
	
	// 4 serializzazione tramite il metodo .toLocaleString()
	log.innerHTML += data1.toLocaleString() + "<br>"
	log.innerHTML += data2.toLocaleString() + "<br><br>"
	
	// 5 serializzazione tramite il metodo .toLocaleDateString()
	log.innerHTML += data1.toLocaleDateString() + "<br>"
	log.innerHTML += data2.toLocaleDateString() + "<br><br>"
	
	// 6 serializzazione tramite il metodo .toLocaleTimeString()
	log.innerHTML += data1.toLocaleTimeString() + "<br>"
	log.innerHTML += data2.toLocaleTimeString() + "<br><br>"
	
	// 7 serializzazione tramite il metodo .getTime() che ci da i millisecondi trascorsi dal 1/1/1970 ora 00:00
	log.innerHTML += data1.getTime() + "<br>"
	log.innerHTML += data2.getTime() + "<br><br>"

})

