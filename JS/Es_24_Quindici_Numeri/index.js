"use strict"

const wrapper=document.getElementById("wrapper")
const DIM=4
init()



// FUNCIOTION*********************
function init(){
    for(let i=0; i<DIM;i++){
        for(let j=0; j<DIM;j++){
          const div=document.createElement("div")
          wrapper.append(div)
          div.classList.add("pedina")
          div.id=`${i}-${j}`
          div.textContent=""
          div.addEventListener("click", spostaNumero)
        }   
    }

    for(let n=1;n<=DIM*DIM-1;n++){
        let i,j
        do{
            i=generaNumero(0,DIM)
            j=generaNumero(0,DIM)
        }while(document.getElementById(`${i}-${j}`).textContent!="")
        document.getElementById(`${i}-${j}`).textContent=n
        document.getElementById(`${i}-${j}`).style.backgroundColor="#600"
    }
}

function spostaNumero(){
    let aus=this.id.split('-')
    let i=Number(aus[0])
    let j=Number(aus[1])

    let next
    //bottone destro
    if(j<DIM-1){
        next=document.getElementById(`${i}-${j+1}`)
        if(next.textContent==""){
            swap(this, next)
            return
        }
    }
    //bottone sinistro
    if(j>0){
        next=document.getElementById(`${i}-${j-1}`)
        if(next.textContent==""){
            swap(this, next)
            return
        }
    }
    //bottone sopra
    if(i>0){
        next=document.getElementById(`${i-1}-${j}`)
        if(next.textContent==""){
            swap(this, next)
            return
        }
    }
    //bottone sotto
    if(i<DIM-1){
        next=document.getElementById(`${i+1}-${j}`)
        if(next.textContent==""){
            swap(this, next)
            return
        }
    }
}

function swap(_this, next){
    let color=_this.style.backgroundColor
    let text=_this.textContent
    _this.style.backgroundColor=next.style.backgroundColor
    _this.textContent=next.textContent
    next.style.backgroundColor=color
    next.textContent=text
    if(controllaVincita()){
        alert("bravo hai vinto")
        disabilitaEventi()
    }
}

function controllaVincita(){
    const divs=wrapper.querySelectorAll("div")
    for(let i=1; i<=DIM*DIM-1;i++){
        if(divs[i-1].textContent!=i){
            return false
        }
    }
    return true
}

function disabilitaEventi(){
    const divs=wrapper.querySelectorAll("div")
    for(let div of divs){
        div.removeEventListener("click", spostaNumero)
    }
}

function generaNumero(a,b){
    return Math.floor((b-a)*Math.random()+a)
}