"use strict"

const content = document.getElementById("content")
const btnSearch = document.getElementById("btn-search");
btnSearch.addEventListener("click", showAlert);

//avvio
loadData()


function loadData(){
    let products = pc
    let imgFolder = "/pc"
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
        img.classList.add("card-img-top", "lazy")
        img.src = "./img" + imgFolder + "/img" + product[0] + ".jpg"
        card.append(img)
    }

}

function showAlert(){

}