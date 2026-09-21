"use strict"

let films = [
    // Id, Title, Favorite, Watch date, Rating (0-5)
    [1, "Pulp Fiction", false, "10-03-2024", 2],
    [2, "21 Grammi", false, "17-03-2024", 3],
    [3, "Star Wars", true, "15-03-2024", 5],
    [4, "Matrix", false, "01-01-2023", 2],
    [5, "Shrek", false, "21-03-2024", 2],
    [6, "Kill Bill Vol. 1", false, "22-04-2024", 1],
    [7, "Inception", false, "18-04-2024", 3]
];

let tBody = document.getElementsByTagName("tbody")[0]

addEventListeners()
visualizza()

function addEventListeners(){
    let btnAdd = document.getElementById("btn-add") //javascript rende disponibile un puntatore dello stesso nome dell'id, quindi questa riga non serve
    btnAdd.addEventListener("click", addNewFilm)
    let btnClear = document.getElementById("btn-clear")
    btnClear.addEventListener("click", puisciLista)
}



function visualizza(){
    tBody.innerHTML = ""
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


function addNewFilm(){
    let id = films.length + 1
    let title = prompt("Inserire il titolo del nuovo film")
    let aus = prompt("Il film è uno dei tuoi preferiti?")
    let favorite = aus == "si" ? true : false
    let today = (new Date()).toLocaleDateString().replaceAll("/", "-")

    let rating = parseInt(prompt("Quanto valuti il nuovo film nuovo film"))

    let film = [] 
    film.push(id) 
    film.push(title)  
    film.push(favorite)
    film.push(today) 
    film.push(rating)

     
    films.push(film)
    visualizza()
}

function puisciLista(){
    films = []
    visualizza()
}


function random(min, max){
    return ((max-min)*Math.floor(Math.random())) + min
}