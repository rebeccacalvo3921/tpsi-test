"use strict"

const txtInputs = document.getElementsByName("txtNum");
const chkChecks = document.getElementsByName("chkNum");
const btInvia = document.getElementById("btnInvia");

const numeriSegreti = new Array(5); //const mi impedisce di modificare una seconda volta il vettore

generaNumeri();

function generaNumeri(){
    for(let i = 1; i<6; i++){
        let pos;
        do{
             pos = random(0, 5);
        }while(numeriSegreti[pos]);
        numeriSegreti[pos] = i;
    }

    console.log(numeriSegreti);
}

function controllaInput(e){
    let chPremuto = e.key;
    if(chPremuto >= '1' && chPremuto <= '5') return;
    if(chPremuto == 'Backspace') return;
    e.preventDefault();
}

function numOk(ch){
    for(const txtInput of txtInputs){
        //appena trovo che un carattere è già presente esco con false
        if(txtInput.value == ch)
            return false;
    }
    // se arrivo qui il carattere no è presente e esco con true;
    return true;
}

function eseguiConfronto(){
    if(!inseritiTutti())
        alert("Devi inserire tutti i numeri")
    let cont = 0;
    for(let i = 0; i < txtInputs.length; i++){
        const txt = txtInputs[i];
        const chk = chkChecks[i];
        if(Number(txt.value) == numeriINseriti[i]){
            chk.checked = true;
            txt.style.backgroundColor = "green";
            txt.style.color = "white";
            cont++;
        }
    }

    if(cont == 5){
        btInvia.disabled = true;
        alert("Hai vinto!");
    }
}

function inseritiTutti(){
    for(const txtInput of txtInputs){
        //appena trovo che un carattere è già presente esco con false
        if(!txtInput.value)
            return false;
    }
    // se arrivo qui il carattere no è presente e esco con true;
    return true;
}

function random(min, max){
    let n = Math.random() * (max - min) + min;
    return Math.floor(n);
}