"use strict"

let wrapper;
let spanPunti;
let punteggio = 0;

window.addEventListener("DOMContentLoaded", () => {
    wrapper = document.getElementById("wrapper");
    spanPunti = document.querySelector("#punti span");
    
    inizializzaMatrice();
    generaNuovoDue();
    generaNuovoDue(); 
    aggiornaGraficaPunteggio();
    
    window.addEventListener("keyup", gestisciInput);
});

function inizializzaMatrice() {
    wrapper.innerHTML = ""; 
    for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
            let cella = document.createElement("div");
            cella.id = `cella-${r}-${c}`;
            cella.className = "cella";
            cella.innerText = ""; 
            wrapper.appendChild(cella);
        }
    }
}

function generaNuovoDue() {
    let celleVuote = [];
    
    for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
            let cella = document.getElementById(`cella-${r}-${c}`);
            if (cella.innerText === "") {
                celleVuote.push(cella);
            }
        }
    }
    
    if (celleVuote.length > 0) {
        let indiceCasuale = Math.floor(Math.random() * celleVuote.length);
        celleVuote[indiceCasuale].innerText = "2";
    }
}

function gestisciInput(evento) {
    let mosso = false;
    
    switch (evento.key) {
        case "ArrowUp":
            mosso = spostaSu();
            break;
        case "ArrowDown":
            mosso = spostaGiu();
            break;
        case "ArrowLeft":
            mosso = spostaSinistra();
            break;
        case "ArrowRight":
            mosso = spostaDestra();
            break;
        default:
            return;
    }
    
    if (mosso) {
        generaNuovoDue();
        aggiornaGraficaPunteggio();
    }
}


function spostaSu() {
    let mosso = false;
    
    for (let passo = 0; passo < 3; passo++) {
        for (let c = 0; c < 4; c++) { 
            for (let r = 0; r < 3; r++) { 
                let cellaCorrente = document.getElementById(`cella-${r}-${c}`);
                let cellaSuccessiva = document.getElementById(`cella-${r+1}-${c}`);
                
                let valCorrente = cellaCorrente.innerText;
                let valSuccessivo = cellaSuccessiva.innerText;
                
                if (valSuccessivo !== "") {
                    if (valCorrente === "") {
                        cellaCorrente.innerText = valSuccessivo;
                        cellaSuccessiva.innerText = "";
                        mosso = true;
                    } 
                    else if (valCorrente === valSuccessivo && passo === 0) {
                        let somma = parseInt(valCorrente) + parseInt(valSuccessivo);
                        cellaCorrente.innerText = somma;
                        cellaSuccessiva.innerText = "";
                        punteggio += somma; 
                        mosso = true;
                    }
                }
            }
        }
    }
    return mosso;
}

function spostaGiu() {
    let mosso = false;
    for (let passo = 0; passo < 3; passo++) {
        for (let c = 0; c < 4; c++) {
            for (let r = 3; r > 0; r--) { 
                let cellaCorrente = document.getElementById(`cella-${r}-${c}`);
                let cellaSuccessiva = document.getElementById(`cella-${r-1}-${c}`);
                
                let valCorrente = cellaCorrente.innerText;
                let valSuccessivo = cellaSuccessiva.innerText;
                
                if (valSuccessivo !== "") {
                    if (valCorrente === "") {
                        cellaCorrente.innerText = valSuccessivo;
                        cellaSuccessiva.innerText = "";
                        mosso = true;
                    } else if (valCorrente === valSuccessivo && passo === 0) {
                        let somma = parseInt(valCorrente) + parseInt(valSuccessivo);
                        cellaCorrente.innerText = somma;
                        cellaSuccessiva.innerText = "";
                        punteggio += somma;
                        mosso = true;
                    }
                }
            }
        }
    }
    return mosso;
}

function spostaSinistra() {
    let mosso = false;
    for (let passo = 0; passo < 3; passo++) {
        for (let r = 0; r < 4; r++) {
            for (let c = 0; c < 3; c++) {
                let cellaCorrente = document.getElementById(`cella-${r}-${c}`);
                let cellaSuccessiva = document.getElementById(`cella-${r}-${c+1}`);
                
                let valCorrente = cellaCorrente.innerText;
                let valSuccessivo = cellaSuccessiva.innerText;
                
                if (valSuccessivo !== "") {
                    if (valCorrente === "") {
                        cellaCorrente.innerText = valSuccessivo;
                        cellaSuccessiva.innerText = "";
                        mosso = true;
                    } else if (valCorrente === valSuccessivo && passo === 0) {
                        let somma = parseInt(valCorrente) + parseInt(valSuccessivo);
                        cellaCorrente.innerText = somma;
                        cellaSuccessiva.innerText = "";
                        punteggio += somma;
                        mosso = true;
                    }
                }
            }
        }
    }
    return mosso;
}

function spostaDestra() {
    let mosso = false;
    for (let passo = 0; passo < 3; passo++) {
        for (let r = 0; r < 4; r++) {
            for (let c = 3; c > 0; c--) {
                let cellaCorrente = document.getElementById(`cella-${r}-${c}`);
                let cellaSuccessiva = document.getElementById(`cella-${r}-${c-1}`);
                
                let valCorrente = cellaCorrente.innerText;
                let valSuccessivo = cellaSuccessiva.innerText;
                
                if (valSuccessivo !== "") {
                    if (valCorrente === "") {
                        cellaCorrente.innerText = valSuccessivo;
                        cellaSuccessiva.innerText = "";
                        mosso = true;
                    } else if (valCorrente === valSuccessivo && passo === 0) {
                        let somma = parseInt(valCorrente) + parseInt(valSuccessivo);
                        cellaCorrente.innerText = somma;
                        cellaSuccessiva.innerText = "";
                        punteggio += somma;
                        mosso = true;
                    }
                }
            }
        }
    }
    return mosso;
}

function aggiornaGraficaPunteggio() {
    spanPunti.innerText = punteggio;
}