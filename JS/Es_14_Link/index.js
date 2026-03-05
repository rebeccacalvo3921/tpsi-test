"use strict"

const lstSiti = document.getElementById("lstSiti");

lstSiti.selectedIndex = -1;

function visualizza(){
    let url = lstSiti.value;
    //window.open(url, "_blank");
    location.href = url;
}