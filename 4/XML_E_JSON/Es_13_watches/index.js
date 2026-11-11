"use strict";

const table = document.getElementsByTagName("table")[0]
const tbody = table.querySelector("tbody")

const gender = document.querySelector(".gender")
const lstGender = gender.querySelector("select")

const btnInserisci = document.getElementsByClassName("inserisci")[0]

let orologi = loadDtata()

lstGender.addEventListener("change", function () {
    displayData(lstGender.value)
})

btnInserisci.addEventListener("click", function(){
    window.open("inserisci.html", "_blank")
})

displayData()

function loadDtata() {
    let orologi = localStorage.getItem("orologi")
    if (!orologi)
        orologi = JSON.parse(datiIniziali)
    return orologi
}


function displayData(genere) {
    tbody.innerHTML = ""

    orologi.forEach(function (orologio) {
        if (genere == undefined || genere == "All" || genere == orologio.gender) {

            orologio.models.forEach(function (model) {
                model.watches.forEach(function (watch) {
                    const gender = orologio.gender
                    const code = model.code
                    const price = model.price
                    const color = watch.color
                    const img = watch.image
                    visualizza(gender, code, price, color, img)
                });
            });
        }
    });
}

function visualizza(...items){
    const tr = document.createElement("tr")
    tbody.append(tr)

    items.forEach((items, i) => {
        const td = document.createElement("td")
        tr.append(td)
        if(i!= 4){
            td.innerHTML = items
        }
        else{
            const img = document.createElement("img")
            td.append(img)
            img.src = `./img/${items}`
        }
    })
}


