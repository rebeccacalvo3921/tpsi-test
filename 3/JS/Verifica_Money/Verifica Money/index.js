"use strict";

/* 🧱  💰  ⏱  💥  ❌ */

let livello = 1;

const avvia=document.getElementsByClassName("avvia")[0]
const freeze=document.getElementsByClassName("freeze")[0]
const wrapper=document.getElementById("wrapper")
const quadrante=document.getElementsByClassName("right")[0]
const timer=quadrante.getElementsByTagName("span")[0]
const parziale=quadrante.getElementsByClassName("parziale")[0]
const totale=quadrante.getElementsByClassName("totale")[0]
const btnReset=document.getElementById("btnReset")
let punteggiototale=0;
let scoppiax=0
let scoppiay=0
let secondi=0
let minuti=0
let puntilivello=0
let gametime
punteggiototale=parseInt(localStorage.getItem("migliorpunteggio"))
if (!punteggiototale) 
{
    punteggiototale=0   
}
totale.innerHTML=`💰 ${punteggiototale}`

livello=parseInt(localStorage.getItem("migliorLivello"))
if (!livello) 
{
    livello=1    
}

secondi=parseInt(localStorage.getItem("miglioriSecondi"))
if (!secondi) 
{
    secondi=0   
}

minuti=parseInt(localStorage.getItem("miglioriMinuti"))
if (!minuti) 
{
    minuti=0   
}
let tempo=2000/(livello+1)
let clock
freeze.style.display="none"




avvia.addEventListener("click",AvviaGioco)
freeze.addEventListener("click",ferma)
btnReset.addEventListener("click",function(){ window.location.reload()})
function ferma()
{
    clearInterval(clock)
    clearInterval(gametime)
    secondi=0;
    minuti=0;
    puntilivello=0;
}

function AvviaGioco()
{
    avvia.style.display="none"
    freeze.style.display="block"
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) 
        {
            const div=document.createElement("div")
            div.classList.add("cella")
            div.innerHTML="🧱"
            div.id=`${i}-${j}`
            div.addEventListener("click",scopripremio)
            div.dataset.premio=0;
            wrapper.append(div)
        }
        
    }
    caricapremi()
    gametime=setInterval(playtime,tempo)
    clock=setInterval(tictac,1000)
}

function tictac()
{
//orologio
    secondi++
    if (secondi==60) 
    {
        secondi=0;
        minuti++;   
    }
    timer.innerHTML=`⏱ ${minuti}:${secondi}`
}
function scopripremio()
{
    if (this.innerHTML=="🧱") 
    {
        if (this.dataset.premio==0) 
        {
            this.innerHTML="❌"
        }else
        {
            this.innerHTML="💰"
            let punti=parseInt(this.dataset.premio)
            punteggiototale+=punti
            puntilivello+=punti
            totale.innerHTML=`💰 ${punteggiototale}`
            parziale.innerHTML=`💰 ${puntilivello}`
        }  
    }

    if (fine()) 
    {
        gestiscilivelli()
    }
    
}


function gestiscilivelli()
{
    clearInterval(gametime)
    clearInterval(clock)
    
    if (puntilivello>100) 
    {
        livello++
        localStorage.setItem("migliorLivello",livello)
        localStorage.setItem("miglioriSecondi",secondi)
        localStorage.setItem("miglioriMinuti",minuti)
        localStorage.setItem("migliorpunteggio",punteggiototale)
        parziale.innerHTML="💰 0"
        alert(`Bravo, hai completato il livello con ${puntilivello} euro`)
        tempo=2000/(livello+1)
        puntilivello=0
        wrapper.innerHTML=""
        scoppiax=0;
        scoppiay=0;
        AvviaGioco()
    }else
    {
        alert("mi spiace, non hai fatto abbastanza soldi")
        freeze.style.display="none"
        localStorage.clear()
    }
    
}

function fine()
{
    let cont=0
    const divs=wrapper.querySelectorAll("div")
    for (const div of divs) 
    {
        if(div.innerHTML=="🧱")
        {
            return false;
        }else
        {
            cont++;
        }
    }
    if (cont==25) {
        return true
    }
}

function playtime()
{
    
    //muro
    let murospaccato=document.getElementById(`${scoppiax}-${scoppiay}`)
    if (murospaccato.innerHTML=="🧱") 
    {
        murospaccato.innerHTML="💥"
    }
    scoppiay++
    if (scoppiay==5) 
    {
        scoppiax++;
        scoppiay=0;
        
    }

    if (fine()) 
    {
        gestiscilivelli()
    }
}

function caricapremi()
{
    let randx,randy
    for (let i = 0; i < 10; i++) {

        do {
            randx=generaNumero(0,5)
            randy=generaNumero(0,5)
            
        } while (document.getElementById(`${randx}-${randy}`).dataset.premio!=0);
        document.getElementById(`${randx}-${randy}`).dataset.premio=generaNumero(5,50)
        console.log(document.getElementById(`${randx}-${randy}`).dataset.premio)
    }
}

function generaNumero(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}





