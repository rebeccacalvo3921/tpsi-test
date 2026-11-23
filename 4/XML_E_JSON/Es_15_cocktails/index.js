"use strict";

let headers = ["", "id", "name", "alcohlic", "main ingredient", ""];
let headersWidth = [40, 40, 60, 70, 70, 40];

const optAlcolico = document.getElementById("optAlcoholic");
const optNonAlcolico = document.getElementById("optNonAlcoholic");
const optTutti = document.getElementById("optTutti");
const lstIngredienti = document.getElementById("lstIngredienti");
const table = document.getElementsByTagName("table")[0];
const details = document.getElementById("dettagli");
const btnAddNew = document.querySelector(".title button");
let tbody;

let cocktailsList;
if (localStorage.getItem("cocktailsDB")) {
    cocktailsList = JSON.parse(localStorage.getItem("cocktailsDB"));
} else {
    let cocktailsPulito = cocktails.replace(/[\u0000-\u001F]+/g, " ");
    cocktailsList = (new Function("return " + cocktailsPulito))().drinks;
    localStorage.setItem("cocktailsDB", JSON.stringify(cocktailsList));
}

let ingredientsPulito = ingredients.replace(/[\u0000-\u001F]+/g, " ");
let ingredientsList = (new Function("return " + ingredientsPulito))().ingredients;

caricaIngredienti();
creaIntestazioneTabella();
aggiornaTabella();

optTutti.addEventListener("click", aggiornaTabella);
optAlcolico.addEventListener("click", aggiornaTabella);
optNonAlcolico.addEventListener("click", aggiornaTabella);
lstIngredienti.addEventListener("change", aggiornaTabella);

btnAddNew.addEventListener("click", function () {
    window.location.href = "inserisci.html";
});

function caricaIngredienti() {
    let optVuota = document.createElement("option");
    optVuota.value = "";
    optVuota.textContent = "";
    lstIngredienti.appendChild(optVuota);

    ingredientsList.sort((a, b) => a.strIngredient1.localeCompare(b.strIngredient1));

    for (let item of ingredientsList) {
        let opt = document.createElement("option");
        opt.value = item.strIngredient1;
        opt.textContent = item.strIngredient1;
        lstIngredienti.appendChild(opt);
    }
}

function creaIntestazioneTabella() {
    let thead = document.createElement("thead");
    let tr = document.createElement("tr");

    for (let i = 0; i < headers.length; i++) {
        let th = document.createElement("th");
        th.textContent = headers[i];
        th.style.width = headersWidth[i] + "px";
        th.style.textAlign = "left";
        tr.appendChild(th);
    }

    thead.appendChild(tr);
    table.appendChild(thead);

    tbody = document.createElement("tbody");
    table.appendChild(tbody);
}

function aggiornaTabella() {
    tbody.innerHTML = "";
    let ingredienteSelezionato = lstIngredienti.value;

    for (let drink of cocktailsList) {
        let matchAlcol = false;
        if (optTutti.checked) {
            matchAlcol = true;
        } else if (optAlcolico.checked && drink.strAlcoholic === "Alcoholic") {
            matchAlcol = true;
        } else if (optNonAlcolico.checked && drink.strAlcoholic && drink.strAlcoholic.toLowerCase() !== "alcoholic") {
            matchAlcol = true;
        }

        let matchIngrediente = (ingredienteSelezionato === "" || drink.strIngredient1 === ingredienteSelezionato);

        if (matchAlcol && matchIngrediente) {
            let tr = document.createElement("tr");

            let tdImg = document.createElement("td");
            let img = document.createElement("img");
            img.src = drink.strDrinkThumb;
            img.style.width = "40px";
            tdImg.appendChild(img);
            tr.appendChild(tdImg);

            let tdId = document.createElement("td");
            tdId.textContent = drink.idDrink;
            tr.appendChild(tdId);

            let tdName = document.createElement("td");
            tdName.textContent = drink.strDrink;
            tr.appendChild(tdName);

            let tdAlc = document.createElement("td");
            tdAlc.textContent = drink.strAlcoholic;
            tr.appendChild(tdAlc);

            let tdIng = document.createElement("td");
            tdIng.textContent = drink.strIngredient1;
            tr.appendChild(tdIng);

            let tdDet = document.createElement("td");
            let a = document.createElement("a");
            a.href = "#";
            a.textContent = "dettagli";
            a.addEventListener("click", function (event) {
                event.preventDefault();
                mostraDettagli(drink);
            });
            tdDet.appendChild(a);
            tr.appendChild(tdDet);

            tbody.appendChild(tr);
        }
    }
}

function mostraDettagli(drink) {
    details.innerHTML = "";

    let h3 = document.createElement("h3");
    h3.textContent = drink.strDrink;
    details.appendChild(h3);

    let listaIng = [];
    for (let i = 1; i <= 5; i++) {
        let ing = drink["strIngredient" + i];
        if (ing === null || ing === undefined || ing === "") {
            break;
        }
        listaIng.push(ing);
    }

    let p = document.createElement("p");
    p.innerHTML = "<b>Ingredienti:</b> - " + listaIng.join(" - ");
    p.style.marginBottom = "15px";
    details.appendChild(p);

    let img = document.createElement("img");
    img.src = drink.strDrinkThumb;
    img.style.width = "140px";
    details.appendChild(img);
}