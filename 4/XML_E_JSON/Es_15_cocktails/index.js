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

let dbCocktails = [];
let dbIngredients = [];
let tbody;

window.addEventListener("load", function () {
    // Caricamento dati da localStorage (se presenti) o dalle variabili globali dei file JS
    if (localStorage.getItem("cocktails")) {
        dbCocktails = JSON.parse(localStorage.getItem("cocktails"));
    } else if (typeof cocktails !== "undefined") {
        dbCocktails = cocktails;
    }

    if (localStorage.getItem("ingredients")) {
        dbIngredients = JSON.parse(localStorage.getItem("ingredients"));
    } else if (typeof ingredients !== "undefined") {
        dbIngredients = ingredients;
    }

    caricaIngredienti();
    creaTabellaIntestazioni();
    visualizzaTabella(dbCocktails);

    // Gestione eventi filtri
    optTutti.addEventListener("change", applicaFiltri);
    optAlcolico.addEventListener("change", applicaFiltri);
    optNonAlcolico.addEventListener("change", applicaFiltri);
    lstIngredienti.addEventListener("change", applicaFiltri);

    // Gestione pulsante addNew
    btnAddNew.addEventListener("click", function () {
        window.location.href = "inserisci.html";
    });
});

function caricaIngredienti() {
    // Ordinamento alfabetico crescente
    let ingOrdinate = [...dbIngredients].sort();
    
    // Inserimento riga vuota iniziale (Tutti i cocktail)
    let optVuota = document.createElement("option");
    optVuota.value = "";
    optVuota.text = "";
    lstIngredienti.appendChild(optVuota);

    for (let ing of ingOrdinate) {
        let op = document.createElement("option");
        let nomeIng = typeof ing === "string" ? ing : (ing.strIngredient1 || ing.name || ing);
        op.value = nomeIng;
        op.text = nomeIng;
        lstIngredienti.appendChild(op);
    }
}

function creaTabellaIntestazioni() {
    let thead = document.createElement("thead");
    let tr = document.createElement("tr");
    for (let i = 0; i < headers.length; i++) {
        let th = document.createElement("th");
        th.textContent = headers[i];
        th.style.width = headersWidth[i] + "px";
        tr.appendChild(th);
    }
    thead.appendChild(tr);
    table.appendChild(thead);
    
    tbody = document.createElement("tbody");
    table.appendChild(tbody);
}

function visualizzaTabella(lista) {
    tbody.innerHTML = "";
    for (let c of lista) {
        let tr = document.createElement("tr");

        // Immagine (riscalata a 40px)
        let tdImg = document.createElement("td");
        let img = document.createElement("img");
        img.src = c.strDrinkThumb || "./cocktail.jpg";
        img.style.width = "40px";
        tdImg.appendChild(img);
        tr.appendChild(tdImg);

        // ID
        let tdId = document.createElement("td");
        tdId.textContent = c.idDrink;
        tr.appendChild(tdId);

        // Name
        let tdName = document.createElement("td");
        tdName.textContent = c.strDrink;
        tr.appendChild(tdName);

        // Alcoholic
        let tdAlc = document.createElement("td");
        tdAlc.textContent = c.strAlcoholic;
        tr.appendChild(tdAlc);

        // Main Ingredient
        let tdIng = document.createElement("td");
        tdIng.textContent = c.strIngredient1;
        tr.appendChild(tdIng);

        // Link Dettagli
        let tdDet = document.createElement("td");
        let a = document.createElement("a");
        a.href = "#";
        a.textContent = "dettagli";
        a.addEventListener("click", function (e) {
            e.preventDefault();
            mostraDettagli(c);
        });
        tdDet.appendChild(a);
        tr.appendChild(tdDet);

        tbody.appendChild(tr);
    }
}

function applicaFiltri() {
    let filtrate = dbCocktails;

    // Filtro Radio Button
    if (optAlcolico.checked) {
        filtrate = filtrate.filter(c => c.strAlcoholic && c.strAlcoholic.toLowerCase().includes("alcoholic") && !c.strAlcoholic.toLowerCase().includes("non") && !c.strAlcoholic.toLowerCase().includes("not"));
    } else if (optNonAlcolico.checked) {
        filtrate = filtrate.filter(c => c.strAlcoholic && (c.strAlcoholic.toLowerCase().includes("non") || c.strAlcoholic.toLowerCase().includes("not")));
    }

    // Filtro Ingredienti (gestito contemporaneamente)
    let ingSelezionato = lstIngredienti.value;
    if (ingSelezionato !== "") {
        filtrate = filtrate.filter(c => c.strIngredient1 && c.strIngredient1.toLowerCase() === ingSelezionato.toLowerCase());
    }

    visualizzaTabella(filtrate);
}
    
function mostraDettagli(c) {
    details.innerHTML = "";

    // Nome in tag h3
    let h3 = document.createElement("h3");
    h3.textContent = c.strDrink;
    details.appendChild(h3);

    // Primi 5 ingredienti separati da trattino (interrompendo al primo null/vuoto)
    let ingredientiList = [];
    for (let i = 1; i <= 5; i++) {
        let ing = c["strIngredient" + i];
        if (!ing || ing === "null" || ing === null || ing.trim() === "") {
            break;
        }
        ingredientiList.push(ing);
    }

    let pIng = document.createElement("p");
    pIng.innerHTML = "<b>Ingredienti:</b> " + ingredientiList.join(" - ");
    details.appendChild(pIng);

    // Immagine riscalata a 140px
    let img = document.createElement("img");
    img.src = c.strDrinkThumb || "./cocktail.jpg";
    img.style.width = "140px";
    details.appendChild(img);
}