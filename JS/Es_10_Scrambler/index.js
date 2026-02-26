"use strict"

const div1 = document.getElementById("div1");
const div2 = document.getElementById("div2");

const txt1 = document.getElementById("txt1");
const txt2 = document.getElementById("txt2");
const txt3 = document.getElementById("txt3");

const DIM = 26;
let mat = [];
let aus = [];

mat[0] = [];
mat[1] = [];


for (let i = 0; i < DIM; i++) {
	let elem = String.fromCharCode(65 + i);
	mat[0][i] = elem;
	aus[i] = elem;
	div1.innerHTML += `${elem} `;
}

for (let i = 0; i < DIM; i++) {
	let pos = random(0, aus.length);
	let item = aus[pos];
	mat[1][i] = item;
	aus.splice(pos, 1);
	div2.innerHTML += `${item} `;
}

function converti() {
	txt1.value = txt1.value.toUpperCase();
}

function scrambler() {
	txt2.value = "";
	for (let i = 0; i < txt1.value.length; i++) {
		let c = txt1.value[i];
		let pos = c.charCodeAt(0) - 65;
		if ( c >= "A" && c <= "Z") {
			console.log(`${c} -> ${mat[1][pos]}`);
			txt2.value += mat[1][pos];
		}
		else{
			txt2.value += c;
		}
	}
}

function descrambler(){
	txt3.value="";
	for(let i =0; i < txt2.value.length; i++){
		let c = txt2.value[i];
		if(c>= "A" && c <= "Z"){
			let pos = mat[1].indexOf(c);
			console.log(`${c} -> ${[pos]}`);
			txt3.value+=mat[0][pos];
		}
		else {
			txt3.value += c;
		}
	}
}

function random(min, max) {
	return Math.floor((max - min) * Math.random() + min);
}
