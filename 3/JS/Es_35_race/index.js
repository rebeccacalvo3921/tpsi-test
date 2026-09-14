'use strict'

const COLONNE = 30;
const RIGHE = 20;
const OSTACOLI = 25;

const wrapper = document.getElementById("wrapper")
const btnAvvia=document.getElementById("btnAvvia")

creaMatrice();
generaBombe();


let riga1=0, riga2=0, colonna1=0, colonna2=0
let timerID

btnAvvia.addEventListener("click", function(){
    btnAvvia.disabled=true
    do{
        riga1=random(0, RIGHE-5)
        riga2=random(0, RIGHE-5)
    }while(Math.abs(riga1-riga2)<5)
        const button1=document.getElementById(`btn-${riga1}-0`)
        const button2=document.getElementById(`btn-${riga2}-0`)
        button1.style.backgroundColor="#00f"
        button2.style.backgroundColor="#00f"
        
        timerID=setInterval(avanzamento, 150)
    })


function avanzamento(){
    let n1=random(1, 11)
    let n2=random(1, 11)

    if(n1>3){
        let button=document.getElementById(`btn-${riga1}-${colonna1+1}`)
        if(button.style.backgroundImage==""){
            colonna1++;
        }   
        else{
            riga1++;
        }       
        disegnaCella(riga1, colonna1)
    }

    if(n2>3){
        let button=document.getElementById(`btn-${riga2}-${colonna2+1}`)
        if(button.style.backgroundImage==""){
            colonna2++;
        }   
        else{
            riga2++;
        }       
        disegnaCella(riga2, colonna2)
    }
}

function disegnaCella(riga, colonna){
    let btn=document.getElementById(`btn-${riga}-${colonna}`)
    btn.style.backgroundColor="#00f"
    if(colonna==COLONNE-1){
        clearInterval(timerID)
        if(riga==riga1 && riga1<riga2 || riga==riga2 && riga2<riga1){
            alert("HA VINTO IL PRIMO GIOCATORE")
        }
        else{
            alert("HA VINTO IL SECONDO GIOCATORE")
        }
    }
}


function creaMatrice() {
    for (let i = 0; i < RIGHE; i++) {
        for (let j = 0; j < COLONNE; j++) {
            const button = document.createElement("button")
            button.id = `btn-${i}-${j}`
            button.classList.add("cella")
            wrapper.append(button)
        }
    }
}

function generaBombe(){
    for(let n=0; n<OSTACOLI;n++){
        let i
        let j
        let button
        do{
            i=random(0, RIGHE)
            j=random(1, COLONNE)
            button=document.getElementById(`btn-${i}-${j}`)            
        }while(button.style.backgroundImage=="url(./bomba.png)")
            
            button.style.backgroundImage="url(./bomba.png)"
    }
}

function random(min, max){
    return Math.floor((max-min)*Math.random()+min)
}


