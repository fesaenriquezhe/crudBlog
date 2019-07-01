const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function seleccionarOperacion(){
    return new Promise(resolve => {
        rl.question('¿Que operación deseas realizar?\n 1.-Inserción\n 2.-Consulta\n 3.-Actualización\n 4.-Eliminación\n 5.-Agregar comentarios a una nota\n  ', 
        (operacion) => {
            resolve(operacion);
        }); 
    });
}


function inputTitle(){
    return new Promise( resolve => {
        rl.question('Ingresa el titulo: ',
        (input) => {
            resolve(input);
        })
    })
}

function inputAuthor(){
    return new Promise(resolve => {
        rl.question('Ingresa el autor: ',
        (input) => {
            resolve(input);
        })
    })
}

function inputBody(){
    return new Promise(resolve => {
        rl.question('Ingresa el cuerpo de la nota: ',
        (input) => {
            resolve(input);
        })
    })
}

function inputDate(){
    return new Promise(resolve => {
        rl.question('Ingresa la fecha (yyyy-mm-dd): ',
        (input) => {
            resolve(input);
        })
    })
}

function inputHidden(){
    return new Promise(resolve => {
        rl.question("Ingresa la visibilidad de la nota(v: visible  n: novisible): ",
        (input) => {
            resolve(input);
        })
    })
}

function inputVotes(){
    return new Promise(resolve => {
        rl.question("Ingresa la cantidad de votos: ",
        (input) => {
            resolve(input);
        })
    })
}

function inputFavs(){
    return new Promise(resolve => {
        rl.question("Ingresa la cantidad de favoritos: ",
        (input) => {
            resolve(input);
        })
    })
}

function seleccionaNota(){
    return new Promise(resolve =>{
        rl.question("Ingresa el numero de la nota: ",
        (input) =>{
            resolve(input);
        })
    })
}

function escribirComentario(){
    return new Promise(resolve => {
        rl.question("Escribe tu comentario: ",
        (input) =>{
            resolve(input);
        })
    })
}

function preguntarAgregarComent(){
    return new Promise(resolve => {
        rl.question("¿Deseas agregar otro comentario? (s:si / n:no) ",
        (input) =>{
            resolve(input);
        })
    })
}




module.exports.seleccionarOperacion = seleccionarOperacion;

//INPUTS 
module.exports.ingresarTitulo = inputTitle;
module.exports.ingresarAuthor = inputAuthor;
module.exports.ingresarCuerpo = inputBody;
module.exports.ingresarFecha = inputDate;
module.exports.ingresarVisibilidad = inputHidden;
module.exports.ingresarVotos = inputVotes;
module.exports.ingresarFavs = inputFavs;

module.exports.seleccionaNota = seleccionaNota;
module.exports.preguntarAgregarComent = preguntarAgregarComent;
module.exports.escribirComentario = escribirComentario;