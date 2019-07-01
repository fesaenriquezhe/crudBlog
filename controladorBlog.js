var mongoose = require("mongoose");
var schema = require("./schema");

var Blog = mongoose.model("Blog",schema,"blog");


function guardar(objNota){
    if(objNota["hidden"] == "v"){
        objNota["hidden"] = true;
    }
    else{
        objNota["hidden"] = false;
    }

    var blog = new Blog({
        title:objNota["title"],
        author:objNota["author"],
        body:objNota["body"],
        date:objNota["date"],
        hidden:objNota["hidden"],
    });

    blog["meta"]["votes"] = objNota["votes"];
    blog["meta"]["favs"] = objNota["favs"];

    blog.save(function(err){
        if(err){
            console.log(err);
            process.exit(1);
        }

        console.log("Nota guardada correctamente");
        console.log(blog);
        process.exit(0);
    })
}

function consultarTitulos(){
    var objTitulos = [];
    return new Promise((resolve,reject) => {
        Blog.find({},"title",function(err,doc){
            if(err){
               reject(err);
               process.exit(1);
            }
            objTitulos = doc;
            resolve(objTitulos);
        });
    })
}

function consultarNota(index){
    var nota;

    return new Promise((resolve,reject) => {
        Blog.findById(index,function(err,doc){
            if(err){
                reject(err);
                console.log(err);
                process.exit(1);
            }
            nota = doc;
            resolve(nota);
        })
    })
}

function agregarComentario(index,comentario){
    Blog.findById(index,function(err,doc){
        if(err){
            console.log(err);
        }
        var coment = {
            body:comentario,
            date:"2019-06-30"
        }
        doc.comments.push(coment);
        doc.save(function(err){
            if(err){
                console.log(err);
                process.exit(1);
            }
        })
    })
}

function eliminar(index){
    Blog.findByIdAndRemove(index,function(err,res){
        if(err){
            console.log(err);
            process.exit(1);
        }
        console.log(res);
    })
}

function modificar(index,objNota){
    if(objNota["hidden"] == "v"){
        objNota["hidden"] = true;
    }
    else{
        objNota["hidden"] = false;
    }

    Blog.findByIdAndUpdate(index, objNota, {new: true}, function(err, model) {
        if(err){
            console.log(err);
            process.exit(1);
        }

        console.log("Nota modificada correctamente");
        console.log(model);
        process.exit(0);
    });
}

module.exports.guardarNota = guardar;
module.exports.consultarTitulos = consultarTitulos;
module.exports.consultarNota = consultarNota;
module.exports.agregarComentario = agregarComentario;
module.exports.eliminar = eliminar;
module.exports.modificar = modificar;