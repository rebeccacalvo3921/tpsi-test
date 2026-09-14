"use strict";

const RIGHE = 6;
const COLONNE = 7;

const GREY = "rgb(127, 127, 127)";
const YELLOW = "rgb(255, 255, 0)";
const RED = "rgb(255, 0, 0)";

const wrapper = document.getElementById("wrapper");
const next = document.getElementById("nextPlayer");

let turno = YELLOW; // parte il giallo

creaMatrice();
inizializzaNext();

function creaMatrice() {
    for (let i = 0; i < RIGHE; i++) {
        for (let j = 0; j < COLONNE; j++) {
            const el = document.createElement("button");
            el.classList.add("pedina");
            el.id = `${i}-${j}`;
            el.style.backgroundColor = GREY;

            wrapper.append(el);
            el.addEventListener("click", visualizza);

            if (i !== RIGHE - 1) {
                el.disabled = true;
            }
        }
    }
}

function inizializzaNext() {
    next.classList.add("pedina");
    next.style.backgroundColor = turno;
}

function visualizza(e) {
    const btn = e.target;

    btn.style.backgroundColor = turno;
    btn.disabled = true;

    const [r, c] = btn.id.split("-").map(Number);

    if (r > 0) {
        const sopra = document.getElementById(`${r - 1}-${c}`);
        sopra.disabled = false;
    }

    if (controllaVincita(r, c)) {
        setTimeout(() => {
            alert((turno === YELLOW ? "Giallo" : "Rosso") + " ha vinto!");
        }, 100);

        disabilitaTutto();
        return;
    }

    turno = (turno === YELLOW) ? RED : YELLOW;
    next.style.backgroundColor = turno;
}


function controllaVincita(r, c) {
    return (
        controllaDirezione(r, c, 0, 1) ||
        controllaDirezione(r, c, 1, 0) ||
        controllaDirezione(r, c, 1, 1) ||
        controllaDirezione(r, c, 1, -1)
    );
}

function controllaDirezione(r, c, dr, dc) {
    let count = 1;

    count += conta(r, c, dr, dc);
    count += conta(r, c, -dr, -dc);

    return count >= 4;
}

function conta(r, c, dr, dc) {
    let colore = turno;
    let count = 0;

    let i = r + dr;
    let j = c + dc;

    while (
        i >= 0 && i < RIGHE &&
        j >= 0 && j < COLONNE
    ) {
        const cella = document.getElementById(`${i}-${j}`);

        if (cella.style.backgroundColor !== colore) break;

        count++;
        i += dr;
        j += dc;
    }

    return count;
}

function disabilitaTutto() {
    const bottoni = document.querySelectorAll(".pedina");
    bottoni.forEach(b => b.disabled = true);
}