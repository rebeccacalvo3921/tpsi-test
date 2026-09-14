"use strict";

const btnG=document.getElementsByClassName("card")[0]
const cartaG=document.getElementsByClassName("card")[1]
const btnB=document.getElementsByClassName("card")[2]
const cartaB=document.getElementsByClassName("card")[3]

const puntiG = document.getElementsByTagName("span")[0]
const puntiB = document.getElementsByTagName("span")[1]	
const assoG=document.getElementsByClassName("msgAsso")[0]
const assoB=document.getElementsByClassName("msgAsso")[1]

const chkG = assoG.children[0]
const chkB = assoB.children[0]

let carteUscite=[]

assoG.style.visibility="hidden";
assoB.style.visibility="hidden";
btnG.style.opacity=0.5
btnB.style.opacity=0.5

btnB.addEventListener("mouseover", function(){
    btnB.style.opacity=1;
})
btnG.addEventListener("mouseover", function(){
    btnG.style.opacity=1;
} )
btnB.addEventListener("mouseout", function(){
    btnB.style.opacity=0.5;
})
btnG.addEventListener("mouseout",  function(){
    btnG.style.opacity=0.5;
})

let PuntiBanco=20
btnB.addEventListener("click", function(){
    cartaB.style.backgroundImage=`url(img/${generaCarta(PuntiBanco)}.gif)`
    puntiB.innerHTML=PuntiBanco
})

let PuntiGiocatore=0
btnG.addEventListener("click", function(){
    cartaG.style.backgroundImage=`url(img/${generaCarta(PuntiGiocatore)}.gif)`
    puntiG.innerHTML=PuntiGiocatore
})

let cards=[]
function generaCarta(punti){
    let card=""
    do{
        card=String.fromCharCode(96+generaNumero(1,5))
        let num=generaNumero(1,14)
        punti+=num
        card+=num
    }while(cards.includes(card))
    cards.push(card)
    return card
}

function generaNumero(a, b){
    return Math.floor((b-a)*Math.random())+a
}