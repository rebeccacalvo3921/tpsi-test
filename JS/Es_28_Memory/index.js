"use strict"

const wrapper = document.getElementById("wrapper");

// ----------------------
// CREAZIONE IMMAGINI (10 coppie)
// ----------------------
let immagini = [];

for (let i = 1; i <= 10; i++) {
    immagini.push(`img/B${i}.png`);
    immagini.push(`img/B${i}.png`);
}

// ----------------------
// SHUFFLE (Fisher-Yates)
// ----------------------
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

shuffle(immagini);

// ----------------------
// STATO GIOCO
// ----------------------
let primaCarta = null;
let secondaCarta = null;
let blocco = false;
let coppieTrovate = 0;
let mosse = 0;

// ----------------------
// CREAZIONE CARTE
// ----------------------
immagini.forEach((img) => {
    const carta = document.createElement("div");
    carta.classList.add("carta");

    carta.dataset.img = img;

    carta.addEventListener("click", giraCarta);

    wrapper.appendChild(carta);
});

// ----------------------
// CLICK CARTA
// ----------------------
function giraCarta() {
    if (blocco) return;
    if (this === primaCarta) return;
    if (this.style.opacity === "0.3") return;

    this.style.backgroundImage = `url(${this.dataset.img})`;

    if (!primaCarta) {
        primaCarta = this;
        return;
    }

    secondaCarta = this;
    mosse++;

    controllaMatch();
}

// ----------------------
// CONTROLLO MATCH
// ----------------------
function controllaMatch() {
    const match = primaCarta.dataset.img === secondaCarta.dataset.img;

    if (match) {
        bloccaCarte();
    } else {
        rigiraCarte();
    }
}

// ----------------------
// MATCH TROVATO
// ----------------------
function bloccaCarte() {
    primaCarta.style.opacity = "0.3";
    secondaCarta.style.opacity = "0.3";

    primaCarta.removeEventListener("click", giraCarta);
    secondaCarta.removeEventListener("click", giraCarta);

    coppieTrovate++;

    resetTurno();

    if (coppieTrovate === 10) {
        setTimeout(() => {
            alert(`Bravo hai vinto in ${mosse} mosse!`);
        }, 400);
    }
}

// ----------------------
// NO MATCH
// ----------------------
function rigiraCarte() {
    blocco = true;

    setTimeout(() => {
        primaCarta.style.backgroundImage = "url(img/dorso.png)";
        secondaCarta.style.backgroundImage = "url(img/dorso.png)";

        resetTurno();
    }, 800);
}

// ----------------------
// RESET TURNO
// ----------------------
function resetTurno() {
    [primaCarta, secondaCarta] = [null, null];
    blocco = false;
}