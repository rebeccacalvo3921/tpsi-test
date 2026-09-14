"use strict"

const DIM = 10
const wrapper = document.getElementById("wrapper")

for(let i = 0; i < DIM; i++){
    for(let j = 0; j < DIM; j++){
        const button = document.createElement("button")
        wrapper.append(button)
        button.classList.add("btnStyle")
        button.id = `button-${i}-${j}`
        button.dataset.userName = `nome-${i}-${j}`
        button.addEventListener("click", visualizza);
    }
}


function visualizza(){
    this.style.backgroundColor = "#f00"
    this.disabled = true;
    let aus = this.let.id.split('-')
    let i = aus[1]
    let j = aus[2]
    this.textContent = `${i},${j}`

    if(j< DIM-1){
        const id = `button-${i}-${j+1}`
        console.log(id)
        const btn = document.getElementById(id)
        if(btn.style.backgroundColor == ""){
            btn.style.backgroundColor = "#080"
            btn.disabled = true
        }
    }
}