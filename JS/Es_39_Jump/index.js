"use strict";

const COLONNE = 61;
const RIGHE = 10;
const GRIGIO = "rgb(252, 252, 252)";
const BLU = "rgb(0, 0, 255)";
const ROSSO = "rgb(255, 0, 0)";
const btnJump = document.getElementById("btnJump");
const txtPunti = document.getElementById("txtPunti");
const wrapper = document.getElementById("wrapper");

// creazione matrice gi gioco
for (let i = 0; i < RIGHE; i++) {
    for (let j = 0; j < COLONNE; j++) {
        let div = document.createElement("div");
        // assegno alla riga più in basso id=0, a quella più alta id=9
        // Le righe 7-8-9 sono inutilizzate
        div.id = (RIGHE - i - 1) + "-" + j;
        div.classList.add("cella");
        wrapper.append(div);
    }
}

// il player si trova sulla colonna 30.
const player_Low = document.getElementById("0-30")
const player_High = document.getElementById("6-30")
const ostacolo = document.getElementById("1-30")
player_Low.style.backgroundColor = BLU;
btnJump.addEventListener("click", salto);
let punti = 0;

let timerOstacoli = setInterval(spostaOstacoli, 400);
let cont = 0;
let ostacoli = [];
function spostaOstacoli() {
    if (cont == 0) {
        //crea ostacolo
        let h = random(0, 6);
        if (h != 0) {
            let div = [];
            for (let i = 1; i <= h; i++) {
                div.push(document.getElementById(`${i}-0`))
                div[i - 1].style.backgroundColor = ROSSO;
            }
            ostacoli.unshift(div);
        }
    }
    if (ostacoli.length > 0) {
        //toglie l'ostacolo
        let ultimoOstacolo = ostacoli[ostacoli.length - 1];
        let colonnaUltimo = Number(ultimoOstacolo[0].id.split('-')[1]);
        if (colonnaUltimo == COLONNE - 1) {
            for (let div of ultimoOstacolo) {
                div.style.backgroundColor = GRIGIO;
            }
            ostacoli.pop();
        }
    }

    for (let k = 0; k < ostacoli.length; k++) {
        //sposta l'ostacolo
        let NuoviOstacoli = [];
        for (let div of ostacoli[k]) {
            let i = Number(div.id.split('-')[0]);
            let j = Number(div.id.split('-')[1]);
            let divSuccessivo = document.getElementById(`${i}-${j + 1}`)
            if (divSuccessivo) {
                divSuccessivo.style.backgroundColor = ROSSO;
                div.style.backgroundColor = GRIGIO;
                NuoviOstacoli.push(divSuccessivo);
            }
        }
        ostacoli[k] = NuoviOstacoli;

        if (NuoviOstacoli.length > 0 && player_High.style.backgroundColor == BLU && Number(NuoviOstacoli[0].id.split('-')[1]) == 30) {
            for (let i = 1; i < 6; i++) {
                let div = document.getElementById(`${i}-30`);
                if (div.style.backgroundColor == ROSSO)
                    punti++;
                else
                    break;
            }
            txtPunti.value = punti;
        }

    }

    cont = cont == 7 ? 0 : cont + 1;
}

function salto() {
    if (ostacolo.style.backgroundColor != ROSSO) {
        player_Low.style.backgroundColor = GRIGIO;
        player_High.style.backgroundColor = BLU;

        setTimeout(function () {
            if (ostacolo.style.backgroundColor == ROSSO) {
                alert("game over!");
                clearInterval(timerOstacoli);
                btnJump.disabled = true;
            }
            else {
                player_Low.style.backgroundColor = BLU;
                player_High.style.backgroundColor = GRIGIO;
            }
        }, 2000)
    }
    else {
        alert("game over!");
        btnJump.disabled = true;
        clearInterval(timerOstacoli)
    }

}



function random(a, b) {
    return Math.floor((b - a) * Math.random()) + a;

}