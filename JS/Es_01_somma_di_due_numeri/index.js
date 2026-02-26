"use strict"
window.onload = function () {
    console.log("Applicazione avviata")
}
//PUNTATORI
const txt1 = document.getElementById("txtN1")
const txt2 = document.getElementById("txtN2")
const span = document.getElementById("divRis")
const txtRis = document.getElementById("txtRis")

function somma() {


    //VARIABILI
    let n1 = parseInt(txt1.value)
    let n2 = parseInt(txt2.value)

    //SOMMA
    let somma = n1 + n2

    //span.textContent=somma
    span.innerHTML = "<b>" + somma + "</b>"
    txtRis.value = somma
    allert(somma)
}
