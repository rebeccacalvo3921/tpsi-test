
"use strict";

let scuderie = {};

const tbody = document.getElementsByTagName("tbody")[0];
const btnTutti = divPiloti.querySelector("button");
const divDettagli = document.getElementById("divDettagli");


loadData();
caricaListBox();
caricaNazioni();
caricaPiloti();


function loadData() {

    let aus = localStorage.getItem("F1");

    if (!aus) {
        aus = data;
    }

    scuderie = JSON.parse(aus);
}
function caricaListBox() {
    const keys = Object.keys(scuderie);
    keys.sort();
    for (const key of keys) {

        let opt = document.createElement("option");

        opt.textContent = key;

        lstScuderie.append(opt);
    }
    lstScuderie.selectedIndex = -1;

    lstScuderie.addEventListener("change", function () {
        const chks = divNazioni.querySelectorAll(
            "input[type=checkbox]"
        );

        for (const chk of chks) {
            chk.checked = false;
        }
        caricaPiloti();

    });

}

function caricaNazioni() {

    let nazioni = new Set();
    for (const key in scuderie) {

        const scuderia = scuderie[key];
        for (const pilota of scuderia.piloti) {

            nazioni.add(pilota.nazione);

        }

    }
    const nazioniOrdinate = Array.from(nazioni);
    nazioniOrdinate.sort();

    nazioniOrdinate.forEach(function (nazione) {

        let inp = document.createElement("input");

        inp.type = "checkbox";

        inp.value = nazione;


        inp.addEventListener("change", function () {
            caricaPiloti();
        });
        let span = document.createElement("span");

        span.textContent = nazione;

        divNazioni.append(inp);

        divNazioni.append(span);

        divNazioni.append(document.createElement("br"));

    });

}

function caricaPiloti() {

    tbody.innerHTML = "";
    let scuderiaSelezionata = lstScuderie.value;

    let nazioniSelezionateChks = Array.from(

        divNazioni.querySelectorAll(
            "input[type=checkbox]:checked"
        )

    );

    let nazioniSelezionate = nazioniSelezionateChks.map(

        function (chk) {
            return chk.value;
        }

    );
    for (const key in scuderie) {
        if (!scuderiaSelezionata ||
            scuderiaSelezionata == key) {

            const item = scuderie[key];

            for (const pilota of item.piloti) {

                if (nazioniSelezionate.length == 0 ||
                    nazioniSelezionate.includes(pilota.nazione)) {

                    caricaRigaTabella(
                        pilota,
                        key
                    );

                }

            }

        }

    }

}

function caricaRigaTabella(pilota, nomeScuderia) {

    let tr = document.createElement("tr");
    tbody.append(tr);
    let tdNum = document.createElement("td");
    tdNum.textContent = pilota.numero;
    tr.append(tdNum);
    let tdNome = document.createElement("td");

    let span = document.createElement("span");

    span.textContent = pilota.nome;
    span.addEventListener("click", function () {

        visualizzaDettagli(nomeScuderia, pilota);

    });
    tdNome.append(span);
    tr.append(tdNome);
    let tdNazione = document.createElement("td");
    tdNazione.textContent = pilota.nazione;
    tr.append(tdNazione);
    let tdScuderia = document.createElement("td");
    tdScuderia.textContent = nomeScuderia;
    tr.append(tdScuderia);

}

btnTutti.addEventListener("click", function () {
    lstScuderie.selectedIndex = -1;
    const chks = divNazioni.querySelectorAll(
        "input[type=checkbox]:checked"
    );
    for (const chk of chks) {

        chk.checked = false;

    }
    caricaPiloti();

});

function visualizzaDettagli(nomeScuderia, pilota) {

    const scuderia = scuderie[nomeScuderia];
    divDettagli.innerHTML = "";

    divDettagli.style.display = "flex";

    let img = document.createElement("img");

    img.src = "./img/" + pilota.nome + ".jpg";

    img.alt = pilota.nome;

    img.onerror = function () {
        img.src = "./img/user.png";

    };


    divDettagli.append(img);
    let div = document.createElement("div");
    let pNome = document.createElement("p");
    let bNome = document.createElement("b");

    bNome.textContent = pilota.numero + " - " + pilota.nome;

    pNome.append(bNome);

    div.append(pNome);

    let pScuderia = document.createElement("p");
    pScuderia.textContent = nomeScuderia;
    div.append(pScuderia);

    let pMotore = document.createElement("p");
    pMotore.append(document.createTextNode("Motore: "));

    let bMotore = document.createElement("b");
    bMotore.textContent = scuderia.motore;
    pMotore.append(bMotore);
    div.append(pMotore);

    let pPneumatici = document.createElement("p");
    pPneumatici.append(
        document.createTextNode("Pneumatici: ")
    );
    let bPneumatici = document.createElement("b");

    bPneumatici.textContent = scuderia.pneumatici;

    pPneumatici.append(bPneumatici);

    div.append(pPneumatici);


    let pData = document.createElement("p");

    pData.append(
        document.createTextNode("Data di Nascita: ")
    );
    let bData = document.createElement("b");
    bData.textContent = pilota.dataNascita;
    pData.append(bData);
    div.append(pData);
    divDettagli.append(div);

}
