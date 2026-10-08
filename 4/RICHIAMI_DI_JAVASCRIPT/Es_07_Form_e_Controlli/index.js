'use strict'
const form1 = document.getElementById("form1")
const txt1 = form1.querySelector("input[type=text]")
const lst1 = form1.getElementsByTagName("select")[0]
const chks = form1.querySelectorAll("input[type=checkbox]")
const opts = form1.querySelectorAll("input[type=radio]")
const lst2 = form1.getElementsByTagName("select")[1]



// richiamato dall'html
function visualizza(index) {
	let msg = "";
	switch (index) {
		case 1:
			msg = txt1.value
			break;
		case 2:
			msg = lst1.value
			break;
		case 3:
			let value
			chks.forEach(function (chk, i) {
				value = chk.value
				if (value == "on")
					value = chk.parentNode.textContent.trim()
				msg += chk.name + ":" + value
			})
			break;
		case 4:
			const selectedChks = form1.querySelectorAll("input[type=checkbox]:checked")
			for (let chk of selectedChks)
				msg += chk.name + chk.dataset.index + " : " + chk.value + "\n"
			break;
		case 5:
			const notSelectedChks = form1.querySelectorAll("input[type=checkbox]:not(:checked)")
			for (let chk of notSelectedChks)
				msg += chk.name + chk.dataset["index"] + " : " + chk.value + "\n"
			break;
		case 6:
			const selectedRadio = form1.querySelector("input[type=radio]:checked")
			if (selectedRadio)
				msg = selectedRadio.name + selectedRadio.dataset.index + ":" + selectedRadio.value + "\n"
			else {
				msg = "Nessun elemento selezionato"
			}
			break;
		case 7:
			const notSelectedRadio = form1.querySelectorAll("input[type=radio]:not(:checked)")
			for (let opt of notSelectedRadio)
				msg = opt.name + opt.dataset["index"] + " : " + opt.value + "\n"
			break;
		case 8:
			for (const item of lst2.selectedOptions) {
				msg += item.value + "\n"
			}
			if (!msg)
				msg = "Nessun valore selezionato"
			break;
	}
	alert(msg);
}


function imposta(index) {
	let newValue
	switch (index) {
		case 1:
			newValue = prompt("Inserisci un testo: ")
			txt1.value = newValue;
			break;
		case 2:
			newValue = prompt("Inserisci il value della voce da selezionare: ")
			lst1.value = newValue
			break;
		case 3:
			newValue = prompt("Inserisci il value del cehckbox da selezionare: ")
			for (const item of chks) {
				const lblText = item.parentElement.textContent.trim().toLowerCase()
				const itemText = item.value.toLowerCase()
				const newValueLower = newValue.toLowerCase()
				if (itemText == newValueLower || lblText == newValue) {
					item.checked = true;
				}
			}
			break;
		case 4:
			newValue = prompt("Inserisci il value del cehckbox da selezionare: ").toLowerCase()
			for (const item of opts) {
				const lblText = item.parentElement.textContent.trim().toLowerCase()
				const itemText = item.value.toLowerCase()
				if (itemText == newValue || lblText == newValue) {
					item.checked = true;
					break;
				}
			}
			break;
		case 5:
			newValue = prompt("Inserisci il value dell'elemento da selezionare: ")
			for (const item of lst2.options) {
				const text = item.textContent.trim().toLowerCase()
				if (item.value.toLowerCase() == newValue ||text == newValue) {
					item.selected = true;
					break;
				}
			}
			break;
	}
}

