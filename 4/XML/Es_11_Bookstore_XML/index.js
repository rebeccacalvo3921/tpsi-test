'use strict'

//pointers
const listView = document.getElementById("list-view");
const divNbooks = listView.querySelector(".nBooks")
const tBody = listView.querySelector("tbody");

const detailsView = document.getElementById("details-view");
detailsView.style.display = "none"
const details = detailsView.querySelector(".details")
const pageLabel = detailsView.querySelector("span")

const addView = document.getElementById("add-view");
addView.style.display = "none"
const newBook = addView.querySelector(".details")

const headerButtons = document.getElementsByClassName("headerBtn");
const btnListView = headerButtons[0]
const btnDetailsView = headerButtons[1]
const btnAddView = headerButtons[2]
const btnSave = headerButtons[3]

let id, titolo, categoria, lingua, autori, anno, prezzo //7 variabili globali

//avvio del codice
btnListView.classList.add("active")
let bookstore = localStorage.getItem("bookstore")
if (!bookstore) {
    bookstore = datiIniziali
}
console.log(bookstore)

//parsing
const parser = new DOMParser
const xmlDoc = parser.parseFromString(bookstore, "text/xml")

//accediamo alla radice e prendiamo mxlroot
const xmlRoot = xmlDoc.firstElementChild
loadBooks()


function loadBooks(params) {
    tBody.innerHTML = ""
    //scorriamo i libri nel bookstore con un forof
    for (const book of xmlRoot.children) { //si scorrono tutti i children di xmlRoot
        readFields(book)
    }

}


function readFields(book) {
    id = book.getElementsByTagName("id")[0].textContent
    titolo = book.querySelector("title").textContent
    categoria = book.getAttribute("category") //in xml di possono solo usare atributi statici
    // NO -> categoria = book.category -> questo è per gli attributi dinamici
    lingua = book.querySelector("title").getAttribute("lang")
    for (const author of book.getElementsByTagName("author")) {
        autori += author.textContent + " - "
    }
    autori = autori.substring(0, autori.length - 3)
    anno = book.getElementsByTagName("year")[0].textContent
    prezzo = book.querySelector("price").textContent
    console.log(id, titolo, categoria, lingua, autori, anno, prezzo)
}