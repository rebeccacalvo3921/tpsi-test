"use strict"

const content = document.getElementById("content")
const btnSearch = document.getElementById("btn-search");
btnSearch.addEventListener("click", showAlert);
const buyModal = new bootstrap.Modal("#buy-modal", { "backdrop": "static" }) //istanziare la modal
const alertSearch = document.getElementById("alert-search")
const dropdownItems = document.getElementsByClassName("dropdown-item")
for (const item of dropdownItems) {
    item.addEventListener("click", dropdownClick)
}

let lastDropdown = dropdownItems[0]
function dropdownClick(event) {
    lastDropdown.classList.remove("active")
    event.target.classList.add("active")
    loadData(event.target.textContent)
    lastDropdown = event.target
}

//avvio
loadData("PC")


function loadData(category) {

    let products;
    let imgFolder = "/"
    switch (category) {
        case "PC":
            products = pc
            imgFolder += "pc"
            break;
        case "Telefoni":
            products = telefoni
            imgFolder += "telefoni"
            break;
        case "Tv":
            products = tv
            imgFolder += "tv"
            break;
        case "Audio Player":
            products = player
            imgFolder += "player"
            break;
    }
    content.innerHTML = ""

    //sottotitolo
    const h3 = document.createElement("h3")
    h3.textContent = "Numero di prodotti: " + products.length
    content.append(h3)

    //riga unica
    const row = document.createElement("div")
    row.classList.add("row")
    content.append(row)

    // ciclo di visualizzazione dei singoli prodotti
    for (let product of products) {
        const divWrapper = document.createElement("div")
        divWrapper.classList.add("col-md-4")
        row.append(divWrapper)

        //card
        const card = document.createElement("div")
        card.classList.add("card", "shadpw-mg", "border-0", "rounded-3")
        divWrapper.append(card)

        //immagine
        const img = document.createElement("img")
        img.classList.add("card-img-top")
        img.style.maxHeight = "360px"
        img.style.objectFit = "contain"
        img.src = "./img" + imgFolder + "/img" + product[0] + ".jpg"
        card.append(img)

        //card body 
        const cardBody = document.createElement("div")
        cardBody.classList.add("card-body")
        card.append(cardBody)

        //card body > h5
        const h5 = document.createElement("h5")
        h5.classList.add("card-title")
        h5.textContent = product[1]
        cardBody.append(h5)

        //card body > p
        const p = document.createElement("p")
        p.classList.add("card-text")
        p.innerHTML = `Brand: ${product[2]}<br>Display: ${product[3]}<br>Processor: ${product[4]}<br>RAM: ${product[5]}<br>Storage: ${product[6]}<br>`
        cardBody.append(p)

        //card body > a
        const a = document.createElement("a")
        a.classList.add("btn", "btn-secondary")
        a.textContent = "COMPRA"
        a.addEventListener("click", function () {
            buyModal.show()
        })
        cardBody.append(a)

    }

}

function showAlert() {
    alertSearch.classList.remove("d-none")
    setTimeout(function () {
        alertSearch.classList.add("d-none")
    }, 3000);
}