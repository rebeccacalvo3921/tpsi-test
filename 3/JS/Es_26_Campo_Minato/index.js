"use strict"
const wrapper = document.getElementById("wrapper");


for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
        const btn = document.createElement("button");
        btn.dataset.id = `${i}-${j}`;
        btn.dataset.bomba = "safe";
        btn.addEventListener("click", click);
        btn.classList = "button";
        wrapper.append(btn);
    }
}
for (let x = 0; x < 5; x++) {
    let i;
    let j;
    let btn;
    do {
        i = Math.floor(Math.random() * 5);
        j = Math.floor(Math.random() * 5);
        btn = document.querySelector(`[data-id="${i}-${j}"]`);
    } while (btn.dataset.bomba == "bomba")
    btn.dataset.bomba = "bomba";
}

function click() {
    let cont = 0;
    if (this.dataset.bomba == "bomba") {
        alert("hai perso!")
        this.style.backgroundImage = "url(bomba.png)";
        for(let cella of wrapper.children){
            cella.disabled = true;
            if(cella.dataset.bomba == "bomba")
                cella.style.backgroundImage = "url(./bomba.png)"
        }
    }
    else {

        let i = Number(this.dataset.id.split('-')[0]);
        let j = Number(this.dataset.id.split('-')[1]);
        const div = wrapper.querySelectorAll([`[data-id="${i - 1}-${j - 1}"]`, `[data-id="${i - 1}-${j}"]`, `[data-id="${i - 1}-${j + 1}"]`,
            `[data-id="${i}-${j - 1}"]`, `[data-id="${i}-${j + 1}"]`,
            `[data-id="${i + 1}-${j - 1}"]`, `[data-id="${i + 1}-${j}"]`, `[data-id="${i + 1}-${j + 1}"]`].join(','));
        for(let k = 0; k < div.length; k++){
            if(div[k] && div[k].dataset.bomba == "bomba"){
                cont++;
            }
        }
        this.textContent = cont != 0 ? cont.toString() : "";
        this.style.backgroundColor = "#329248ff";
        this.enabled = false;
        Nclick++;
    }
    if(Nclick == 20){
        alert("hai vinto");
        for(let cella of wrapper.children){
             cella.disabled = true;
        }
    }

}