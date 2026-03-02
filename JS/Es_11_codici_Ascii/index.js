"use strict"

const txtNums = document.getElementsByClassName("txtNum");
const txtStrs = document.getElementsByClassName("txtStr");
const chkRis = document.getElementsByName("chk");
const btnControlla = document.getElementById("btnControlla");
let range=[];

function genera(e){
    range = e.target.value.split('-');//prende il value del target
    let estratti = [];

    while (estratti.length<6) {
        let num = random(parseInt(range[0]),parseInt(range[1]));//trasforma la stringa in int
        if (!estratti.includes(num)){//controlla se il valore passato è già incluso nel vettore
            estratti.push(num);
        }
    }

    for (let i = 0; i < txtNums.length; i++) {
        txtNums[i].value=estratti[i];
    }

    for (let i = 0; i < 6; i++) {
        txtStrs[i].value="";
        chkRis[i].checked=false;
        txtStrs[i].disabled=false;
    }

    btnControlla.disabled=true;
}

function abilita(){
    let cont = 0;
    for (const element of txtStrs) {
        if (element.value!="") {
            cont++;
        }
    }

    if (cont==txtStrs.length) {
        btnControlla.disabled=false;
    }else{
        btnControlla.disabled=true;
    }
}

function check(e){
    let char = e.key.charCodeAt(0);

    if (e.key.length == 1 && (char < range[0] || char > range[1])) {//cosi posso usare anche backspace
        e.preventDefault();
    }
}

function controlla(){
    let cont = 0;

    for (let i = 0; i < 6; i++) {
        let generato = parseInt(txtNums[i].value);
        let inserito = txtStrs[i].value.charCodeAt(0);

        if (inserito==generato) {
            cont++;
            txtStrs[i].disabled=true;
            chkRis[i].checked=true;
        }else{
            chkRis[i].checked=false;
        }
    }

    if (cont == 6) {
        alert("Hai vinto");
    }else{
        alert("Riprova");
    }
}

function random(min,max){
    // Math.random genera un numero casuale con la virgola tra 0 (compreso) e 1 (escluso)
    let n = Math.random() * (max - min) + min    //risulato = min compreso e max escluso
    // Math.floor arrotonda abbattendo (toglie la virgola)
    return Math.floor(n)
}