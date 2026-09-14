const btnNum=document.getElementsByName("btnNum")
const btnOper=document.getElementsByName("btnOperatore")
const btnCalcola=document.getElementById("btnCalcola")
const btnClear=document.getElementById("btnClear")

const txtDisplay=document.getElementById("txtDisplay")


let n1=0, n2=0, oper=""

for(let i=0; i<btnNum.length;i++){
    btnNum[i].addEventListener("click", function(){
        txtDisplay.value+=event.target.value
    })
}

btnClear.addEventListener("click", function(){
    txtDisplay.value=""
    n1=0
    n2=0
    oper=""
})

for(let btn of btnOper){
    btn.addEventListener("click", function(){
        oper=btn.value
        n1=Number(txtDisplay.value)
        txtDisplay.value=""
        for(let btn of btnOper){
            btn.disabled=true;
        }
    })
}

btnCalcola.addEventListener("click", function(){
    if(oper!=""){
        n2=Number(txtDisplay.value)
        switch(oper){
            case '+':
                n1=n1+n2;
                break;
            case '-':
                n1=n1-n2;
                break;
            case '/':
                n1=n1/n2;
                break;
            case '*':
                n1=n1*n2;
                break;
        }
        txtDisplay.value=n1;
        
        for(let btn of btnOper){
            btn.disabled=false;
        }
    }
})
