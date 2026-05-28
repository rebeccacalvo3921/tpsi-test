"use strict";


const DIM = 30;
const OSTACOLI = 16;
const wrapper = document.getElementById("wrapper");
const txtPunti = document.getElementById("txtPunti");
const btnFreeze = document.getElementById("freeze");
let cont =  0;
let snake =  [];
let CIBOGEN =  [];

let dirPrec =  "";
let direzione =  "down";


creaCampo();
inserisciOstacoli();
InizializzaSnake();
CaselleCibo();
let timer = setInterval(movimento, 250);
let timerCibo = setInterval(CaselleCibo, 10000);


function creaCampo() {
    for (let i = 0; i < DIM; i++) {
        for (let j = 0; j < DIM; j++) {
            const div = document.createElement("button");
            div.id = `${i}-${j}`;
            div.classList.add("cella");
            wrapper.append(div);
        }
    }
}

function inserisciOstacoli() {
    let i, j, div;
    for (let n = 0; n < OSTACOLI; n++) {
        do {
            i = generaNumero(0, DIM);
            j = generaNumero(3, DIM);
            div = document.getElementById(`${i}-${j}`);
        }
        while (div.style.backgroundColor != "");
        div.style.backgroundColor = "#f00";
        div.dataset.bombe = "bomba";
    }
}

function InizializzaSnake() {
    let div = document.getElementById(`0-0`);
    div.style.backgroundColor = "#00f";
    snake.push(div);
}

function CaselleCibo() {
    let poss = generaNumero(0, 10);
    let cibo = generaNumero(1, 26);
    if (poss < 1) {
        cibo = 90;
    }

    let i, j, div;
    do {
        i = generaNumero(0, DIM);
        j = generaNumero(0, DIM);
        div = document.getElementById(`${i}-${j}`);
    }
    while (div.style.backgroundColor != "")
    CIBOGEN.unshift(div);
    div.style.backgroundColor = "#fff";
    div.style.color = "#00f";
    div.dataset.cibo = true;
    div.innerHTML = cibo;
    if (cont != 0) {
        cancellazione()
    }
    cont++
}

function cancellazione() {
    let div = CIBOGEN[CIBOGEN.length - 1];
    CIBOGEN.pop();
    div.dataset.cibo = false;
    div.style.backgroundColor = "";
    div.innerHTML = "";
}

function movimento() {
    let divSucc;
    let i = Number(snake[0].id.split('-')[0]);
    let j = Number(snake[0].id.split('-')[1]);
    switch (direzione) {
        case "down":
            divSucc = document.getElementById(`${i + 1}-${j}`);
            break;
        case "up":
            divSucc = document.getElementById(`${i - 1}-${j}`);
            break;
        case "left":
            divSucc = document.getElementById(`${i}-${j - 1}`);
            break;
        case "right":
            divSucc = document.getElementById(`${i}-${j + 1}`);
            break;
    }
    if (divSucc) {
        if (divSucc.style.backgroundColor != "rgb(255, 0, 0)" && divSucc.style.backgroundColor != "rgb(0, 0, 255)") {
            snake.unshift(divSucc);
            snake[0].style.backgroundColor = "#00f";
            if (snake[0].innerHTML != "") {
                let punti = Number(txtPunti.innerHTML) + Number(snake[0].innerHTML);
                txtPunti.innerHTML = punti;
                snake[0].innerHTML = "";
                CIBOGEN.pop();
                cont = 0;
            }
            else {
                snake[snake.length - 1].style.backgroundColor = "";
                snake.pop();
            }
        }
        else {
            clearInterval(timer);
            clearInterval(timerCibo);
            setTimeout(function () { alert("Hai Perso!") }, 50);
        }
    }
    else {
        clearInterval(timer);
        clearInterval(timerCibo);
        setTimeout(function () { alert("Hai Perso!") }, 50);
    }
}

window.addEventListener('keydown', (e) => {
    dirPrec = direzione;
    switch (e.key) {
        case 'ArrowUp':
            direzione = "up";
            break;
        case 'ArrowDown':
            direzione = "down";
            break;
        case 'ArrowLeft':
            direzione = "left";
            break;
        case 'ArrowRight':
            direzione = "right";
            break;
    }
    switch (dirPrec) {
        case "up":
            direzione = direzione == "down" ? dirPrec : direzione;
            break;
        case "down":
            direzione = direzione == "up" ? dirPrec : direzione;
            break;
        case "right":
            direzione = direzione == "left" ? dirPrec : direzione;
            break;
        case "left":
            direzione = direzione == "right" ? dirPrec : direzione;
            break;
    }
});

function generaNumero(min, max) {
    let rnd = Math.floor((max - min) * Math.random()) + min;
    return rnd;
}
