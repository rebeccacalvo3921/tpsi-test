'use strict'

const DIM = 10;
const GRIGIO = "rgb(127, 127, 127)";
const BLU = "rgb(0, 0, 255)";
let riga = 0, colonna = 0, timerID

const wrapper = document.getElementById("wrapper")

creaMatrice()
generaBomba()
timerID = setInterval(spostaBomba, 150)

function creaMatrice() {
    for (let i = 0; i < DIM; i++) {
        for (let j = 0; j < DIM; j++) {
            const button = document.createElement("button")
            button.id = `btn-${i}-${j}`
            button.classList.add("cella")
            button.addEventListener("click", disegnaMuro)
            wrapper.append(button)
        }
    }
}


function generaBomba() {
    riga = generaNumero(0, DIM)
    colonna = generaNumero(0, DIM)
    const btn = document.getElementById(`btn-${riga}-${colonna}`)
    btn.style.backgroundImage = "url(./bomba.png)"
}

function spostaBomba() {
    const btn = document.getElementById(`btn-${riga}-${colonna}`)
    btn.style.backgroundImage = ""
    let aus = generaNumero(1, 5)
    switch (aus) {
        case 1:
            if (riga > 0) riga--
            break;
        case 2:
            if (colonna < DIM - 1) colonna++
            break;
        case 3:
            if (riga <DIM-1) riga++
            break;
        case 2:
            if (colonna >0) colonna--
            break;
    }
}

function disegnaMuro() {
    if (this.style.backgroundImage != "") {

    }
}





function generaNumero(a, b) {
    let ris = Math.floor((b - a) * Math.random()) + a;
    return ris;
}

