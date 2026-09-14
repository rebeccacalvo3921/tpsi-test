"use strict"
const Lanci= document.getElementById("txtLanci")
const Croce= document.getElementById("lblCroce")
const Testa= document.getElementById("lblTesta")
const TestaInner=Testa.innerHTML
const CroceInner=Croce.innerHTML

function lanciaMoneta(){

    if(!Lanci.value)
        alert("Inserire un numero")
    else if(isNaN(Lanci.value))
        alert("Inserire un numero valido")

    else{
        let nLanci=parseInt(Lanci.value) 
        let contaTesta=0
        let contaCroce=0

        for(let i=0;i<nLanci;i++){
            let casuale=GeneraNumero(0,2)

            if(casuale==0) contaTesta++
            else contaCroce++
        }

        Testa.style.color=""
        Croce.style.color=""

        if(contaTesta>contaCroce) Testa.style.color="red"
        else if(contaCroce>contaTesta) Croce.style.color="red"

        Testa.innerHTML = TestaInner + "<b>" + contaTesta + "</b>"
        Croce.innerHTML = CroceInner + "<b>" + contaCroce + "</b>"
    }
}

function GeneraNumero(min,max){
    let n=Math.floor(Math.random()*(max-min)+min)
    return(n);
}