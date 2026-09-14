"use strict"

const drags = document.querySelectorAll(".drag");
const dragItem = drags[0]
const cloneItem = drags[1]
const dropZone = document.getElementById("dropzone");

dragItem.addEventListener("dragstart", function(){
    this.style.opacity = 0.5;
})

dragItem.addEventListener("dragend", function(){
    this.style.opacity = 1;
})


dropZone.addEventListener("dragover", function(event){
    this.style.backgroundColor = "#bbb";
    event.preventDefault();
})

dropZone.addEventListener("dragover", function(){
    this.style.backgroundColor = "";
})