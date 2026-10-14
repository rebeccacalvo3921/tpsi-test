'use strict'

//pointers
const listView = document.getElementById("list-view");
const divNbooks = listView.querySelector(".nBooks")
const tBody = listView.querySelector("tbody");

const detailsView = document.getElementById("details-view");
detailsView.style.display="none"
const details = detailsView.querySelector(".details")
const pageLabel = detailsView.querySelector("span")

const addView = document.getElementById("add-view");
addView.style.display="none"
const newBook = addView.querySelector(".details")

const headerButtons = document.getElementsByClassName("headerBtn");
const btnListView = headerButtons[0]
const btnDetailsView = headerButtons[1]
const btnAddView = headerButtons[2]
const btnSave = headerButtons[3]

//avvio del codice
btnListView.classList.add("active")
let bookstore = localStorage.getItem("bookstore")
if(!bookstore){
    bookstore = datiIniziali
}
console.log(bookstore)

//parsing
const parser = new DOMParser
const xmlDoc = parser.parseFromString(bookstore, "text/xml")
