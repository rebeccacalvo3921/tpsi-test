"use strict";

const chkNum = document.getElementsByName("chkNum");
const txtNum= document.getElementsByName("txtNum");
const txtBanco = document.getElementById("txtBanco");
const btnBanco = document.getElementById("btnBanco");

let numeroBanco = random(1,11);
txtBanco.value = numeroBanco;
let numeroUtente=0;

function visualizza(pos){
    chkNum[pos].disabled = true;
    let numero =random(1, 11);
    txtNum[pos].value = numero;
    numeroUtente+=numero;
    txtUser.value= numeroUtente;
    if(numeroUtente>21){
        alert("HAI PERSO")
        termina()
    }
}


function termina(){
    for(let chk of chkNum){
        chk.disabled = true;
    }
    btnBanco.disabled=true;
}

function random(a, b) {
	return Math.floor((b - a) * Math.random()) + a;
}