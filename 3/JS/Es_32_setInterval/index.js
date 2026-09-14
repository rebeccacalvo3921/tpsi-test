"use strict";

let _divs = document.getElementsByTagName("div");
let _oraCorrente = _divs[0]
let _tempoTrascorso = _divs[1]
let _wrapper = _divs[2]
let _btnStop = document.getElementById("btnStop");
let _btnStart = document.getElementById("btnRestart");
_btnStop.disabled = true


// leggo le dimensioni wrapper
// alert(_wrapper.style.width)  // stringa vuota
let wrapper_w = getComputedStyle(_wrapper).width;
let wrapper_h = getComputedStyle(_wrapper).height;
// alert(wrapper_w) devo togliere il 'px' finale
wrapper_w = parseInt(wrapper_w.substring(0, wrapper_w.length - 2));
wrapper_h = parseInt(wrapper_h.substring(0, wrapper_h.length - 2));
console.log(wrapper_w, wrapper_h)

let timerDisegnoID
let timerTempoID
_btnStart.addEventListener("click", function(){
	timerDisegnoID=setInterval(visualizzaRettangoli, 50)
	timerTempoID=setInterval(visualizzaTempo, 1000)
	_btnStart.disabled=true
	_btnStop.disabled=false
})

_btnStop.addEventListener("click", function(){
	if(timerDisegnoID) clearInterval(timerDisegnoID)
	if(timerTempoID) clearInterval(timerTempoID)
	_btnStart.disabled=false
	_btnStop.disabled=true
})

let secondi=0
let minuti=0
function visualizzaTempo(){
	secondi++
	if(secondi==60){
		secondi=0
		minuti++
	}
	_tempoTrascorso.innerHTML=`tempo trascorso: ${pad(minuti)}:${pad(secondi)}`
}

function visualizzaRettangoli(){
	console.log("ok")
	
	let div=document.createElement("div")
	//generazione dimenzioni
	let w=generaNumero(1,100)
	let h=generaNumero(1,100)
	div.style.width=w+"px"
	div.style.height=h
	
	//colore di sfondo
	let r=generaNumero(0,256)
	let g=generaNumero(0,256)
	let b=generaNumero(0,256)
	let color=`rgb(${r}, ${g}, ${b})`
	div.style.backgroundColor=color

	//genera posizione
	let x=generaNumero(0, wrapper_w-w)
	let y=generaNumero(0, wrapper_h-h)
	div.style.position="absolute"
	div.style.left=x
	div.style.top=y

	_wrapper.append(div)
}

let timerOrarioID=setInterval(function(){
	let d=new Date()
	_oraCorrente.innerHTML=d.toLocaleTimeString()
}, 1000)

function generaNumero(min, max) {
	let rnd = Math.floor((max - min) * Math.random()) + min;
	return rnd;
}
function pad(n) {
 return (n < 10 ? '0' : '') + n
}