"use strict"

const navbarContent = document.getElementById("navbarContent");
const tbody = document.getElementsByTagName("tbody")[0];

visualizzaLibri();

function visualizzaLibri(){
    for (let i = 0; i < biblioteca.length; i++) {
        const libro = biblioteca[i];
        const tr = document.createElement("tr")
        tbody.append(tr);

        const tdId = document.createElement("td")
        tdId.textContent = libro[0]
        const tdTitolo = document.createElement("td")
        tdTitolo.textContent = libro[1]
        const tdAutore = document.createElement("td")
        tdAutore.textContent = libro[2]
        const tdGenere = document.createElement("td")
        tdGenere.textContent = libro[4]
        const tdCopieVendute = document.createElement("td")
        tdCopieVendute.textContent = libro[6]
        const tdSearch = document.createElement("td")
        tdSearch.innerHTML = '<i class = "bi bi-search"><i>'
        const tdTrash = document.createElement("td")
        tdTrash.innerHTML = '<i class = "bi bi-trash"><i>'
        tr.append(tdId, tdTitolo, tdAutore, tdGenere, tdCopieVendute, tdSearch, tdTrash)
    }
}