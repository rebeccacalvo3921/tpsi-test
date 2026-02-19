"use strict"

const txtInputs = document.getElementsByName("txtNum");
const chkChecks = document.getElementsByName("chkNum");
const btnInvia = document.getElementById("btnInvia");

//const mi impedisce di riassegnare il vettore, non il contenuto delle celle
const numeriSegreti = new Array(5);
generaNumeri();

function generaNumeri() {
    for (let i = 1; i <= 5; i++) {
        let pos;
        do {
            pos = random(0, 5);
        } while (numeriSegreti[pos]);
        numeriSegreti[pos] = i;
    }
    console.log(numeriSegreti);
}

function controllaInput(e) {
    let chPremuto = e.key;

    if (!(chPremuto >= '1' && chPremuto <= '5' || chPremuto == 'Backspace')) {
        e.preventDefault();
    }

    if (!numOk(chPremuto))
        e.preventDefault();
}

// ritorno true se il numero non c'è, altrimenti false
function numOk(ch) {
    for (const txtInput of txtInputs)
        // appena trovo che il carattere è già presente esco con false
        if (txtInput.value == ch) return false;

    // se arrivo qui il carattere non è presente e esco con true
    return true;
}

function eseguiConfronto() {
    if (!inseritiTutti()){
        alert("Devi inserire tutti i numeri!");
        return;
    }

    let conta = 0;
    for (let i = 0; i < txtInputs.length; i++) {
        const txt = txtInputs[i];
        const chk = chkChecks[i];
        if (Number(txt.value) == numeriSegreti[i]) {
            chk.checked = true;
            txt.style.backgroundColor = "green";
            txt.style.color = "white";
            conta++;
        }
    }

    if (conta == 5) {
        btnInvia.disabled = true;
        alert("Hai vinto!");
    }
}

// restituisce true se i campi sono tutti pieni, altrimenti false
function inseritiTutti(){
    for (const txtInput of txtInputs)
        // appena trovo che il carattere non è presente esco con false
        if (!txtInput.value) return false;

    // se arrivo qui sono tutti presenti e esco con true
    return true;
}

function random(min, max) {
    //Math.random fa un numero casuale decimale compreso tra 0 (incluso) e 1 (escluso)
    let n = Math.random() * (max - min) + min;
    //Math.floor arrotonda abbattendo
    return Math.floor(n);
}