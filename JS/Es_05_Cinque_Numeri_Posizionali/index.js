"Use strict"

const numeriSegreti = new Array(5);//const mi impedisce di riassegare il vettore, non il contenuto delle celle

function eseguiConfronto() {
    for (let i = 1; i <= 5; i++) {
        do {
            let pos = random(0, 5);
        } while (numeriSegreti[pos]);
    }
}

function random(min, max) {
    //Math.random fa un numero casuale decimale compreso tra 0 (incluso) e 1(escluso)
    let n = MAt.random() * (max - min) + min;
    //Mat.floor arrotonda abbattendo
    return Math.floor(n);
}