const DIM = 10;
let livello = 0;
let _wrapper = document.getElementById("wrapper");
let divW = [];


for (let i = 0; i < DIM; i++) {
    for (let j = 0; j < DIM; j++) {
        const div = document.createElement("div");
        div.id = `${i}-${j}`;
        div.classList = "cella";
        divW.push(div);
        _wrapper.append(div);
    }
}
for (let n = 0; n < 5; n++) {
    for (let i = 0; i < DIM; i++) {
        for (let j = 0; j < DIM; j++) {
            let div = document.getElementById(`${i}-${j}`);
            if (!div.dataset.livello){
                if(i == n || j == n || i == DIM - n - 1 || j == DIM - n - 1)
                    div.dataset.livello = n;
            }
        }
    }
}

_wrapper = setInterval(cornice, 500);

function cornice(){
    let divs = document.querySelectorAll(`[data-livello="${livello}"]`);
    for(let div of divW){
        div.style.backgroundColor = "";
    }
    for(let div of divs){
        div.style.backgroundColor = "#f00";
    }
    livello = livello + 1 == 5 ? 1 : livello + 1;
}

function generaNumero(min, max) {
    let rnd = Math.floor((max - min) * Math.random()) + min;
    return rnd;
}