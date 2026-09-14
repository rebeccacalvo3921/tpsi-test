"use strict"

const numeriSegreti = new Array(3);
generaNumeri()

function generaNumeri(){
    let num;
    for(let i = 1; i<= 3; i++){
        do{
            num = random(0, 10);
        }while(numeriSegreti.includes(num));

        numeriSegreti[i] = num;
    }
    console.log(numeriSegreti);
}





function random(min, max){
    let n = Math.random() * (max - min) + min;
    return Math.floor(n);
}