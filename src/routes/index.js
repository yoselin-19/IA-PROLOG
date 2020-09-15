const { query } = require('express');
const express = require('express');
const pl = require('tau-prolog');

var session = pl.create( 1000 );
const router = express.Router();

router.get('/', async (req, res) => {
    res.render("pages/home")
});

router.get('/animal/:id', (req, res) => {
    res.render("pages/animal")
});

router.post('/consultar', (req, rest) => {
    var program =
    `animal(molusco, pulpo,           invertebrado, fria,       no,   no,  respirar, marino,   oviparo,   no,    no,     no, siente, vida, baja,  no,         grande, normal).
    animal(molusco, calamar_gigante, invertebrado, fria,        no,   no,   respirar, marino,   oviparo,    no,    no,     no, siente, vida, media, vulnerable, grande, normal).
    animal(molusco, sepia,           invertebrado, fria,        no,   no,   respirar, terrestre,oviparo,    no,    no,     no, siente, vida, baja,  no,         pequenio, lento).
    animal(molusco, nautilus,        invertebrado, fria,        no,   no,   respirar, marino,   oviparo,    no,    no,     no, siente, vida, alta,  vulnerable, pequenio, lento).
    animal(molusco, bivalvos,        invertebrado, fria,        no,   no,   respirar, terrestre,oviparo,    no,    no,     no, siente, vida, baja,  no,         pequenio, lento).
    
    animal(pez, cometa,              vertebrado, fria,       escamas, no,   respirar, acuatico, oviparo,    no,    no, huesos, siente, vida, baja,      no,     pequenio, rapido).
    animal(pez, beta,                vertebrado, fria,       escamas, no,   respirar, acuatico, oviparo,    no,    no, huesos, siente, vida, baja,      no,     pequenio, rapido).
    animal(pez, carpa_comun,         vertebrado, fria,       escamas, no,   respirar, acuatico, oviparo,    no,    no, huesos, siente, vida, baja,      no,     pequenio, rapido).
    animal(pez, oranda,              vertebrado, fria,       escamas, no,   respirar, acuatico, oviparo,    no,    no, huesos, siente, vida, baja,      no,     pequenio, rapido).
    animal(pez, espada,              vertebrado, fria,       escamas, no,   respirar, acuatico, oviparo,    no,    no, huesos, siente, vida, baja,      no,     pequenio, rapido).
    
    animal(reptil, iguana,           vertebrado, fria,       escamas, no,   respirar, terrestre,oviparo,    no,    no, huesos, siente, vida, media,     no,     pequenio, rapido).
    animal(reptil, lagarto,          vertebrado, fria,       escamas, no,   respirar, terrestre,oviparo,    no,    no, huesos, siente, vida, media,     no,     pequenio, rapido).
    animal(reptil, cocodrilo,        vertebrado, fria,       escamas, no,   respirar, terrestre,oviparo,    no,    no, huesos, siente, vida, alta, vulnerable,  grande,   normal).
    animal(reptil, tortuga,          vertebrado, fria,       escamas, no,   respirar, terrestre,oviparo,    no,    no, huesos, siente, vida, alta, vulnerable,  pequenio, lento).
    animal(reptil, camaleon,         vertebrado, fria,       escamas, no,   respirar, terrestre,oviparo,    no,    no, huesos, siente, vida, baja, vulnerable,  pequenio, lento).
    
    animal(ave, codorniz,            vertebrado, caliente,   plumas,  alas, respirar, terrestre,oviparo,    no, volar, huesos, siente, vida, media,    no,      pequenio, rapido).
    animal(ave, garza,               vertebrado, caliente,   plumas,  alas, respirar, terrestre,oviparo,    no, volar, huesos, siente, vida, media,    no,      pequenio, rapido).
    animal(ave, aguila,              vertebrado, caliente,   plumas,  alas, respirar, terrestre,oviparo,    no, volar, huesos, siente, vida, media,    no,      pequenio, rapido).
    animal(ave, tucan,               vertebrado, caliente,   plumas,  alas, respirar, terrestre,oviparo,    no, volar, huesos, siente, vida, media,    no,      pequenio, rapido).
    animal(ave, colibri,             vertebrado, caliente,   plumas,  alas, respirar, terrestre,oviparo,    no, volar, huesos, siente, vida, baja,     no,      pequenio, rapido).
    
    animal(mamifero, panda,          vertebrado, caliente,   pelo,    no,   respirar, terrestre,    no,   leche,  no,  huesos, siente, vida, media, vulnerable, grande,   lento).
    animal(mamifero, koala,          vertebrado, caliente,   pelo,    no,   respirar, terrestre,    no,   leche,  no,  huesos, siente, vida, media, vulnerable, pequenio, lento).
    animal(mamifero, leopardo,       vertebrado, caliente,   pelo,    no,   respirar, terrestre,    no,   leche,  no,  huesos, siente, vida, media, vulnerable, grande,   rapido).
    animal(mamifero, tigre,          vertebrado, caliente,   pelo,    no,   respirar, terrestre,    no,   leche,  no,  huesos, siente, vida, media, vulnerable, grande,   rapido).
    animal(mamifero, elefante,       vertebrado, caliente,   pelo,    no,   respirar, terrestre,    no,   leche,  no,  huesos, siente, vida, alta,  vulnerable, grande,   normal).
            1           2               3           4           5       6       7           8       9       10     11     12    13      14      15      16          17      18 `;
    //armar query
                        //1     2       3       4           5       6           7       8           9       10      11      12      13          14      15          16          17      18    
    let query = "animal(@tipo, X, @vertebrado, @sangre, @exterior, @alas, @respira, @territorio, @oviparo, @leche, @volar, @huesos, @siente, @vida, @longevidad, @peligro, @tamanio, @velocidad ).";
    //
    const obj = JSON.parse(JSON.stringify(req.body)); // req.body = [Object: null prototype] { title: 'product' }
    console.log(obj);
    query = getLongevidad(obj, query);
    query = cleanQuery(query);
    console.log(query);
    session.consult( program );
    session.query( query);
    session.answers( x => console.log( pl.format_answer(x) ) );


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