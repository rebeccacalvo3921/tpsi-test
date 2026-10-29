"use strict"
// table
const opts = document.querySelectorAll("#optWrapper input")
const table = document.querySelector(".list")
const tbody = table.querySelector("tbody")
// details
const detailsContainer = document.getElementById("detailsContainer")
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

navBtns.forEach(function(button) {
	button.addEventListener("click", naviga)
});

// dati filtrati
let filteredData
let currentIndex = 0

// Avvio
const people = loadData(); // people è un vettore enumerativo di JSON
displayData()

function loadData() {
    let peopleString = localStorage.getItem("people");
    if (!peopleString)
        peopleString = peopleStorage
    return JSON.parse(peopleString)
}

function displayData() {
    tbody.innerHTML = ""

	// const gender = opts.querySelector(":checked").value - NOK --> è sbagliata perché viene applicata una collezione
	const gender = optWrapper.querySelector(":checked").value
    filteredData = getFilteredData(gender)
    
    filteredData.forEach(function (person, index) {
        let tr = document.createElement("tr");
        tbody.append(tr);

        let td = document.createElement("td")
        td.textContent = getName(person.name)
        tr.append(td)

        td = document.createElement("td")
        td.textContent = person.location.city
        tr.append(td)

        td = document.createElement("td")
        td.textContent = person.location.state
        tr.append(td)

        td = document.createElement("td")
        td.textContent = person.nat
        tr.append(td)

        td = document.createElement("td")
        td.classList.add("icon", "lens")
        td.addEventListener("click", function () {
            currentIndex = index + 1
            showDetails(person)
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

function getFilteredData(gender) {
    let result = []
    people.forEach(function(person) {
        if (person.gender == gender) {
            result.push(person)
        }
    });
    return result
}

function getName(personName) {
    return `${personName.first} ${personName.last}`
}

function showDetails(person) {
    detailsContainer.style.display = "" // per visualizzare il container dei dettagli solo quando una lente viene cliccata
    details.innerHTML = ""

    let p = document.createElement("p")
    p.textContent = person.email
    details.append(p)

    let img = document.createElement("img")
    img.src = person.picture.large
    details.append(img)

    p = document.createElement("p")
    p.textContent = person.cell
    details.append(p)

    navLabel.textContent = `${currentIndex}/${filteredData.length}`
}

function naviga() {
    switch (this.value) {
        case "Primo":
            currentIndex = 1
            break;
        case "Indietro":
            if (currentIndex > 1) {
                currentIndex--
            }
            break;
        case "Avanti":
            if (currentIndex < filteredData.length) {
                currentIndex++
            }
            break;
        case "Ultimo":
            currentIndex = filteredData.length
            break;
    }
    showDetails(filteredData[currentIndex - 1])
}

function removePerson(person){
	let index = filteredData.indexOf(person)
	filteredData.splice(index, 1) //per eliminare un record
	displayData()
}


/*"use strict"
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
opts[0] = addEventListener("click", displayData)
opts[1] = addEventListener("click", displayData)

// Avvio
let currentIndex = 0
const people = loadData(); //people è vettore enumerativo di JSON
displayData()

function loadData() {
	let peopleString = localStorage.getItem("people");
	if (!peopleString)
		peopleString = peopleStorage
	return JSON.parse(peopleString)
}


function displayData() {
	tbody.innerHTML = ""

	// const gender = opts.querySelector(":checked").value - NOK --> è sbagliata perché viene applicata una collezione
	const gender = optWrapper.querySelector(":checked").value
	//console.log(gender, people)
	let filteredData = getFilteredData(gender)

	filteredData.forEach(function (person) { //--> equivalente del forof di for(let person of people)
		if (person.gender == gender) { //person è un JSON
			let tr = document.createElement("tr");
			tbody.append(tr);

			let td = document.createElement("td")
			td.textContent = getName(person.name) //--> il campo name è un JSON di un JSON
			tr.append(td)

			td = document.createElement("td")
			td.textContent = person.location.city
			tr.append(td)

			td = document.createElement("td")
			td.textContent = person.location.state
			tr.append(td)

			td = document.createElement("td")
			td.textContent = person.nat
			tr.append(td)

			td = document.createElement("td")
			td.classList.add("icon", "lens")
			td.addEventListener("click", function () {
				showDetails(person)
			})
			tr.append(td)

			td = document.createElement("td")
			td.classList.add("icon", "trash")
			tr.append(td)
		}
	});
	detailsContainer.style.display = "none" //per non visualizzare il container dei dettagli
}


function getName(personName) {
	return `${personName.first} ${personName.last}`
}


function showDetails(person) {
	detailsContainer.style.display = "" // per visualizzare il container dei dettagli solo quando una lente viene cliccata
	details.innerHTML = ""

	let p = document.createElement("p")
	p.textContent = person.email
	details.append(p)

	let img = document.createElement("img")
	img.src = person.picture.large
	details.append(img)

	p = document.createElement("p")
	p.textContent = person.cell
	details.append(p)
}*/