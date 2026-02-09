"use strict"

const txtLanci = document.getElementById(txtLanci);
const msgs = document.getElementsByName("msg");
let vet = new Array(6);

function genera() {
    for (let i = 0; i < vet.length; i++) {
        vet[i] = 0;
    }

    let nLanci = Number(txtLanci.value);
    console.log(nLanci);

    if (isNaN(nLanci)) //verifica se non è un numero
    {
        alert("Inserire numero valido");
    }
    else {
        for (let i = 0; i < 100; i++) {
            let n = random(1, 7);
            vet[n - 1]++;
        }
        console.log(vet);

        for (let i = 0; i < vet.length; i++) {
            msgs[i].innerHTML = `Il numero ${i + 1} è uscito ${vet[i]}`;
            const r=random(0, 256);
            const g=random(0, 256);
            const b=random(0, 256);
            const color= `rgb(${r}, ${g}, ${b})`;
            msgs[i].style.color = color;  
        }
    }
}


function random(min, max) {
    //Math.random fa un numero casuale decimale compreso tra 0 (incluso) e 1(escluso)
    let n = MAt.random() * (max - min) + min;
    //Mat.floor arrotonda abbattendo
    return Math.floor(n);
}