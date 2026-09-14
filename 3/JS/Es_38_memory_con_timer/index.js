"use strict"

// Riferimenti agli elementi DOM
let selectDimensione, btnAvvia, wrapper, spanMinuti, spanSecondi;

// Variabili di stato del gioco
let timerInterval = null;
let secondiTrascorsi = 0;
let primaCellaSelezionata = null;
let secondaCellaSelezionata = null;
let coppieIndovinate = 0;
let totaleCoppie = 0;
let staControllando = false; // Flag per disabilitare i click durante il delay di 0.5s

// Inizializzazione al caricamento della pagina
window.onload = function() {
    selectDimensione = document.querySelector("select");
    btnAvvia = document.querySelector(".container button");
    wrapper = document.getElementById("wrapper");
    spanMinuti = document.getElementById("minuti");
    spanSecondi = document.getElementById("secondi");

    btnAvvia.addEventListener("click", avviaGioco);
}

function avviaGioco() {
    // Reset dello stato precedente
    clearInterval(timerInterval);
    secondiTrascorsi = 0;
    spanMinuti.innerText = "00";
    spanSecondi.innerText = "00";
    primaCellaSelezionata = null;
    secondaCellaSelezionata = null;
    coppieIndovinate = 0;
    staControllando = false;
    wrapper.innerHTML = "";

    // Acquisizione dimensione (4 per 4x4, 6 per 6x6)
    let dimensione = parseInt(selectDimensione.value);
    let totaleCelle = dimensione * dimensione;
    totaleCoppie = totaleCelle / 2;

    // Aggiornamento dinamico delle dimensioni del wrapper (cella 50px + margin 2px per lato = 54px a cella)
    let dimensioneWrapper = dimensione * 54;
    wrapper.style.width = dimensioneWrapper + "px";
    wrapper.style.height = dimensioneWrapper + "px";

    // Generazione del vettore delle coppie (es. per 6x6 -> due 1, due 2, ..., due 18)
    let numeri = [];
    for (let i = 1; i <= totaleCoppie; i++) {
        numeri.push(i);
        numeri.push(i);
    }

    // Mescolamento casuale dell'array utilizzando la funzione generaNumero fornita
    for (let i = numeri.length - 1; i > 0; i--) {
        let j = generaNumero(0, i + 1);
        let temp = numeri[i];
        numeri[i] = numeri[j];
        numeri[j] = temp;
    }

    // Creazione dinamica dei pulsanti (celle) nella griglia
    for (let i = 0; i < totaleCelle; i++) {
        let cella = document.createElement("button");
        cella.classList.add("cella");
        cella.innerText = numeri[i];
        
        // Stato iniziale nascosto: sfondo e testo dello stesso colore grigio (#CCC ripreso dal css)
        cella.style.backgroundColor = "#CCC";
        cella.style.color = "#CCC";
        
        // Salviamo il valore anche in una proprietà personalizzata per sicurezza
        cella.dataset.valore = numeri[i];

        cella.addEventListener("click", gestisciClickCella);
        wrapper.appendChild(cella);
    }

    // Avvio del Timer di gioco
    timerInterval = setInterval(aggiornaTimer, 1000);
}

function gestisciClickCella(event) {
    let cellaCliccata = event.currentTarget;

    // Impedisci il click se stiamo aspettando il timeout, se la cella è già indovinata (blu) 
    // o se si clicca due volte consecutive sulla stessa identica cella aperta
    if (staControllando || cellaCliccata.style.backgroundColor === "blue" || cellaCliccata === primaCellaSelezionata) {
        return;
    }

    // "Scopri" la cella applicando sfondo rosso e testo bianco
    cellaCliccata.style.backgroundColor = "red";
    cellaCliccata.style.color = "white";

    if (!primaCellaSelezionata) {
        // È il primo click della coppia
        primaCellaSelezionata = cellaCliccata;
    } else {
        // È il secondo click della coppia
        secondaCellaSelezionata = cellaCliccata;
        staControllando = true; // Blocca ulteriori click durante il controllo

        // Nota: la traccia menziona "lasciarlo visualizzato per 1/2 secondo" prima del controllo
        setTimeout(controllaCoppia, 500); 
    }
}

function controllaCoppia() {
    let val1 = primaCellaSelezionata.dataset.valore;
    let val2 = secondaCellaSelezionata.dataset.valore;

    if (val1 === val2) {
        // Se sono uguali, vengono "fissati" con lo sfondo blu e testo bianco per rimanere visibili
        primaCellaSelezionata.style.backgroundColor = "blue";
        primaCellaSelezionata.style.color = "white";
        secondaCellaSelezionata.style.backgroundColor = "blue";
        secondaCellaSelezionata.style.color = "white";
        
        coppieIndovinate++;

        // Controllo condizione di vittoria
        if (coppieIndovinate === totaleCoppie) {
            clearInterval(timerInterval);
            // Ritardo minimo per mostrare l'ultimo blocco blu prima dell'alert
            setTimeout(function() {
                alert("Bravo hai vinto!");
            }, 10);
        }
    } else {
        // Se diversi, vengono nuovamente ricoperti (torna il grigio su sfondo e testo)
        primaCellaSelezionata.style.backgroundColor = "#CCC";
        primaCellaSelezionata.style.color = "#CCC";
        secondaCellaSelezionata.style.backgroundColor = "#CCC";
        secondaCellaSelezionata.style.color = "#CCC";
    }

    // Reset delle variabili di selezione e sblocco dei click
    primaCellaSelezionata = null;
    secondaCellaSelezionata = null;
    staControllando = false;
}

function aggiornaTimer() {
    secondiTrascorsi++;
    let minuti = Math.floor(secondiTrascorsi / 60);
    let secondi = secondiTrascorsi % 60;

    spanMinuti.innerText = pad(minuti);
    spanSecondi.innerText = pad(secondi);
}

// Funzioni fornite dalla traccia iniziale
function pad(number) {
    return (number < 10 ? '0' : '') + number;
}

function generaNumero(min, max){
    return Math.floor((max - min) * Math.random() + min);
}