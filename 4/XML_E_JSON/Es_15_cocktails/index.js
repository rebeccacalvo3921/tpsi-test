"use strict";

let headers = ["", "id", "name", "alcohlic", "main ingredient", ""]
let headersWidth = [40, 40, 60, 70, 70, 40]


const optAlcolico = document.getElementById("optAlcoholic")
const optNonAlcolico = document.getElementById("optNonAlcoholic")
const optTutti = document.getElementById("optTutti")
const lstIngredienti = document.getElementById("lstIngredienti")
const table = document.getElementsByTagName("table")[0];
const details = document.getElementById("dettagli")
let tbody;


let optSelezionata = "Tutti";
let lstSelezionata = "";

let dataCocktails;
let dataIngredients;

avvia();

function avvia() {
    optAlcolico.addEventListener("change", optAlcolicoChange);
    optNonAlcolico.addEventListener("change", optNonAlcolicoChange);
    optTutti.addEventListener("change", optTuttiChange);
    lstIngredienti.addEventListener("change", lstIngredientiChange);
    dataCocktails = JSON.parse(cocktails);
    dataIngredients = JSON.parse(ingredients);
    caricaLst();
    caricaTabella();
}

function lstIngredientiChange() {
    table.innerHTML = "";
    lstSelezionata = lstIngredienti.value;
    caricaTabella();
}

function optAlcolicoChange() {
    table.innerHTML = "";
    optSelezionata = "Alcoholic";
    caricaTabella();
}

function optNonAlcolicoChange() {
    table.innerHTML = "";
    optSelezionata = "Non alcoholic";
    caricaTabella();
}

function optTuttiChange() {
    table.innerHTML = "";
    optSelezionata = "Tutti";
    caricaTabella();
}

function caricaTabella() {
    let tHead = document.createElement("thead");
    let trHead = document.createElement("tr");

    let th = document.createElement("th");
    trHead.appendChild(th);

    th = document.createElement("th");
    th.textContent = "Id";
    trHead.appendChild(th);

    th = document.createElement("th");
    th.textContent = "Name";
    trHead.appendChild(th);

    th = document.createElement("th");
    th.textContent = "Alcohlic";
    trHead.appendChild(th);

    th = document.createElement("th");
    th.textContent = "Main ingredient";
    trHead.appendChild(th);

    th = document.createElement("th");
    trHead.appendChild(th);

    tHead.appendChild(trHead);
    table.appendChild(tHead);

    let vCocktails = dataCocktails["drinks"];
    let tbody = document.createElement("tbody");
    table.appendChild(tbody);
    for (let c of vCocktails) {
        if ((optSelezionata == "Tutti" || optSelezionata == c["strAlcoholic"]) && (lstSelezionata == "" || lstSelezionata == c["strIngredient1"])) {
            let tr = document.createElement("tr");

            let td = document.createElement("td");
            let img = document.createElement("img");
            img.style.height = "40px";
            img.style.width = "40px";
            img.src = c["strDrinkThumb"];
            td.appendChild(img);
            tr.appendChild(td);

            td = document.createElement("td");
            td.textContent = c["idDrink"];
            tr.appendChild(td);

            td = document.createElement("td");
            td.textContent = c["strDrink"];
            tr.appendChild(td);

            td = document.createElement("td");
            td.textContent = c["strAlcoholic"];
            tr.appendChild(td);

            td = document.createElement("td");
            td.textContent = c["strIngredient1"];
            tr.appendChild(td);

            td = document.createElement("td");
            let span = document.createElement("span")
            span.textContent = "dettagli";
            span.addEventListener("click",function(){
                dettagliClick(c);
            });
            td.appendChild(span);
            tr.appendChild(td);

            tbody.appendChild(tr);
        }
    }
}

function dettagliClick(drink){
    details.innerHTML = "";
    let h3 = document.createElement("h1");
    h3.textContent = drink["strDrink"];
    details.appendChild(h3);

    details.appendChild(document.createElement("br"));

    let b = document.createElement("b");
    b.textContent = "Ingredienti: ";
    details.appendChild(b);
    let ingredient;
    let i = 1;
    do {
        ingredient = drink["strIngredient" + i];
        if(ingredient != null && ingredient != undefined){
            const text = document.createTextNode(ingredient + "-");
            details.appendChild(text);
        }  
        i++;
    } while (ingredient != null && ingredient != undefined);
   
}

function caricaLst() {
    let vettIngredients = dataIngredients["ingredients"];
    let vett = [""];
    for (let i of vettIngredients) {
        let ingrediente = i["strIngredient1"];
        vett.push(ingrediente);
    }
    vett.sort();

    for (const v of vett) {
        let opt = document.createElement("option");
        opt.textContent = v;
        opt.value = v;

        lstIngredienti.appendChild(opt);
    }
}
