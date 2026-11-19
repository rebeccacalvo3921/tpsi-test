"use strict";

const txtId = document.getElementById("txtId");
const txtName = document.getElementById("txtName");
const lstIngredients = document.getElementById("lstIngredients");
const optAlcoholic = document.getElementById("optAlcoholic");
const optNotAlcoholic = document.getElementById("optNotAlcoholic");
const btnSalva = document.getElementById("btnSalva");
const btnAnnulla = document.getElementById("btnAnnulla");

let dbCocktails = [];
let dbIngredients = [];

window.addEventListener("load", function () {
    // Caricamento DB da localStorage o file
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

    // Precaricamento listbox ingredienti in ordine alfabetico crescente
    let ingOrdinate = [...dbIngredients].sort();
    for (let ing of ingOrdinate) {
        let op = document.createElement("option");
        let nomeIng = typeof ing === "string" ? ing : (ing.strIngredient1 || ing.name || ing);
        op.value = nomeIng;
        op.text = nomeIng;
        lstIngredients.appendChild(op);
    }

    // Gestione pulsante Salva
    btnSalva.addEventListener("click", function () {
        let id = txtId.value.trim();
        let name = txtName.value.trim();
        let mainIng = lstIngredients.value;
        let alcoholic = optAlcoholic.checked ? "Alcoholic" : "Non Alcoholic";

        if (!id || !name) {
            alert("Attenzione: compilare tutti i campi obbligatori (ID e Name).");
            return;
        }

        // Controllo se l'ID esiste già
        let esiste = dbCocktails.some(c => c.idDrink == id);
        if (esiste) {
            alert("Errore: ID già esistente nel database!");
            return;
        }

        // Creazione nuovo cocktail con immagine predefinita cocktail.jpg
        let nuovoCocktail = {
            idDrink: id,
            strDrink: name,
            strAlcoholic: alcoholic,
            strIngredient1: mainIng,
            strDrinkThumb: "./cocktail.jpg"
        };

        dbCocktails.push(nuovoCocktail);

        // Aggiunta eventuale dell'ingrediente se non presente nel DB ingredienti
        if (!dbIngredients.includes(mainIng)) {
            dbIngredients.push(mainIng);
            localStorage.setItem("ingredients", JSON.stringify(dbIngredients));
        }

        // Salvataggio nel LocalStorage
        localStorage.setItem("cocktails", JSON.stringify(dbCocktails));

        // Ritorno alla pagina principale
        window.location.href = "index.html";
    });

    // Gestione pulsante Annulla
    btnAnnulla.addEventListener("click", function () {
        window.location.href = "index.html";
    });
});