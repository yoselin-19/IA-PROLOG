const { query } = require('express');
const express = require('express');
const pl = require('tau-prolog');

var session = pl.create( 1000 );
var animales = [];
const router = express.Router();

router.get('/', async (req, res) => {
    res.render("pages/home")
});

router.get('/animal/:id', (req, res) => {
    res.render("pages/animal")
});

router.post('/consultar', (req, res) => {
    var program =
    `animal(id(1), molusco, pulpo,           invertebrado, fria,       no,   no,  respirar, marino,   oviparo,   no,    no,     no, siente, vida, baja,  no,         grande, normal).
    animal(id(2), molusco, calamar_gigante, invertebrado, fria,        no,   no,   respirar, marino,   oviparo,    no,    no,     no, siente, vida, media, vulnerable, grande, normal).
    animal(id(3), molusco, sepia,           invertebrado, fria,        no,   no,   respirar, terrestre,oviparo,    no,    no,     no, siente, vida, baja,  no,         pequenio, lento).
    animal(id(4), molusco, nautilus,        invertebrado, fria,        no,   no,   respirar, marino,   oviparo,    no,    no,     no, siente, vida, alta,  vulnerable, pequenio, lento).
    animal(id(5), molusco, bivalvos,        invertebrado, fria,        no,   no,   respirar, terrestre,oviparo,    no,    no,     no, siente, vida, baja,  no,         pequenio, lento).
    
    animal(id(6), pez, cometa,              vertebrado, fria,       escamas, no,   respirar, acuatico, oviparo,    no,    no, huesos, siente, vida, baja,      no,     pequenio, rapido).
    animal(id(7), pez, beta,                vertebrado, fria,       escamas, no,   respirar, acuatico, oviparo,    no,    no, huesos, siente, vida, baja,      no,     pequenio, rapido).
    animal(id(8), pez, carpa_comun,         vertebrado, fria,       escamas, no,   respirar, acuatico, oviparo,    no,    no, huesos, siente, vida, baja,      no,     pequenio, rapido).
    animal(id(9), pez, oranda,              vertebrado, fria,       escamas, no,   respirar, acuatico, oviparo,    no,    no, huesos, siente, vida, baja,      no,     pequenio, rapido).
    animal(id(10), pez, espada,              vertebrado, fria,       escamas, no,   respirar, acuatico, oviparo,    no,    no, huesos, siente, vida, baja,      no,     pequenio, rapido).
    
    animal(id(11), reptil, iguana,           vertebrado, fria,       escamas, no,   respirar, terrestre,oviparo,    no,    no, huesos, siente, vida, media,     no,     pequenio, rapido).
    animal(id(12), reptil, lagarto,          vertebrado, fria,       escamas, no,   respirar, terrestre,oviparo,    no,    no, huesos, siente, vida, media,     no,     pequenio, rapido).
    animal(id(13), reptil, cocodrilo,        vertebrado, fria,       escamas, no,   respirar, terrestre,oviparo,    no,    no, huesos, siente, vida, alta, vulnerable,  grande,   normal).
    animal(id(14), reptil, tortuga,          vertebrado, fria,       escamas, no,   respirar, terrestre,oviparo,    no,    no, huesos, siente, vida, alta, vulnerable,  pequenio, lento).
    animal(id(15), reptil, camaleon,         vertebrado, fria,       escamas, no,   respirar, terrestre,oviparo,    no,    no, huesos, siente, vida, baja, vulnerable,  pequenio, lento).
    
    animal(id(16), ave, codorniz,            vertebrado, caliente,   plumas,  alas, respirar, terrestre,oviparo,    no, volar, huesos, siente, vida, media,    no,      pequenio, rapido).
    animal(id(17), ave, garza,               vertebrado, caliente,   plumas,  alas, respirar, terrestre,oviparo,    no, volar, huesos, siente, vida, media,    no,      pequenio, rapido).
    animal(id(18), ave, aguila,              vertebrado, caliente,   plumas,  alas, respirar, terrestre,oviparo,    no, volar, huesos, siente, vida, media,    no,      pequenio, rapido).
    animal(id(19), ave, tucan,               vertebrado, caliente,   plumas,  alas, respirar, terrestre,oviparo,    no, volar, huesos, siente, vida, media,    no,      pequenio, rapido).
    animal(id(20), ave, colibri,             vertebrado, caliente,   plumas,  alas, respirar, terrestre,oviparo,    no, volar, huesos, siente, vida, baja,     no,      pequenio, rapido).
    
    animal(id(21), mamifero, panda,          vertebrado, caliente,   pelo,    no,   respirar, terrestre,    no,   leche,  no,  huesos, siente, vida, media, vulnerable, grande,   lento).
    animal(id(22), mamifero, koala,          vertebrado, caliente,   pelo,    no,   respirar, terrestre,    no,   leche,  no,  huesos, siente, vida, media, vulnerable, pequenio, lento).
    animal(id(23), mamifero, leopardo,       vertebrado, caliente,   pelo,    no,   respirar, terrestre,    no,   leche,  no,  huesos, siente, vida, media, vulnerable, grande,   rapido).
    animal(id(24), mamifero, tigre,          vertebrado, caliente,   pelo,    no,   respirar, terrestre,    no,   leche,  no,  huesos, siente, vida, media, vulnerable, grande,   rapido).
    animal(id(25), mamifero, elefante,       vertebrado, caliente,   pelo,    no,   respirar, terrestre,    no,   leche,  no,  huesos, siente, vida, alta,  vulnerable, grande,   normal).
            1           2               3           4           5       6       7           8       9       10     11     12    13      14      15      16          17      18 `;
    //armar query
                        //1     2       3       4           5       6           7       8           9       10      11      12      13          14      15          16          17      18    
    let query = "animal(id(Y), @tipo, X, @vertebrado, @sangre, @exterior, @alas, @respira, @territorio, @oviparo, @leche, @volar, @huesos, @siente, @vida, @longevidad, @peligro, @tamanio, @velocidad ).";
    //
    const obj = JSON.parse(JSON.stringify(req.body)); // req.body = [Object: null prototype] { title: 'product' }
    console.log(obj);
    query = getLongevidad(obj, query);
    query = cleanQuery(query);

    session.consult( program );
    session.query( query);
    
   // session.answers( x => console.log( pl.format_answer(x) ) );
   var count_answers = 0
    var callback = function(answer) {
        if (answer === false) {
         
          console.log('DONE, #answers='+count_answers)
          return
        }
        if (answer === null) {
          console.log('TIMEOUT, #answers='+count_answers)
          return
        }
        // loop
        ++count_answers
        var respuesta = pl.format_answer(answer);
        var animal = {};
        try{
            animal = {"id":respuesta.split(",")[0].split("=")[1].trim(), "animal": respuesta.split(",")[1].split("=")[1].replace(";", "").trim()}
            animales.push(animal);
         }catch(e){}
        
        session.answer(callback)
      }
      // start the query loop
      session.answer(callback)
      res.send(animales.toString());
      
});

function getLongevidad(obj, query){   
    if(obj.longevidad_media){
        return query.replace('@longevidad', 'media');
    }
    if(obj.longevidad_alta){
        return query.replace('@longevidad', 'alta');
    }
    if(obj.longevidad_baja){
        return query.replace('@longevidad', 'baja');
    }

}

function cleanQuery(query){
    return query.replace("@tipo", "_").replace("@vertebrado", "_")
                .replace("@sangre", "_")
                .replace("@exterior",  "_")
                .replace("@alas", "_")
                .replace("@respira", "_")
                .replace("@territorio", "_")
                .replace("@oviparo", "_")
                .replace("@leche", "_")
                .replace("@volar", "_")
                .replace("@huesos", "_")
                .replace("@siente", "_")
                .replace("@vida", "_")
                .replace("@longevidad", "_")
                .replace("@peligro", "_")
                .replace("@tamanio", "_")
                .replace("@velocidad", "_");


}
module.exports = router;