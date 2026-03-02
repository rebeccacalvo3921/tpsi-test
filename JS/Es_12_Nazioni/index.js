"use strict"
const txts = document.getElementsByClassName("txt");
const optCitta = document.getElementsByName("optCitta");
const risposte = document.getElementsByName("txtRisposte");
const btnSeleziona = document.getElementById("btnSeleziona");
const btnRispondi = document.getElementById("btnRispondi");
const optNazioni = document.getElementsByName("optNazioni");
const v = new Array(8);
onload();



function onload() {
    for (let i = 0; i < 8; i++) { //legge i textbox nel div1
        v[i] = txts[i].value;
    }
    for (let i = 0; i < 8; i++) {
        let pos
        do {
            pos = random(8, txts.length)
        }
        while (txts[pos].value.trim() != 0)
        txts[pos].value = txts[i].getAttribute("nazione");
    }
    for (let txt of txts)
        txt.readOnly = true;
    
    for(let risp of risposte)
        risp.readOnly = true;
}

function random(min, max) {
    let n = Math.random() * (max - min) + min;
    return Math.floor(n);
}

function seleziona() {
    let pos;
    do {
        pos = random(0, 8);
    }
    while (txts[pos].disabled || txts[pos].value.trim() == 0)
    optCitta[pos].checked = true;
    txts[pos].disabled = true;
}

function controlla() {
    let trovato1 = false, trovato2 = false;
    let pos1, pos2;

    for(let i = 0; i < optCitta.length; i++){
        if(optCitta[i].checked){
            trovato1 = true;
            pos1 = i;
            console.log(optCitta[i].checked);
        }
        if(optNazioni[i].checked){
            trovato2 = true;
            pos2 = i;
            console.log(optNazioni[i].checked)
        }
    }
    if(trovato1 && trovato2){

        if(txts[pos1].getAttribute("nazione") == txts[pos2 + 8].value){
            optCitta[pos1].checked = false;
            optCitta[pos1].disabled = true;
            risposte[pos2].value = txts[pos1].value;
            txts[pos1].value = "";
            txts[pos1].disabled = true;
            txts[pos2 + 8].disabled = true;
            
            let fine = false;
            for(let i = 0; i < risposte.length; i++)
                if(risposte[i].value == "")
                    fine = true;
            if(!fine){
                alert("bravo hai vinto!");
                btnRispondi.disabled = true;
                btnSeleziona.disabled = true;
            }
        }
        else
            alert("risposta sbagliata");
    }
    else
        alert("inserisci la nazione");
    
}
