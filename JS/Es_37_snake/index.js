"use strict";

const DIM = 30;
const OSTACOLI = 16

const wrapper = document.getElementById("wrapper")
const buttons = document.querySelectorAll("input[type='button']")

let snakeJ = 0, snakeI = 0
let direzione = "Dw"

for (let btn of buttons) {
    btn.addEventListener("click", function () {
        direzione = this.value

    })
}

init()
GeneraOstacoli()
GeneraCibo()
let timerID = setInterval(spostaSnake, 250)



function init() {
    for (let i = 0; i < DIM; i++) {
        for (let j = 0; j < DIM; j++) {
            const btn = document.createElement("button")
            btn.id = `btn-${i}-${j}`
            btn.classList.add("cella")
            wrapper.append(btn)
            if (i == 0 && j == 0) {
                btn.style.backgroundColor = "#00f"

            }
        }
    }
}


function GeneraOstacoli() {
    for (let n = 0; n < OSTACOLI; n++) {
        let i, j
        let btn
        do {
            i = generaNumero(0, DIM)
            j = generaNumero(2, DIM)
            btn = document.getElementById(`btn-${i}-${j}`)
        } while (btn.style.backgroundColor != "");
        btn.style.backgroundColor = "#f00"
    }
}


function GeneraCibo() {
    let i, j
    let btn
    do {
        i = generaNumero(0, DIM)
        j = generaNumero(0, DIM)
        btn = document.getElementById(`btn-${i}-${j}`)
    } while (btn.style.backgroundColor != "");
    btn.classList.add("cibo")
    btn.textContent = GeneraValoreCibo()
}


function GeneraValoreCibo() {
    let rnd = generaNumero(1, 11)
    if (rnd == 10) {
        return 90
    }
    else {
        let val = generaNumero(1, 26)
        return val
    }
}


function spostaSnake() {
    let btn = document.getElementById(`btn-${snakeI}-${snakeJ}`)
    btn.style.backgroundColor = ""
    switch (direzione) {
        case "Dw":
            snakeI++
            break
        case "Dx":
            snakeJ++
            break
        case "Up":
            snakeI--
            break
        case "Sx":
            snakeJ--
            break
    }

    if (snakeI >= DIM || snakeI < 0 || snakeJ >= DIM || snakeJ < 0) {
        fineGioco()
    }
    else {
        btn = document.getElementById(`btn-${snakeI}-${snakeJ}`)
        if (btn.style.backgroundColor = "#f00") {
            fineGioco()
        }
        else {
            btn.style.backgroundColor = "#00f"
        }
    }
}

function fineGioco() {
    alert("GAME OVER!")
    clearInterval(timerID)
}


function generaNumero(min, max) {
    let rnd = Math.floor((max - min) * Math.random()) + min;
    return rnd;
}


