"use strict"

let numSeg = generaNum(1,101);
let cont = 0;
let txtNum = document.getElementById("txtNumero");
let Msg = document.getElementById("divMessaggio");
let divTentativi = document.getElementById("divTentativi");
let btnGioca = document.getElementById("btnGioca");

function gioca(){
    
    cont++;
    divTentativi.textContent = cont;
    let n = parseInt(txtNum.value);
    if(n < numSeg){
        Msg.innerHTML += `il numero inserito ${n} è troppo PICCOLO </br>`;
    }
    else if(n > numSeg){
        Msg.innerHTML += `il numero inserito ${n} è troppo GRANDE </br>`;
    }
    else if (n == NumSeg){
        Msg.innerHTML += `Hai indovinato il numero era ${NumSeg} </br>`; //back tick ALT+96
    }
    else{
        Msg.innerHTML += "inserisci un numero valido </br>";
    }
    
    if(conta >= 10 && n!=numSeg){
        Msg.innerHTML += `Hai esaurito i tentativi, hai perso </br>`;
        btnGioca.disabled = true;
    }
    txtNum.value = "";
    txtNum.focus(); 
}

function generaNum(min, max) {
    let n = Math.random() * (max - min) + min; // Math.random genera un numero casuale decimale tra 0(min) e 1(max) escluso

    return Math.floor(n) //Math.floor() tronca il numero generato abbattendo i decimali dopo la virgola
}

function gestisciEnter(){
    // event ha un contenuto automatico, contiene diverse informazioni fra cui
    //
    if(event.key == "Enter"){
        gioca()
    }
}