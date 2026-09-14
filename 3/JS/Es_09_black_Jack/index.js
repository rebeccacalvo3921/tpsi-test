"use strict";

const chkNums=document.getElementsByName("chkNum")
const txtNums=document.getElementsByName("txtNum")
const txtBanco=document.getElementById("txtBanco")
const txtUser=document.getElementById("txtUser")
const btnBanco=document.getElementById("btnBanco")

let numeroBanco=random(1,11)
txtBanco.value=numeroBanco
let numeroUtente=0

function visualizza(pos){
    chkNums[pos].disabled=true
    let numero=random(1,11)
    txtNums[pos].value=numero
    numeroUtente+=numero
    txtUser.value=numeroUtente
    if(numeroUtente>21){
        alert("HAI PERSO")
        disabilitaCheckBox()
        btnBanco.disabled=true
    }
}
function disabilitaCheckBox(){
    for(let chk of chkNums){
        chk.disabled=true
    }
}

function aggiungiNumeroBanco(){
    let numero=random(1,11)
    numeroBanco+=numero
    txtBanco.value=numeroBanco
    
    disabilitaCheckBox()

    if(numeroBanco>21){
        alert("VINCE IL GIOCATORE")
        btnBanco.disabled=true
    }
    else if(numeroBanco<=21&&numeroBanco>=17){
        btnBanco.disabled=true
        if(numeroUtente>numeroBanco){
            alert("Vince il giocatore")
        }
        else{
            alert("Vince il banco")
        }
    }else{
        if(numeroBanco>=numeroUtente){
            alert("Vince il banco")
            btnBanco.disabled=true
        }
    }
    
}

function random(a, b){
	return Math.floor((b-a)*Math.random()) + a;
}