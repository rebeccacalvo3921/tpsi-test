'use strict'

let wrapper = document.querySelector("#wrapper");
let btns = document.querySelectorAll("#buttons input[type=button]");
const wrapper_li = wrapper.querySelectorAll("li")



// funzione di visualizzazione richiamata dall'html
function evidenzia(selectorString) {
    for (const li of wrapper_li) {
        li.style.backgroundColor = ""
        if (li.matches(selectorString))
            li.style.backgroundColor = "yellow"
    }
}


btns[0].addEventListener("click", function () {
    alert("Gli elementi sono " + wrapper_li.length)
})

btns[1].addEventListener("click", function () {
    let msg = ""
    /*
    for (const li of wrapper_li) {
        msg += li.textContent + "\n"
    }*/
    wrapper_li.forEach(function (li, i) {
        msg += li.textContent + "\n"
    });
    alert(msg)
})

btns[2].addEventListener("click", function () {
    /*
    const li_pari = wrapper.querySelectorAll("li:nth-of-typeof(even)")
    li_pari.forEach(function(item, i){
        item.style.backgroundColor
    })*/
    evidenzia("li:nth-of-type(even)")
})


// GESTIONE PULSANTI


