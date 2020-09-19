const { baseDatos } = require('../models/bd');

function sustitucion(req, query){
    query = makeReplace(req.body.tipo, query,/@tipo/g);
    query = makeReplace(req.body.longevidad, query, /@longevidad/g);
    query = makeReplace(req.body.tipo2, query,/@vertebrado/g);
    query = makeReplace(req.body.exterior, query,/@exterior/g);
    query = makeReplace(req.body.velocidad, query,/@velocidad/g);
    query = makeReplace(req.body.territorio, query,/@territorio/g);
    query = makeReplace(req.body.tiene, query,/@alas/g);
    query = makeReplace(req.body.son, query,/@oviparo/g);
    query = makeReplace(req.body.toma, query,/@leche/g);
    query = makeReplace(req.body.respira, query,/@respira/g);
    query = makeReplace(req.body.puede, query,/@volar/g);
    query = makeReplace(req.body.tiene2, query,/@huesos/g);
    query = makeReplace(req.body.siente, query,/@siente/g);
    query = makeReplace(req.body.tiene3, query,/@vida/g);
    query = makeReplace(req.body.peligro, query,/@peligro/g);
    query = makeReplace(req.body.tamanio, query,/@tamanio/g);
    query = makeReplace(req.body.sangre, query,/@sangre/g);
    if(req.body.nombre_animal.length >0 ){
        query = makeReplace(req.body.nombre_animal, query,/X/g);
    }
    
    return query
}

function makeReplace(obj, query, change){ 
    if(obj !== undefined){
        return query.replace(change, obj);
    } else {
        return query.replace(change, '_');
    }
}

function getAnimalSpecific(id){
    let animal = {}
    baseDatos.forEach(element => {
        if(id === element.id){
            animal = element;
        }
    });
    return animal
}


module.exports.sustitucion = sustitucion;
module.exports.getAnimalSpecific = getAnimalSpecific;