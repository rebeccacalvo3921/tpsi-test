"use strict";


let btnSalva = document.getElementById("btnSalva")
let btnAnnulla = document.getElementById("btnAnnulla")
	
let opts = document.getElementsByName("optGender");
let txtCode = document.getElementById("txtCode")
let txtPrice = document.getElementById("txtPrice")
let lstColor = document.getElementById("lstColor")
	
//Avvio
let watches = datiIniziali
creaTabella()

function creaTabella(){
    tbody.innerHTML = ""
    for (const item of watches) {
        const gender = item.gender;
        const models = item.model;

        for (const model of models) {
            //continuare qui
            const code=  model.code
        }

        visualizza(gender, code, price, color, img)
    }
}