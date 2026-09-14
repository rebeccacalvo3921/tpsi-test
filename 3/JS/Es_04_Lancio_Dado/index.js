"use strict"
const lanci=document.getElementById("txtLanci")
let vet=new Array(6)
const msgs=document.getElementsByName("msg")

function genera()
{
    for(let i=0; i<vet.length; i++)
    {
        vet[i]=0
    }
    let numLanci=Number(lanci.value)
    console.log(numLanci)

    if(isNaN(numLanci))
    {
        alert("Inserire un numero valido")
    }
    else
    {
        for(let i=0; i<numLanci; i++)
        {
            let n=Random(1,7)
            vet[n-1]++
        }
        console.log(vet)

        for(let i=0; i<vet.length; i++)
        {
            msgs[i].innerHTML=`Il numero ${i+1} è uscito ${vet[i]} volte`;
            const r=Random(0,256)
            const g=Random(0,256)
            const b=Random(0,256)
            const color = `rgb(${r},${g},${b})`;
            msgs[i].style.color=color
            
        }
    }
   
    
}

function Random(min, max)
{
    //Math.random fa un numero casuale decimale compreso tra 0 (incluso) e 1 (escluso)
    let n = Math.random() * (max - min) + min;
    //Math.floor arrotonda abbattendo
    return Math.floor(n);
}