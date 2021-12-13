let mensaje = `- Héctor💵
- Sara💵
- Leire💵
- javisevilla 1-13-26-34-96 💵
- Toni de mallorca💵
- Peter💵
- Juanjo (cosmos). 4-8-15-28-92💵                         
- Amelia💵
- Joseba💵
- Encarna💵
- Conti. 5-22-35-69-85💵
-Toti. 7-23-32-65-88💵
- Enzo💵
- Naiara💵
- E peinado. 50-60-70-80-90 💵
- carlos Quelet💵
-Anabel. 3-11-12-18-24 💵
- Sergio 💵
- Pablo 💵
-Alex Faus 💵`;

// Nombres

let splitted = mensaje.split('\n');
const regex = /[A-Za-záéíóúÁÉÍÓÚ() ]+/g;
let rawnames = [];
splitted.forEach(
    function (value, index) { rawnames[index] = value.match(regex)[0]; }
);
let names = [];
rawnames.forEach(
    function (value, index) { names[index] = value.trim(); }
);

// Números elegidos

let regex2 = /[0-9-]+/g;
let chosen = [];
splitted.forEach(
    function (value, index) {
        let results = value.match(regex2);
        chosen[index] = results[results.length - 1];
    }
);
chosen.forEach(
    function (value, index) {
        if (value.match(/^-$/g)) {
            chosen[index] = null;
        }
    }
);

// Array totales

let posibles = [];
for (let i = 0; i < 100; i++) {
    posibles[i] = i;
}

// Separar en arrays de números

let numseparated = [];
chosen.forEach(
    function (value, index) {
        if (value !== null) {
            let strarr = value.split('-');
            let numarr = [];
            strarr.forEach(
                function (val, ind) {
                    numarr[ind] = parseInt(val, 10);
                }
            );
            numseparated[index] = numarr;
        } else {
            numseparated[index] = null;
        }
    }
);

// Creación del Map

let loteria = new Map();
for (let i = 0; i < 20; i++) {
    loteria.set(names[i], numseparated[i]);
}

// Comprobación de que están libres y quitar los números ya escogidos

for (let [k, v] of loteria) {
    if (v !== null) {
        console.log(`-- Números de ${k}: ${v} ---`);
        v.forEach(
            function (value) {
                let ind = posibles.findIndex(function (pos) { return value === pos; });
                if (ind !== -1) {
                    posibles.splice(ind, 1);
                } else {
                    console.log(`--- ¡¡¡El número ${value} no está en el array posibles!!! ---`);
                }
            }
        );
    } else {
        console.log(`${k} no ha escogido números`);
    }
}

// Formateado guay de los nombres

let maxlength = 0;
let kmax;

for (let [k, v] of loteria) {
    if (k.length > maxlength) {
        maxlength = k.length;
        kmax = k;
    }
}

// console.log(`El nombre más largo es ${kmax}  con ${maxlength} caracteres`);

for (let [k, v] of loteria) {
    if (k.length < maxlength) {
        let resto = maxlength - k.length;
        let newnom = k;
        let oldval = v;
        for (let i = 0; i < resto; i++) {
            newnom += ' ';
        }
        loteria.delete(k);
        loteria.set(newnom, oldval);
    }
}

console.log('----------------------------------------------------');

// Asignación a los restantes participantes de 5 números al azar

for (let [k, v] of loteria) {
    if (v === null) {
        let arr = [];
        for (let i = 0; i < 5; i++) {
            let index = Math.round(Math.random() * (posibles.length - 1));
            let val = posibles[index];
            arr.push(val);
            posibles.splice(index, 1);
        }
        loteria.set(k, arr);
    }
}

loteria.forEach(
    function (value, index) {
        if (value === null) {
            console.log(`${index} ||   Error, no tiene números`);
        } else {
            console.log(`${index} ||   Números: ${value}`);
        }
    }
);

console.log(posibles);
