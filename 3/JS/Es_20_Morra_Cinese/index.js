"use strict";

const vet = ["mano", "sasso", "forbice"]


const imgUtente=document.getElementById("imgUtente");
const imgComputer=document.getElementById("imgComputer");
const smalls=document.getElementsByClassName("small");
const btnGioca=document.getElementById("btnGioca");
const txtRisultato=document.getElementById("txtRisultato");
const bigs = document.querySelectorAll(".big");

for(let big of bigs){
    big.style.backgroundImage="url(./img/vuota.png)"
}

for(let i =0; i < vet.length;i++){
    smalls[i].style.backgroundImage=`url(./img/${vet[i]}.png)`
    smalls[i].addEventListener("click", aggiornaImmagine)
}

//---FUNZIONI
function aggiornaImmagine(){

}


function random(min,max){
    return Math.floor((max-min)*Math.random())+min;
}