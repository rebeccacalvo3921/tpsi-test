'use strict'
const form1 = document.getElementById("form1")
const txt1 = form1.querySelector("input[type=text]")
const lst1 = form1.getElementsByTagName("select")[0]
const chks = form1.querySelectorAll("input[type=checkbox")

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
			for (const chk of chks) {
				let value = chk.value
				if (value == "on")
					value = chk.parentElement.textContent.trim()
				msg += chk.name + " : " + value + "\n"
			}
			break;
		case 4:
			const selectedChks = form1.querySelectorAll("input[type=checkbox]:checked")
			for (const chk of selectedChks) {
				msg += chk.name + " : " + chk.value + "\n"
			}
			break;
		case 5:
			const notSelectedChks = form1.querySelectorAll("input[type=checkbox]:not(:checked)")
			for (const chk of notSelectedChks) {
				msg += chk.name + " : " + chk.value + "\n"
			}
			break;
	}
	alert(msg);
}


function imposta(index) {
	switch (index) {

	}
}

