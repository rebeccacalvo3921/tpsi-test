"use strict";

const lstCifra1 = document.getElementById("lstCifra1");
const lstCifra2 = document.getElementById("lstCifra2");
const lstFattore = document.getElementById("lstFattore");
const lstTolleranza = document.getElementById("lstTolleranza");
const txtRisultato = document.getElementById("txtRisultato");

const colori = ["Argento", "Oro", "Nero", "Marrone", "Rosso", "Arancio", "Giallo",
    "Verde", "Blu", "Viola", "Grigio", "Bianco"];
const colTolleranze = ["Argento", "Oro", "Marrone", "Rosso", "Verde", "Blu", "Viola"]
const valTolleranze = ["10", "5", "1", "2", "0.5", "0.25", "0.1"];

inizializza();

function inizializza() {
    for (let i = 0; i < colori.length; i++) {
        let option1 = new Option(colori[i], i - 2);
        let option2 = new Option(colori[i], i - 2);
        let option3 = new Option(colori[i], i - 2);
        option1.disabled = option2.disabled = i < 2;
        option3.disabled = i >= colori.length - 2;
        lstCifra1.add(option1);
        lstCifra2.add(option2);
        lstFattore.add(option3);
    }

    for (let i = 0; i < colTolleranze.length; i++) {
        let option = new Option(colTolleranze[i], valTolleranze[i]);
        lstTolleranza.add(option);
    }

    lstCifra1.selectedIndex = -1;
    lstCifra2.selectedIndex = -1;
    lstFattore.selectedIndex = -1;
    lstTolleranza.selectedIndex = -1;
}

function calcola() {
    if (lstCifra1.value == "" || lstCifra2.value == "" || lstFattore.value == "" || lstTolleranza.value == "") {
        //alert("Devi selezionare tutti i valori!")        
        txtRisultato.textContent = "Devi selezionare tutti i valori!";
    }
    else {
        let valore = Number(lstCifra1.value + lstCifra2.value);
        //console.log(valore);
        let fattore = Math.pow(10, Number(lstFattore.value));
        console.log(fattore);
        let risultato = valore * fattore;
        let tolleranza = lstTolleranza.value;
        //let risToPrint =  `${risultato} ohm &plusmn; ${tolleranza}%`
        //txtRisultato.innerHTML = risToPrint; entrambi i codici sono giusti, il primo modo di rappresentare il ± è in html, quindi bisogna mettere innerHTML in modo che riesca a leggerlo come html e non come txtContent
        let risToPrint =  `${risultato} ohm ± ${tolleranza}%` // entrambi i codici sono giusti, il secondo modo si fa da tastiera, premendo il tasto alt e digitando il codice 0177 sul tastierino numerico
        txtRisultato.textContent = risToPrint;
    }
}