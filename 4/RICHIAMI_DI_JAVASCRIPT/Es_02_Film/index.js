"use strict"

let films = [
    // Id, Title, Favorite, Watch date, Rating (0-5)
    [1, "Pulp Fiction", false, "10-03-2024", 2],
    [2, "21 Grammi", false, "17-03-2024", 3],
    [3, "Star Wars", true, "15-03-2024", 5],
    [4, "Matrix", false, "01-01-2023", 2],
    [5, "Shrek", false, "21-03-2024", 2],
    [6, "Kill Bill Vol. 1", false, "22-04-2024", 1],
    [7, "Inception", false, "18-04-2024", 3],
    [8, "Avatar", true, "18-03-2016", 5]
];

let tBody = document.getElementsByTagName("tbody")[0]
// const btnLoginClose = document.getElementsByClassName("btn-close")[1]
const btnLoginClose = document.querySelector(".alert .btn-close")
const modal = new bootstrap.Modal("#modal-count-films")
const alertLogin = document.getElementById("alert-login");
addEventListeners()
visualizza()

function addEventListeners(){
    let btnAdd = document.getElementById("btn-add")
    btnAdd.addEventListener("click", addNewFilm)

    let btnClear = document.getElementById("btn-clear")
    btnClear.addEventListener("click", pulisciLista)

    let btnReload = document.getElementById("btn-reload")
    btnReload.addEventListener("click", function(){
        //entrambe ricaricano la pagina
        window.location.reload()
        window.location.href = "./index.html"
    })

    let btnConta = document.getElementById("btn-count")
    btnConta.addEventListener("click", contaFilm)

    let btnLogin = document.getElementById("btn-login")
    btnLogin.addEventListener("click", visualizzaLogin)

    btnLoginClose.addEventListener("click", function(){
        alertLogin.classList.add("d-none"); // nasconde alert login
    })
}

function visualizza() {
    tBody.innerHTML = ""
    for (const film of films) {
        let row = document.createElement("tr")
        tBody.appendChild(row)

        for (let i = 0; i < film.length; i++) {
            const field = film[i]
            let cell = document.createElement("td")
            row.appendChild(cell)
            if (i == 2) {
                // campo preferito
                createPreferitoInnerHtml(cell, field)
            }
            else if (i == 4) {
                //campo rating
                createRatingInnerHtml(cell, field)
            }
            else
                cell.innerHTML = field
        }
    }
}


function createPreferitoInnerHtml(cell, field) {
    let check = document.createElement("input");
    check.type = "checkbox"
    check.disabled = true
    check.checked = field
    cell.appendChild(check)
}

function createRatingInnerHtml(cell, ratingValue) {
    for (let i = 0; i < 5; i++) {
        let star = document.createElement("i")
        if (i < ratingValue) {
            star.classList.add("bi", "bi-star-fill")
        }
        else {
            star.classList.add("bi", "bi-star")
        }
        cell.appendChild(star)
    }
}

function addNewFilm(){
    let id = films.length + 1
    let title = prompt("Inserire il titolo del nuovo film")
    let aus = prompt(`Il film ${title} è uno dei tuoi preferiti?`)
    let favorite = aus == "si" ? true : false
    let today = (new Date()).toLocaleDateString().replaceAll("/", "-")

    let rating = parseInt(prompt("Quanto valuti il nuovo film da 1 a 5?"))

    let film = [] 
    film.push(id) 
    film.push(title)  
    film.push(favorite)
    film.push(today) 
    film.push(rating)

     
    films.push(film)
    visualizza()
}


function pulisciLista(){
    films = []
    visualizza()
}

function contaFilm(){
    const span = document.getElementById("span-n-films")
    span.textContent = films.length
    modal.show();
}

function visualizzaLogin(){
    alertLogin.classList.remove("d-none"); // visualizza
    setTimeout(function() {
    alertLogin.classList.add("d-none");
    }, 3000);
    
}

function random(min, max){
    return Math.floor(Math.random() * (max- min) + min)
}