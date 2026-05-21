"use strict";

let _img = document.getElementById("imgCarta");
let _btnGioca = document.getElementById("btnGioca");
let _lblSomma = document.getElementById("lblSomma");
let _lblCarte = document.getElementById("lblCarte");
let _lblRisultato = document.getElementById("lblRisultato");

let contaCarte=0
_btnGioca.addEventListener("click", function(){
	this.disabled=true
	giraCarta()
})

let v=[]
let punteggio=0
function giraCarta(){
	let n
	do{
		n=generaNumero(1,11)
	}while(v.includes(n))
	v.push(n)
	if(n>7)
		punteggio+=0.5
	else
		punteggio+=n

	contaCarte++

	_lblSomma.innerHTML=punteggio
	_lblCarte.innerHTML=contaCarte

	_img.src=`./img/bg_d${n}.gif`
	
	if(contaCarte<3){
		setTimeout(giraCarta, 1000)
	}
	else{
		if(punteggio>7.5){
			_lblRisultato.textContent="HAI PERSO"
			setTimeout(function(){alert("hai perso")}, 50)
		}
		else{
			_lblRisultato.textContent="HAI VINTO"
			setTimeout(function(){alert("hai vinto")}, 50)
		}
	}
}

function generaNumero(min, max){
    let rnd = Math.floor((max - min) * Math.random()) + min;   
    return rnd;
}