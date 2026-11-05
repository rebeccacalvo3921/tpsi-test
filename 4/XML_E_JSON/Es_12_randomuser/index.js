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

navBtns.forEach(function(button){
    button.addEventListener("click", naviga)
})

utilityBtns[0].addEventListener("click", eliminaPernazione)
utilityBtns[1].addEventListener("click", ordina)
utilityBtns[2].addEventListener("click", salva)
utilityBtns[3].addEventListener("click", function(){ modal.showModal() })
btnSalva.addEventListener("click", addNew)

//data filtrati
let fileredData
let currentIndex = 0

// Avvio
const people = loadData();
displayData()


/* - - - - - funtion - - - - - */

function loadData(){
    let peopleString = localStorage.getItem("people");
    if (!peopleString)
        peopleString = peopleStorage
    return JSON.parse(peopleString)
}


function displayData() {
    tbody.innerHTML=""
   
    // const gender = opts.querySelector(":checked").value - NOK
    const gender = optWrapper.querySelector(":checked").value
    console.log(people, gender)

    getFilteredData(gender)

    fileredData.forEach(function (person, index){
            const tr = document.createElement("tr")
            tbody.append(tr)

            let td = document.createElement("td")
            td.textContent = getName(person.name)
            tr.append(td)

            td = document.createElement("td")
            td.textContent = person.location.city
            tr.append(td)

            td = document.createElement("td")
            td.textContent =person.location.state
            tr.append(td)

            td = document.createElement("td")
            td.textContent =person.nat
            tr.append(td)

            td = document.createElement("td")
            td.classList.add("icon", "lens")
            td.addEventListener("click", function(){
                currentIndex = index
                showDetail(person)
            })
            tr.append(td)

            td = document.createElement("td")
            td.classList.add("icon", "trash")
            td.addEventListener("click", function(){
                removePerson(person)
            })
            tr.append(td)
    });
    detailsContainer.style.display = "none"
}

function getName(personName){
    return `${personName.first} ${personName.last}`
}

function getNameForSort(personName){
    return `${personName.last} ${personName.first}`
}

function showDetail(person){
    detailsContainer.style.display = ""
    details.innerHTML = ""

    let p = document.createElement("p")
    p.textContent = person.email
    details.append(p)

    let img = document.createElement("img")
    img.style.maxWidth = "150px"
    img.src = person.picture.large
    details.append(img)

    p = document.createElement("p")
    p.textContent = person.cell
    details.append(p)

    navLabel.textContent = `${currentIndex + 1}/${fileredData.length}`
}


function getFilteredData(gender){
    fileredData = []
    people.forEach(function(person){
        if(person.gender == gender){
            fileredData.push(person)
        }
    })
    return fileredData
}

function naviga(){
    switch(this.value){
        case "Primo":
            currentIndex = 0
            break;
        case "Indietro":
            if(currentIndex > 0){
                currentIndex--
            }
            break;
        case "Avanti":
            if(currentIndex < fileredData.length - 1){
                currentIndex++
            }
            break;
        case "Ultimo":
            currentIndex = 19
            break;
        default:
            break;
    }
    showDetail(fileredData[currentIndex])

}

function removePerson(person){
    let index = people.indexOf(person)
    people.splice(index, 1)
    alert(getName(person.name) + " rimosso correttamente")
    displayData()
}

function eliminaPernazione(){
    const nazione = prompt("inesire una nazione")
}

let a_z = true
function ordina(){
    people.sort(function (item1, item2){
        let n1 = getNameForSort(item1.name)
        let n2 = getNameForSort(item2.name)
        return a_z ? n1.localeCompare(n2) : n2.localeCompare(n1)
    })
    displayData()
    a_z = !a_z
}

function salva(){
    let data = JSON.stringify(people)
    //localStorage.setItem("people", data)
    //localStorage["people"] = data        
    localStorage.people = data          // sono la stessa cosa ma le prime due sono parametrizzabili
    alert("Dati salvati correttamente")
}

function addNew(){
    //controllo validità dati
    let inputData = Array.from(modal.getElementsByTagName("input"))
    /*inputData.forEach(function (input){   //foreach non può essere interrotto
        if(input.value.trim() == ""){
            alert("dati incompleti")
            badData = true
            return
        }
    });*/
    for (const input of inputData) {
        if(input.value.trim() == ""){
            alert("dati incompleti")
            return
        }
    }
    if(txtGender.value != "male" && txtGender.value != "female"){
        alert("controlla il genere")
        return
    }


    // salvattaggio
    let person = {
         "gender": txtGender.value,
         "name":{
            "title":txtGender.value == "male"? "mr" : "miss",
            "first":txtFirst.value,
            "last":txtLast.value
         },
         "location":{
            "street":"9281 southampton street",
            "city": txtCity.value,
            "state": txtState.value,
            "postcode":0
         },
         "email": txtEmail.value,
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
         "phone": txtPhone.value,
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
         "nat":txtNat.value
    }

    people.push(person)

    salva()
    displayData()

    //pulisco i dati
    for (const input of inputData) {
        input.value = ""
    }
}

