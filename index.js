var mongoose = require("mongoose");
var schema = require("./schema");
const interfaz = require("./interfaz");
const controladorBlog = require("./controladorBlog");

mongoose.connect("mongodb://localhost:27017/base_blog",{ useNewUrlParser: true });


async function main(){
    var operacionSeleccionada;
    console.log("---CRUD DE BLOGS---\n");
    operacionSeleccionada = await interfaz.seleccionarOperacion();
    validarOperacion(operacionSeleccionada);
}

function validarOperacion(op){
    if(op != undefined){
        switch(op){
            case "1":
               procesoNuevaEntrada();
            break;

            case "2":
               procesoConsulta();
            break;

            case "3":
               procesoModificacion();
            break;

            case "4":
                    procesoEliminacion();
                 break;

            case "5":
               procesoComentarios();
            break;
            
            default:
                console.log("Opción no valida");
                main();
            break;
        }
    }
}

async function procesoNuevaEntrada(){
    console.log("---INGRESA UNA NUEVA NOTA---");
    var objetoArticulo = {};
    objetoArticulo["title"] = await interfaz.ingresarTitulo();
    objetoArticulo["author"] = await interfaz.ingresarAuthor();
    objetoArticulo["body"] = await interfaz.ingresarCuerpo();
    objetoArticulo["date"] = await interfaz.ingresarFecha();
    objetoArticulo["hidden"] = await interfaz.ingresarVisibilidad();
    objetoArticulo["votes"] = await interfaz.ingresarVotos();
    objetoArticulo["favs"] = await interfaz.ingresarFavs();


    controladorBlog.guardarNota(objetoArticulo);
}

async function procesoConsulta(){
    console.log("---SELECCIONA LA NOTA QUE DESEAS LEER---");
    var objNotas = await controladorBlog.consultarTitulos();
    var countNotas = 1;
    objNotas.forEach(nota => {
        console.log(countNotas + ".- "+nota.title);
        countNotas++;
    });

    var numeroNota = await interfaz.seleccionaNota();

    if(numeroNota <= objNotas.length && numeroNota > 0 ){
        var index = objNotas[numeroNota-1]["_id"];
        verNota(index);
    }
}

async function verNota(index){
    var  nota = await controladorBlog.consultarNota(index);
    console.log("\nTitulo: "+nota["title"]+"\n");
    console.log("Autor: "+nota["author"]+"\n");
    console.log("Cuerpo: "+nota["body"]+"\n");
    console.log("Fecha: "+nota["date"]+"\n");
    console.log("Visible: "+nota["hidden"]+"\n");
    console.log("---COMENTARIOS---\n");

    nota["comments"].forEach(comentario => {
        console.log(comentario["body"]+"\n");
    });
}

async function procesoComentarios(){
    console.log("---SELECCIONA LA NOTA A LA QUE DESEAS AGREGAR COMENTARIOS---");
    var objNotas = await controladorBlog.consultarTitulos();
    var countNotas = 1;
    objNotas.forEach(nota => {
        console.log(countNotas + ".- "+nota.title);
        countNotas++;
    });

    var numeroNota = await interfaz.seleccionaNota();

    if(numeroNota <= objNotas.length && numeroNota > 0 ){
        var index = objNotas[numeroNota-1]["_id"];
        agregarComentario(index);
    }
}

async function agregarComentario(index){
 var agregarComent = "s";

 while(agregarComent == "s"){
    var comentario = await interfaz.escribirComentario();
    controladorBlog.agregarComentario(index,comentario);
    agregarComent = await interfaz.preguntarAgregarComent();
 }
}

async function procesoEliminacion(){
    console.log("---SELECCIONA LA NOTA QUE DESEAS ELIMINAR---");
    var objNotas = await controladorBlog.consultarTitulos();
    var countNotas = 1;
    objNotas.forEach(nota => {
        console.log(countNotas + ".- "+nota.title);
        countNotas++;
    });

    var numeroNota = await interfaz.seleccionaNota();

    if(numeroNota <= objNotas.length && numeroNota > 0 ){
        var index = objNotas[numeroNota-1]["_id"];
        controladorBlog.eliminar(index);
    }
}

async function procesoModificacion(){
    console.log("---SELECCIONA LA NOTA QUE DESEAS MODIFICAR---");
    var objNotas = await controladorBlog.consultarTitulos();
    var countNotas = 1;
    objNotas.forEach(nota => {
        console.log(countNotas + ".- "+nota.title);
        countNotas++;
    });

    var numeroNota = await interfaz.seleccionaNota();

    if(numeroNota <= objNotas.length && numeroNota > 0 ){
        var index = objNotas[numeroNota-1]["_id"];
        pedirValoresModificar(index);
    }
}

async function pedirValoresModificar(index){
    console.log("---ACTUALIZA LOS VALORES DE LA NOTA---");
    var objetoArticulo = {};
    objetoArticulo["title"] = await interfaz.ingresarTitulo();
    objetoArticulo["author"] = await interfaz.ingresarAuthor();
    objetoArticulo["body"] = await interfaz.ingresarCuerpo();
    objetoArticulo["date"] = await interfaz.ingresarFecha();
    objetoArticulo["hidden"] = await interfaz.ingresarVisibilidad();
    objetoArticulo["meta"] = "";
    objetoArticulo["meta"]["votes"] = await interfaz.ingresarVotos();
    objetoArticulo["meta"]["favs"] = await interfaz.ingresarFavs();

    controladorBlog.modificar(index,objetoArticulo);
}



main();