"use strict"
// table
const opts = document.querySelectorAll("#optWrapper input")
const table = document.querySelector(".list")
const tbody = table.querySelector("tbody")
// details
const details = document.getElementById("details")
const navBtns = document.querySelectorAll("#navButtons input")
const navLabel = document.getElementById("navLabel")
// utility buttons
const utilityBtns = document.querySelectorAll("#utilityButtons input")
// addNew
const modal = document.getElementById('addNewModal');

// Events
opts[0].addEventListener("click", displayData)
opts[1].addEventListener("click", displayData)
navBtns.forEach(function(btn){
    btn.addEventListener("click", naviga)
})

utilityBtns[0].addEventListener("click", eliminaPerNazione)
utilityBtns[1].addEventListener("click", ordina)
utilityBtns[2].addEventListener("click", salva)
utilityBtns[3].addEventListener("click", function(){
    modal.showModal()
})
btnSalva.addEventListener("click", addNew)


//dati filtrati
let filteredData
let currentIndex = 0

// Avvio
let people = loadData(); //people è un vettore enumerativo di JSON (si usa JSON.parse perchè è un elemento valido)
displayData()

function loadData(){
    let peopleString = localStorage.getItem("people");
    if (!peopleString)
        peopleString = peopleStorage
    return JSON.parse(peopleString)
}


function displayData() {
    tbody.innerHTML=""
   
    // const gender = opts.querySelector(":checked").value - NOK
    const gender = document.querySelector(":checked").value
    getFilteredData(gender)
    filteredData.forEach(function(person, i){
            let tr = document.createElement("tr")
            tbody.append(tr)

            let td = document.createElement("td") //NOME
            td.textContent = getName(person.name)
            tr.append(td)

            td = document.createElement("td") //CITTA
            td.textContent = person.location.city
            tr.append(td)

            td = document.createElement("td") //STATO
            td.textContent = person.location.state
            tr.append(td)

            td = document.createElement("td") //NAZIONALITA'
            td.textContent = person.nat
            tr.append(td)

            td = document.createElement("td")
            td.classList.add("icon", "lens")
            td.addEventListener("click", function(){
                currentIndex = i
                showDetails(person, currentIndex)
            })
            tr.append(td)

            td = document.createElement("td")
            td.classList.add("icon", "trash")
            td.addEventListener("click", function(){
                deletePerson(person)
            })
            tr.append(td)
       
    });

    utilityBtns[0].disabled = tbody.innerHTML == ""
    detailsContainer.style.display = "none"
}

function getName(personName){
    return personName.first + " " + personName.last
}

function showDetails(person, currentIndex){
    detailsContainer.style.display = ""
    details.innerHTML = ""

    let p  = document.createElement("p")
    p.textContent = person.email
    details.append(p)

    let img = document.createElement("img")
    img.src = person.picture.large
    details.append(img)

    p = document.createElement("p")
    p.textContent = person.cell
    details.append(p)

    navLabel.textContent = `${currentIndex + 1}/${filteredData.length}`
}

function getFilteredData(gender){
    filteredData = []
    people.forEach(function(person){
        if(person.gender == gender)
            filteredData.push(person)
    });
}

function naviga(){
    switch(this.value){
        case "Primo":
            currentIndex = 0
            break
        case "Indietro":
            if(currentIndex > 0)
                currentIndex--
            break
        case "Avanti":
            if(currentIndex < filteredData.length - 1)
                currentIndex++
            break
        case "Ultimo":
            currentIndex = filteredData.length - 1
            break
    }
    showDetails(filteredData[currentIndex])
}

function deletePerson(person){
    let index = people.indexOf(person)
    people.splice(index, 1)
    alert(getName(person.name) + " rimosso correttamente")
    displayData()
}

function eliminaPerNazione(){
    const nazione = prompt("inserire una nazione:").toUpperCase()
    let length1 = people.length //length di people prima del filtro
    people = people.filter(function(person){
        return person.nat != nazione
    })
    let length2 = people.length
    if(length2 == length1)
        alert("Non ci sono persone appartenenti alla nazione " + nazione)
    else{
        alert(`Eliminate correttamente ${length1 - length2} persone`)
        displayData();
        utilityBtns[0].disabled = tbody.innerHTML == ""
    }
}

let a_z = true
function ordina(){
    people.sort(function(person1, person2){
        let name1 = getNameReversed(person1.name).toUpperCase()
        let name2 = getNameReversed(person2.name).toUpperCase()
        return a_z ? name1.localeCompare(name2) : name2.localeCompare(name1) //ritorna -1 se NON bisogna scambiare, 1 se BISOGNA scambiare, 0 NON bisogna scambiare
    })
    displayData()
    a_z = !a_z
}

function getNameReversed(personName){
    return personName.last + " " + personName.first
}

function salva(){
    let data = JSON.stringify(people)
    localStorage.setItem("people", data)
    //localStorage["people"] = data
    //localeStorage.people = data
    alert("dati salvati correttamente")
}

function addNew(){
    let data = modal.getElementsByTagName("input")
    for(let txt of data){
        if(txt.value.trim() == ""){
            alert("Devi riempire tutti i campi!")
            return
        }
    }

    // {} per JSON [] per vettori
    let person = {
        "gender": txtGender.value.trim(),
         "name":{
            "title": txtGender.value.trim().toLower() == "male" ? "mr" : "miss",
            "first": txtFirst.value.trim(),
            "last": txtList.value.trim()
         },
         "location":{
            "street":"",
            "city": txtCity.value.trim(),
            "state":txtState.value.trim(),
            "postcode":0
         },
         "email": txtEmail.value.trim(),
         "login":{
            "username":"",
            "password":"",
            "salt":"",
            "md5":"",
            "sha1":"",
            "sha256":""
         },
         "dob":"",
         "registered":"",
         "phone": txtPhone.value.trim(),
         "cell":"",
         "id":{
            "name":"",
            "value":null
         },
         "picture":{
            "large":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQezaimYZgF-Sxkguu2h6FQYhQbHGDaO7jBbf44JrUMuw&s",
            "medium":"",
            "thumbnail":""
         },
         "nat":txtNat.value.trim()
    }
    people.push(person)
    salva()
    displayData()
}

