
"use strict"

//----- COSTANTI -----
const select = document.getElementsByTagName("select")[0]
const wrapper = document.getElementById("wrapper")
const ris = document.getElementById("ris")

const GIALLO = "rgb(255, 255, 0)"
const GRIGIO = "rgb(160, 160, 160)"
let DIM
let cont = 0

for (let i = 3; i <= 6; i++) {
    const option = document.createElement("option")
    select.append(option)
    option.textContent = `${i} x ${i}`
    option.value = i
}
select.selectedIndex = -1
select.addEventListener("change", SceltaListBox)




//----- FUNZIONI -----
function SceltaListBox() {
    wrapper.innerHTML = ""
    cont = 0
    ris.textContent = cont
    DIM = this.value
    wrapper.style.width = (50 * DIM) + "px"
    for (let i = 0; i < DIM; i++) {
        for (let j = 0; j < DIM; j++) {
            const div = document.createElement("div")
            wrapper.append(div)
            div.classList.add("pedina")
            div.id = `btn-${i}-${j}`
            div.addEventListener("click", ControllaAccensione)
        }
    }
}


function ControllaAccensione() {
    const id = this.id
    const aus = id.split('-')
    const i = Number(aus[1])
    const j = Number(aus[2])

    CambiaColore(this)
    if (j < DIM - 1) {
        let id = `btn-${i}-${j + 1}`
        const btn = document.getElementById(id)
        CambiaColore(btn)
    }
    if (j > 0) {
        let id = `btn-${i}-${j - 1}`
        const btn = document.getElementById(id)
        CambiaColore(btn)
    }
    if (i > 0) {
        let id = `btn-${i - 1}-${j}`
        const btn = document.getElementById(id)
        CambiaColore(btn)
    }
    if (i < DIM - 1) {
        let id = `btn-${i + 1}-${j}`
        const btn = document.getElementById(id)
        CambiaColore(btn)
    }
    cont++
    ris.textContent = cont

    if (controllaVincita()) {
        alert("BRAVO FURBO")
        disattivaTasti()
    }
}

function controllaVincita() {
    const divs = wrapper.querySelectorAll(".pedina")

    for (const div of divs) {
        if (div.style.backgroundColor != GIALLO) {
            return false;
        }
    }
    return true;
}

function disattivaTasti() {
    const divs = wrapper.querySelectorAll(".pedina")

    for (const div of divs) {
        removeEventListener("click", ControllaAccensione)
    }
}


function CambiaColore(btn) {
    if (btn.style.backgroundColor == "") {
        btn.style.backgroundColor = GIALLO
    }
    else {
        btn.style.backgroundColor = ""
    }
}