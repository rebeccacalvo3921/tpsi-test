"use strict";

window.addEventListener("DOMContentLoaded", function () {
    const txtId = document.getElementById("txtId");
    const txtName = document.getElementById("txtName");
    const lstIngredients = document.getElementById("lstIngredients");
    const optAlcoholic = document.getElementById("optAlcoholic");
    const optNotAlcoholic = document.getElementById("optNotAlcoholic");
    const btnSalva = document.getElementById("btnSalva");
    const btnAnnulla = document.getElementById("btnAnnulla");

    let cocktailsList;
    if (localStorage.getItem("cocktailsDB")) {
        cocktailsList = JSON.parse(localStorage.getItem("cocktailsDB"));
    } else {
        let cocktailsPulito = cocktails.replace(/[\u0000-\u001F]+/g, " ");
        cocktailsList = (new Function("return " + cocktailsPulito))().drinks;
    }

    let ingredientsPulito = ingredients.replace(/[\u0000-\u001F]+/g, " ");
    let ingredientsList = (new Function("return " + ingredientsPulito))().ingredients;
    ingredientsList.sort((a, b) => a.strIngredient1.localeCompare(b.strIngredient1));

    for (let item of ingredientsList) {
        let opt = document.createElement("option");
        opt.value = item.strIngredient1;
        opt.textContent = item.strIngredient1;
        lstIngredients.appendChild(opt);
    }

    optAlcoholic.addEventListener("change", function () {
        if (optAlcoholic.checked) optNotAlcoholic.checked = false;
    });
    optNotAlcoholic.addEventListener("change", function () {
        if (optNotAlcoholic.checked) optAlcoholic.checked = false;
    });

    btnSalva.addEventListener("click", function () {
        let idVal = txtId.value.trim();
        let nameVal = txtName.value.trim();
        let ingVal = lstIngredients.value;

        if (idVal === "" || nameVal === "") {
            alert("Compilare tutti i campi!");
            return;
        }

        let esiste = cocktailsList.some(drink => drink.idDrink === idVal);
        if (esiste) {
            alert("Errore: ID già esistente!");
            return;
        }
        let alcVal = optAlcoholic.checked ? "Alcoholic" : "Non alcoholic";
        let nuovoCocktail = {
            idDrink: idVal,
            strDrink: nameVal,
            strAlcoholic: alcVal,
            strIngredient1: ingVal,
            strDrinkThumb: "./cocktail.jpg"
        };
        cocktailsList.push(nuovoCocktail);
        localStorage.setItem("cocktailsDB", JSON.stringify(cocktailsList));
        window.location.href = "index.html";
    });

    btnAnnulla.addEventListener("click", function () {
        window.location.href = "index.html";
    });
});