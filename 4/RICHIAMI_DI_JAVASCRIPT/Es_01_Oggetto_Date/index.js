"use strict";

let txtData1 = document.getElementById("txtData1");
let txtData2 = document.getElementById("txtData2");
let button = document.getElementsByTagName("button")[0];
let log = document.getElementById("log");

assegnaDataAlTagInput()
button.addEventListener("click", leggiDataDalTagInput)



function assegnaDataAlTagInput() {
    let dataCorrente = new Date();

    /* ******************** primo textBox ******************** */
    // 1° soluzione: assegno direttamente l'oggetto
    //      uso valueAsDate che esiste SOLO per le date (e non per datetime)
    // txtData1.valueAsDate = dataCorrente;


    // 2° soluzione: uso .value e converto l'oggetto Date in stringa
    //usando come separatore il trattino
    let aus = dataCorrente.toISOString().substring(0, 10)
    console.log(aus)
    txtData1.value = aus

    /* ******************** secondo textBox ******************** */
    dataCorrente.setMinutes(dataCorrente.getMinutes()
        - dataCorrente.getTimezoneOffset())
    txtData2.value = dataCorrente.toISOString().substring(0, 16)
}


function leggiDataDalTagInput() {
    log.innerHTML = ""

    // 1. visualizzqzione diretta del value
    log.innerHTML += txtData1.value + "<br>"
    log.innerHTML += txtData2.value + "<br><br>"

    // il .value contiene un formato leggibile, 
    // ma NON consente di fare delle elaborazioni
    
    let data1 = new Date(txtData1.value)
    let data2 = new Date(txtData2.value)

    
    // 2. serioalizzazione automatica
    // => produce una stringa inutilizzabile
    log.innerHTML += data1 + "<br>"
    log.innerHTML += data2 + "<br><br>"

    //3. serializzazione con .toISOString


    //4. serializzazione con toLcaleDateString
}
