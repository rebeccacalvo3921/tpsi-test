"use strict";

const txtMatricola = document.getElementById("matricola");
const txtCognome = document.getElementById("cognome");
const txtNome = document.getElementById("nome");
const optGenere = document.getElementsByName("genere");
const lstRegione = document.getElementById("regione");

const chkLavoratore = document.getElementById("lavoratore");
const pDescrizione = document.getElementById("descrizione");
const txtDescrizione= pDescrizione.querySelector("input");

const divMsg= document.getElementById("msg");
const btnInvia=document.querySelector('input[value="INVIA"]');
const btnReset=document.querySelector('input[value="RESET"]');

pDescrizione.style.display="none"
divMsg.style.display="block"

txtMatricola.addEventListener("change", Matricola)

function Matricola(){
    if(isDigit(txtMatricola.value) && txtMatricola.value.length==12){
        txtMatricola.style.borderColor=""
        return true;
    }
    else{
        txtMatricola.style.borderColor="#F00"
        return false
    }
}

txtCognome.addEventListener("change", ControllaNome)
txtNome.addEventListener("change", ControllaNome)
function ControllaNome(event){
    let valore=event.target.value
    if(isLetter(valore)&&valore.length>=4||valore==""){
        event.target.style.borderColor=''
        return true;
    }
    else{
        event.target.style.borderColor="#F00"
        return false
    }
}

chkLavoratore.addEventListener("click", function(){
    if(chkLavoratore.checked)
        pDescrizione.style.display="block"
    else
        pDescrizione.style.display="none"
})

btnInvia.addEventListener("click", function(){
    divMsg.textContent=""
    if(txtMatricola.style.borderColor=="#f00"||txtMatricola.value=="")
        divMsg.textContent+="Errore Matricola; "
    if(txtCognome.style.borderColor=="#f00"||txtCognome.value=="")
        divMsg.textContent+="Errore Cognome; "
    if(txtNome.style.borderColor=="#f00"||txtNome.value=="")
        divMsg.textContent+="Errore Nome; "
    if(!(chkLavoratore.checked&&pDescrizione.value==""||!chkLavoratore.checked))
        divMsg.textContent+="Errore Descriozione Lavoro; "
    if(!(optGenere[1].checked||optGenere[0].checked))
        divMsg.textContent+="Genere non selezionato; "
}
)

