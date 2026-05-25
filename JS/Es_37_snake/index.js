"use strict";

const DIM = 30;
const OSTACOLI = 16

let ciboI, ciboJ
let snakeI = 0, snakeJ = 0
let direzione = "Dw"
let punteggio = 0
let timerCiboID

const wrapper = document.getElementById("wrapper")
const buttons = document.querySelectorAll("input[type='button']")
const txtPunti = document.getElementById("txtPunti")
const btnFreeze = document.getElementById("freeze")
const clearStorage = document.getElementById("clearStorage")

for (let btn of buttons) {
    btn.addEventListener("click", function () {
        direzione = this.value
    })
}

let timerID = setInterval(spostaSnake, 250)

let posSnake = localStorage.getItem("posSnake")
let posCibo = localStorage.getItem("posCibo")
let posBombe = localStorage.getItem("posBombe")

if (posSnake && posCibo && posBombe) {
    console.log(posSnake, posCibo, posBombe)
    // da finire : leggere corretamente i dati gia dati per ricaricare lo storage
}
else {
    init()
    generaOstacoli()
    generaCibo()
}

function init() {
    for (let i = 0; i < DIM; i++) {
        for (let j = 0; j < DIM; j++) {
            const btn = document.createElement("button")
            btn.id = `btn-${i}-${j}`
            btn.classList.add("cella")
            wrapper.append(btn)
            if (i == 0 && j == 0)
                btn.style.backgroundColor = "#00f"
        }
    }
}

function generaOstacoli() {
    for (let n = 0; n < OSTACOLI; n++) {
        let i, j
        let btn
        do {
            i = generaNumero(0, DIM)
            j = generaNumero(2, DIM)
            btn = document.getElementById(`btn-${i}-${j}`)
        } while (btn.style.backgroundColor != "")
        btn.style.backgroundColor = "#f00"
        btn.dataset.ostacolo = "rosso"
    }
}

function generaCibo() {
    let btn
    do {
        ciboI = generaNumero(0, DIM)
        ciboJ = generaNumero(0, DIM)
        btn = document.getElementById(`btn-${ciboI}-${ciboJ}`)
    } while (btn.style.backgroundColor != "")
    btn.classList.add("cibo")
    btn.textContent = generaValoreCibo()
    timerCiboID = setTimeout(resetCibo, 10000)
}

function generaValoreCibo() {
    let rnd = generaNumero(1, 11)
    if (rnd == 10) {
        return 90
    }
    else {
        let valore = generaNumero(1, 26)
        return valore
    }
}

function resetCibo() {

    const btn = document.getElementById(`btn-${ciboI}-${ciboJ}`)
    btn.classList.remove("cibo")
    btn.textContent = ""
    generaCibo()
}

function spostaSnake() {
    let btn = document.getElementById(`btn-${snakeI}-${snakeJ}`)
    btn.style.backgroundColor = ""
    switch (direzione) {
        case "Dw":
            snakeI++
            break
        case "Up":
            snakeI--
            break
        case "Dx":
            snakeJ++
            break
        case "Sx":
            snakeJ--
            break
    }
    if (snakeI >= DIM || snakeI < 0 || snakeJ >= DIM || snakeJ < 0) {
        fineGioco()
    } else {
        btn = document.getElementById(`btn-${snakeI}-${snakeJ}`)
        console.log(btn.style.backgroundColor)

        if (btn.style.backgroundColor == "rgb(255, 0, 0)") {
            fineGioco()
        }
        else {
            if (btn.textContent != "") {
                punteggio += Number(btn.textContent)
                txtPunti.textContent = punteggio
                btn.classList.remove("cibo")
                btn.textContent = ""
                clearTimeout(timerCiboID)
                generaCibo()
            }
            btn.style.backgroundColor = "#00f"
        }
    }

}

btnFreeze.addEventListener("click", function () {

    let posSnake = [snakeI, snakeJ]
    let posCibo = [ciboI, ciboJ]
    let posBombe = []

    let bombe = document.querySelectorAll(`button[data-ostacolo="rosso"]`)

    for (let bomba of bombe) {
        posBombe.push(bomba.id)
    }

    localStorage.setItem("posSnake", posSnake)
    localStorage.setItem("posCibo", posCibo)
    localStorage.setItem("posBombe", posBombe)

    clearInterval(timerID)
});

clearStorage.addEventListener("click", function () { 

    localStorage.clear()
})

function fineGioco() {
    alert("HAI PERSO")
    clearInterval(timerID)
}

function generaNumero(min, max) {
    let rnd = Math.floor((max - min) * Math.random()) + min;
    return rnd;
}
