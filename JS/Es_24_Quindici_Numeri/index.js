"use strict"
const wrapper = document.getElementById("wrapper");
let griglia = [
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""]
];

let i;
let j;
for (let n = 0; n < 16; n++) {
    do {
        i = Math.floor(Math.random() * 4 + 1);
        j = Math.floor(Math.random() * 4 + 1);
    }
    while (griglia[i][j] != "")
    griglia[i][j] = n;
}

for (let i = 0; i < 6; i++) {
    griglia[i][0] = "0";
    griglia[i][5] = "0";
}
for (let j = 0; j < 6; j++) {
    griglia[0][j] = "0";
    griglia[5][j] = "0";
}

for (let i = 1; i < 5; i++) {
    for (let j = 1; j < 5; j++) {
        const div = document.createElement("div");
        div.id = `${i}-${j}`
        div.style.width = "40px";
        div.style.height = "40px";
        div.style.textAlign = "center";
        div.style.lineHeight = "40px";
        div.style.margin = "2px";
        div.style.display = "inline-block";
        div.dataset.pos = `${i}-${j}`;
        if (griglia[i][j] != "") {
            div.textContent = griglia[i][j];
            div.style.backgroundColor = "#990000";
            div.style.color = "#fff";
            div.addEventListener("click", sposta)
        }
        else {
            div.style.backgroundColor = "#555";
            div.style.color = "#555"
            div.textContent = ".";
        }
        wrapper.append(div);
    }
}


function sposta() {
    let pos = this.id.split("-");
    let i = Number(pos[0]), j = Number(pos[1]);
    let div;
    if (griglia[i][j - 1] == "") {
        griglia[i][j - 1] = griglia[i][j];
        div = document.querySelector(`div[data-pos = "${i}-${j - 1}"]`)
    }
    else if (griglia[i][j + 1] == "") {
        griglia[i][j + 1] = griglia[i][j];
        div = document.querySelector(`div[data-pos = "${i}-${j + 1}"]`)
    }
    else if (griglia[i - 1][j] == "") {
        griglia[i - 1][j] = griglia[i][j];
        div = document.querySelector(`div[data-pos = "${i - 1}-${j}"]`)
    }
    else if (griglia[i + 1][j] == "") {
        griglia[i + 1][j] = griglia[i][j];
        div = document.querySelector(`div[data-pos = "${i + 1}-${j}"]`)
    }
    div.style.cssText = this.style.cssText;
    div.textContent = this.textContent;
    div.addEventListener("click", sposta);
    this.style.backgroundColor = "#555";
    this.style.color = "#555";
    this.textContent = ".";
    this.removeEventListener("click", sposta);
    griglia[i][j] = "";

    checkVittoria();
}

function checkVittoria() {
    let vittoria = true;
    let cont = 1;
    for (let i = 1; i < 5; i++) {
        for (let j = 1; j < 5; j++) {
            if (i == 4 && j == 4) {
                if (griglia[i][j] != "")
                    vittoria = false;
            }
            else {
                if (griglia[i][j] != cont)
                    vittoria = false;
                cont++;
            }
        }
    }
    if (vittoria) {
        for (let i = 1; i < 5; i++) {
            for (let j = 1; j < 5; j++) {
                let div = document.querySelector(`div[data-pos = "${i}-${j}"]`);
                div.removeEventListener("click", sposta);
            }
        }
        alert("hai vinto");
    }
    if(griglia[4][4] == "" && griglia[4][5] == "14" && griglia[4][2] == "15"){
        alert("Schema impossibile da risolvere, ricarica la pagina")
        for (let i = 1; i < 5; i++) {
            for (let j = 1; j < 5; j++) {
                let div = document.querySelector(`div[data-pos = "${i}-${j}"]`);
                div.removeEventListener("click", sposta);
            }
        }
    }
}