"use strict"

const table=document.getElementsByTagName("table")[0]
const divRisultato=document.getElementById("divRisultato")
const DIM=3

let turno=0;

for(let i=0;i<DIM;i++){
 const tr=document.createElement("tr")
 table.append(tr)
 for(let j=0;j<DIM;j++){
    const td=document.createElement("td")
    tr.append(td)
    const img=document.createElement("img")
    td.append(img)
    img.id=`img-${i}-${j}`
    img.src="img/vuota.png"
    img.addEventListener("click", visualizzaImmagini)
 }   
}

function visualizzaImmagini(){
    if(turno%2==0){
        this.src="img/cerchio.png"
    }
    else{
        this.src="img/croce.png"
    }
    this.removeEventListener("click", visualizzaImmagini)

    if(controllaVincita()){
        let vincitore= turno%2==0 ? "cerchio" : "croce"
        divRisultato.textContent="ha vinto "+vincitore
        disabilitaEventi()
    }
    else{
        turno++
        if(turno==9){
            divRisultato.textContent="pareggio"
        }
    }
}
function controllaVincita(){
    //controllo per riga
    for(let i=0; i<DIM;i++){
        const img1=document.getElementById(`img-${i}-0`).src
        const img2=document.getElementById(`img-${i}-1`).src
        const img3=document.getElementById(`img-${i}-2`).src

        if(!img1.includes("vuota") && img1==img2 && img1==img3){
            return true;
        }
    }
    
    for(let i=0; i<DIM;i++){
        const img1=document.getElementById(`img-0-${i}`).src
        const img2=document.getElementById(`img-1-${i}`).src
        const img3=document.getElementById(`img-2-${i}`).src

        if(!img1.includes("vuota") && img1==img2 && img1==img3){
            return true;
        }
    }
    //controllo prima diagonale
    let img1=document.getElementById(`img-0-0`).src
    let img2=document.getElementById(`img-1-1`).src
    let img3=document.getElementById(`img-2-2`).src
    if(!img1.includes("vuota") && img1==img2 && img1==img3){
        return true;
    }
    //controllo seconda diagonale 
    img1=document.getElementById(`img-0-2`).src
    img3=document.getElementById(`img-2-0`).src
    if(!img1.includes("vuota") && img1==img2 && img1==img3){
        return true;
    }

    return false
}

function disabilitaEventi(){
    const imgs=document.querySelectorAll("img")
    for(let img of imgs){
        img.removeEventListener("click", visualizzaImmagini)
    }
}