"use strict"

const navbarContent = document.getElementById("navbarContent");
const tbody = document.getElementsByTagName("tbody")[0];

const btnLogin = document.getElementById("btnLogin")
const alertLogin = document.getElementById("alert-login")
const btnClose = document.querySelector(".alert .btn-close")
btnLogin.addEventListener("click", function () { alertLogin.classList.remove("d-none") 
    setTimeout(function() {
    alertLogin.classList.add("d-none");
    }, 3000);})
btnClose.addEventListener("click", function () { alertLogin.classList.add("d-none") })

const menu = document.querySelectorAll(".dropdown-menu li")
let filtroPrec = menu[0]
for (let li of menu) {
    li.addEventListener("click", filtro)
}

const modaleDettagli = new bootstrap.Modal("#modal-details")


const modaleLibroNuovo = new bootstrap.Modal("#modal-add-newbook")
const btnNuovoLibro = document.querySelector(".nav-item .btn")
btnNuovoLibro.addEventListener("click", AggiungiLibro)
const SalvaLibro = document.querySelector(".modal-footer .btn-success")
SalvaLibro.addEventListener("click", Salva)

let bb = biblioteca
loadLibri();


function loadLibri(category = "All") {
    tbody.innerHTML = ""
    for (let libro of bb) {
        if (category == "All" || libro[4] == category) {
            //riga
            const row = document.createElement("tr")
            tbody.append(row)

            //cella
            for (let i = 0; i < libro.length + 1; i++) {
                const cell = document.createElement("td")
                if (i % 2 == 0 && i != 6 && i != 8 || i == 1)
                    cell.textContent = libro[i]
                else if (i == 6) {
                    stelle(libro[i], cell)
                }
                else if (i > 6) {
                    let tasto = document.createElement("i")
                    tasto.dataset.libroID = `${libro[0]}`
                    if (i == 7) {
                        tasto.classList.add("bi-search")
                        tasto.addEventListener("click", dettagli)
                    }
                    else {
                        tasto.classList.add("bi-trash")
                        tasto.addEventListener("click", elimina)
                    }
                    cell.append(tasto)
                }
                if (cell.innerHTML != "")
                    row.append(cell)
            }
        }
    }
}

function stelle(s, cell) {

    let rating
    //rating
    if (s < 1_000_000)
        rating = 1
    else if (s < 30_000_000)
        rating = 2
    else if (s < 60_000_000)
        rating = 3
    else if (s < 100_000_000)
        rating = 4
    else
        rating = 5

    //aggiunta stelle
    for (let i = 0; i < 5; i++) {
        let star = document.createElement("i")
        if (i < rating)
            star.classList.add("bi", "bi-star-fill")
        else
            star.classList.add("bi", "bi-star")
        cell.append(star)
    }
}

function filtro(e) {
    filtroPrec.classList.remove("active")
    e.target.classList.add("active")
    filtroPrec = e.target
    loadLibri(e.target.textContent)
}

function dettagli(e) {
    const card = document.getElementsByClassName("card")[0]
    card.innerHTML = ""
   
    let ID = Number(e.target.dataset.libroID)
    let i = 0
    while (biblioteca[i][0] != ID)
        i++;

    const h2 = document.createElement("h2")
    h2.classList.add("card-title", "text-center", "mb-3")
    h2.textContent = biblioteca[i][1]

    const img = document.createElement("img")
    img.src = "./img/" + biblioteca[i][7]
    img.classList.add("mx-auto", "d-block", "mb-3", "w-50")
    img.alt = biblioteca[i][1]
    card.append(h2, img)

    const div = document.createElement("div")
    card.append(div)

    let campi = ["Id", "Autore", "Anno", "Genere", "Pagine", "Copie Vendute"]
    let j = 0
    for (let campo of campi) {
        let riga = document.createElement("div")
        riga.classList.add("row", "mb-2")
        div.append(riga)

        let col1 = document.createElement("div")
        col1.classList.add("col-4", "fw-bold", "text-end")
        col1.textContent = campo

        let col2 = document.createElement("div")
        col2.classList.add("col-8")

        let txtInput = document.createElement("input")
        txtInput.type = "text"
        txtInput.readOnly = "true"
        txtInput.classList.add("form-control")
        txtInput.value = biblioteca[i][j]
        col2.append(txtInput)
        riga.append(col1, col2)
        if(j == 0)
            j++
        j++
    }
    modaleDettagli.show()
}

function elimina(e) {
    let IDlibro = Number(e.target.closest('tr').children[0].textContent)
    let i = 0
    while(bb[i][0] != IDlibro)
        i++
    bb.splice(i, 1)
    loadLibri()
   
}

function AggiungiLibro(){
    modaleLibroNuovo.show()
}

function Salva(){
    let campi = modaleLibroNuovo._element.querySelectorAll(`input`)
    for(let campo of campi)
        if(campo.value == "")
            return
    for(let i = 0; i < biblioteca.length; i++)
        if(Number(campi[0]) == biblioteca[i][0])
            return
   
    biblioteca.push([Number(campi[0].value), campi[1].value, campi[2].value, campi[3].value, campi[4].value, campi[5].value, campi[6].value, campi[7].value])
    modaleLibroNuovo.hide()
    loadLibri()
}
