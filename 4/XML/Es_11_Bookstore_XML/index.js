'use strict'

const listView = document.getElementById("list-view");
const divNbooks = listView.querySelector(".nBooks")
const tBody = listView.querySelector("tbody");

const detailsView = document.getElementById("details-view");
const details = detailsView.querySelector(".details")
const pageLabel = detailsView.querySelector("span")

const addView = document.getElementById("add-view");
const newBook = addView.querySelector(".details")

//NAVBAR SUPEERIORE
const headerBtns = document.getElementsByClassName("headerBtn")
const btnListView = headerBtns[0]
const btnDetailsView = headerBtns[1]
const btnAddView = headerBtns[2]
const btnSave = headerBtns[3]

const container = document.getElementById("container")

//tutti  i button dentro detailsView
const navButtons = detailsView.querySelectorAll("button")
const btnPrimo = navButtons[0]
const btnDietro = navButtons[1]
const btnAvanti = navButtons[2]
const btnUltimo = navButtons[3]
const btnElimina = navButtons[4]

const btnAdd = addView.querySelector(".button")

let id, titolo, categoria, lingua, autore, anno, prezzo // campi tabella
let detailIndex = 0

// carico il bookstore
let bookstore =  localStorage.getItem("bookstore")
if(!bookstore)
    bookstore = datiIniziali

//parsing del bookstore
const Parser = new DOMParser()
const xmlDoc = Parser.parseFromString(bookstore, "text/xml")

// prendiamo xmlRoot
const xmlRoot = xmlDoc.firstElementChild

//avvio
showList()

// listener di evento
// gestiamo la lista dettagli
btnDetailsView.addEventListener("click", showDetails)
btnListView.addEventListener("click", showList)
btnAddView.addEventListener("click", showAdd)
//pulsanti di navigazione
for (const btn of navButtons) {
    btn.addEventListener("click", navigaDettagli)
}

function loadBooks(){
    
    tBody.innerHTML = ""
    for(let book of xmlRoot.children){
        readFields(book)
        let tr = document.createElement("tr")
        tBody.append(tr)

        let td = document.createElement("td")
        td.textContent = id
        tr.append(td)

        td = document.createElement("td")
        td.textContent = titolo
        tr.append(td)

        td = document.createElement("td")
        td.textContent = categoria
        tr.append(td)

        td = document.createElement("td")
        td.textContent = lingua
        tr.append(td)

        td = document.createElement("td")
        td.textContent = autore
        tr.append(td)

        td = document.createElement("td")
        td.textContent = anno
        tr.append(td)

        td = document.createElement("td")
        td.textContent = prezzo
        tr.append(td)

        td = document.createElement("td")
        let btn = document.createElement("button")
        btn.textContent = "Delete"
        td.append(btn)
        tr.append(td)

        btn.addEventListener("click", function(){
            deleteBook(book)
            showList()
        })
    }

}

function loadDetails(){
    details.innerHTML = ""
    if(xmlRoot.children.length > 0){
        const book = xmlRoot.children[detailIndex]
        readFields(book)
        createDetailLine("Id", id)
        createDetailLine("Titolo", titolo)
        createDetailLine("Categoria", categoria)
        createDetailLine("Lingua", lingua)
        createDetailLine("Autori", autore)
        createDetailLine("Anno", anno)
        createDetailLine("Prezzo", prezzo)
        abilitaPulsanti(true)
        pageLabel.textContent = (detailIndex + 1) + "/" + xmlRoot.children.length
    }
    else{
        abilitaPulsanti(false)
        pageLabel.textContent = "/"
    }
}

function abilitaPulsanti(bool){
    for (const btn of navButtons) {
        btn.disabled = !bool
    }
}

function createDetailLine(key, value){
    let lbl = document.createElement("label")
    lbl.textContent = key + ": "
    let p = document.createElement("p")
    p.textContent = value
    details.append(lbl, p)
    
}

function readFields(book){
    id = book.getElementsByTagName("id")[0].textContent
    titolo = book.querySelector("title").textContent
    categoria = book.getAttribute("category") //accediamo agli attributi statici usiamo getAttribute() o  per quelli dinamici usiamo il . 
    lingua = book.querySelector("title").getAttribute("lang") || "" //usando  || diamo una possibilità a usare la "" se non ce il tag che cerchaimo
    autore = ""
    for(let author of book.getElementsByTagName("author")){
        autore += author.textContent + " - " 
    }
    autore = autore.substring(0, autore.length - 3)
    anno = book.getElementsByTagName("year")[0]?.textContent || "" //con il punto di domanda scrivo un if implicita che controlla se esista il tag year
    prezzo = book.getElementsByTagName("price")[0]?.textContent || ""

    console.log(id, titolo, categoria, lingua, autore, anno, prezzo)
}

function showDetails(){
    resetDivs()
    detailsView.style.display = ""
    btnDetailsView.classList.add("active")
    loadDetails()

}

function showList(){
    resetDivs()
    listView.style.display = ""
    btnListView.classList.add("active")
    loadBooks()
}

function showAdd(){
    resetDivs()
    addView.style.display = ""
    btnAddView.classList.add("active")
    loadDetails()
}

function resetDivs(){
    for(let  div of container.children){
        div.style.display = "none"
        for (const btn of headerBtns) {
            btn.classList.remove("active")
        }
    }
}

function navigaDettagli(){
    switch(this.textContent){
        case "Primo":
            detailIndex = 0
            break
        case "Indietro":
            detailIndex = detailIndex > 0 ? detailIndex - 1 : detailIndex
            break
        case "Avanti":
            detailIndex = detailIndex < xmlRoot.children.length - 1 ? detailIndex + 1 : detailIndex
            break
        case "Ultimo":
            detailIndex = xmlRoot.children.length - 1
            break
        case "Elimina":
            deleteBook(xmlRoot.children[detailIndex])
            break
    }
    loadDetails()
}

function deleteBook(book){
    book.remove()
    detailIndex = 0
}

btnAdd.addEventListener("click", function(){
    const book = xmlDoc.createElement("book")
    book.setAttribute("category", txtCategoria.value)
    xmlRoot.append(book)

    const id = xmlDoc.createElement("id")
    id.textContent = txtId.value

    const titolo = xmlDoc.createElement("title")
    titolo.textContent = txtTitolo.value
    titolo.setAttribute("lang", txtLingua.value)

    book.append(id, titolo)

    const autoriString = txtAutori.value
    const autoriVett = autoriString.split(' - ')
    for(const autore of autoriVett){
        const autori = xmlDoc.createElement("author", autore)
        autori.textContent = autore
        book.append(autori)
    }

    const anno = xmlDoc.createElement("year")
    anno.textContent = txtAnno.value
    
    const prezzo = xmlDoc.createElement("price")
    prezzo.textContent = txtPrezzo.value
    book.append(anno, prezzo)

    showList()

})

btnSave.addEventListener("click", function(){
    const serializer = new XMLSerializer()
    const xml = serializer.serializeToString(xmlDoc)
    localStorage.setItem("bookstore", xml)
    alert("dati salvati correttamente")
})