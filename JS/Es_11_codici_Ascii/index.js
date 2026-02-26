"use strict";

const txts = document.getElementsByClassName("txtNum");
const strs = document.getElementsByClassName("txtStr");
const chks = document.getElementsByName("chk");
const btnControlla = document.getElementById("btnControlla");

function genera(evt) {
    let aus = [];
    let v = evt.target.value;
    //console.log(v);
    let temp = v.split("-");
    let min = parseInt(temp[0]);
    let max = parseInt(temp[1]);
    console.log(min, max);
    for (let i = 0; i < txts.length; i++) {
        do {
            let num = random(min, max + 1);
        } while (aus.includes(num));

        aus.push(num);
        txts[i].value = num;

        strs[i].value = "";
        chks[i].checked = false;
    }
    btnControlla.style.display = "none";
}

function abilita() {
    for (let i = 0; i < txts.length; i++) {
        if (txts[i].value == "") {
            btnControlla.style.display = "none";
            return;
        }
    }

    btnControlla.style.display = "block";
}

function check(evt) {

}


function random(min, max) {
    return Math.floor((max - min) * Math.random() + min);
}