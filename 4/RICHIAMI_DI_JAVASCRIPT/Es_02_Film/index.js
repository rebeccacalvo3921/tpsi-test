"use strict"

const films = [
    // Id, Title, Favorite, Watch date, Rating (0-5)
    [1, "Pulp Fiction", false, "10-03-2024", 2],
    [2, "21 Grammi", false, "17-03-2024", 3],
    [3, "Star Wars", true, "15-03-2024", 5],
    [4, "Matrix", false, "01-01-2023", 2],
    [5, "Shrek", false, "21-03-2024", 2],
    [6, "Kill Bill Vol. 1", false, "22-04-2024", 1],
    [7, "Inception", false, "18-04-2024", 3]
];

/*
    const films = [
    // Id, Title, Favorite, Watch date, Rating (0-5)
    [1, "Avatar", true, "10-02-2016", 5],
    [2, "Back To The Future", true, "17-03-2012", 5],
    [3, "Star Wars: Revenge Of The Sith", true, "15-03-2024", 5],
    [4, "The Hangover", false, "28-12-2025", 4],
    [5, "Avatar: The Way Of Water", true, "22-12-2024", 5],
    [6, "The 4:30 Movie", true, "28-07-2026", 5],
    [7, "Gladiator II", false, "18-04-2025", 4]
];
*/

let tBody = document.getElementsByTagName("tbody")[0]

for (const film of films) {
    let row = document.createElement("tr")
    tBody.appendChild(row)
    for (let i = 0; i < film.length; i++) {
        const field = film[i]
        let cell = document.createElement("td")
        row.appendChild(cell)
        if (i == 2) {
            // è il campo "preferito"
            createPreferitoInnerHTML(cell, field)
        } else if (i == 4) {
            // è il campo rating
            createRatingInnerHTML(cell, field)
        } else {
            // altro campo, lo tratto come stringa
            cell.innerHTML = field
        }
    }
}

function createPreferitoInnerHTML(cell, preferitoValue) {
    let check = document.createElement("input")
    check.type = "checkbox"
    check.disabled = true
    check.checked = preferitoValue
    cell.appendChild(check)
}


function createRatingInnerHTML(cell, ratingValue) {
    for (let i = 0; i < 5; i++) {
        let star = document.createElement("i")
        if(i < ratingValue){
            star.classList.add("bi", "bi-star-fill")
        }
        else{
            star.classList.add("bi", "bi-star")
        }
        cell.appendChild(star)
    }
}