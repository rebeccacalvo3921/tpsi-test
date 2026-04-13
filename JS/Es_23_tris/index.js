"use strict"

const table = document.getElementsByTagName("table")[0]
const DIM = 3

const turno = 0

for(let i =0; i < DIM; i++){
    const tr = document.createElement("tr")
    table.append(tr)
    for(let j=0; j< DIM; j++){
        const td = document.createElement("td")
        tr.append(td)
        const img = document.createElement("img")
        td.append(img)
        img.id = `img-${i}-${j}`
        img.src = "img/vuota.png"
        img.addEventListener("click", visualizzaImmagini)
    }
}


function visualizzaImmagini(){
    if(turno%2 == 0){
        this.src = "img/cerchio.png"
    }
    else{
        this.src= "img/croce.png"
    }
    this.removeEventListener("click", visualizzaImmagini)

    if(controllavincita()){
        let vincitore = turno%2== 0? "cerchio" : "croce"
        alert(vincitore)
    }

    turno++
}

function controllavincita(){
    return true;
}