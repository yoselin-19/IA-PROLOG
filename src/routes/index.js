const express = require('express');
const pl = require('tau-prolog');
const { sustitucion, getAnimalSpecific } = require('../helpers/funciones');
const fs = require('fs')

const router = express.Router();
var session = pl.create(1000);
var animales = [];

router.get('/', async (req, res) => {
    res.render("pages/home")
});

router.get('/animal/:id', (req, res) => {
    let animal = getAnimalSpecific(Number(req.params.id));
    console.log(animal)
    if (animal !== {}) {
        res.render("pages/animal", { animal: animal })
    }

    res.render("pages/animal")
});

router.post('/consultar', (req, res) => {
    // console.log(req.body);
    //armar query
    let query = "animal(Y, @tipo, X, @vertebrado, @sangre, @exterior, @alas, @respira, @territorio, @oviparo, @leche, @volar, @huesos, @siente, @vida, @longevidad, @peligro, @tamanio, @velocidad).";
    query = sustitucion(req, query)

    fs.readFile('./src/config/hechos.pl', 'utf8', function (err, data) {
        session.consult(data);
    });

    console.log(query);
    session.query(query);

    animales = []

    var count_answers = 0
    var callback = function (answer) {
        if (answer === false) {
            console.log('DONE, #answers=' + count_answers)
            return
        }
        if (answer === null) {
            console.log('TIMEOUT, #answers=' + count_answers)
            return
        }

        // loop
        ++count_answers
        let respuesta = pl.format_answer(answer);
        console.log("Respuesta> "+respuesta);
        var animal = {};
        try {
            if(respuesta.includes("X")){
                animal = { "id": respuesta.split(",")[0].split("=")[1].trim(), "animal": respuesta.split(",")[1].split("=")[1].replace(";", "").trim() }
            } else {
                animal = { "id": respuesta.split(",")[0].split("=")[1].replace(";", "").trim(), "animal": req.body.nombre_animal }
            }
            
            animales.push(animal);
        } catch (e) { }

        session.answer(callback, 1000)
    }

    // start the query loop
    session.answer(callback, 1000)
    setTimeout( function() {
        console.log("termino");
        if(animales.length === 0){
            res.render("pages/home", {animales:animales, tValor:true});
        }
        res.render("pages/home", {animales:animales, tValor:false});
    }, 3000 );
});

module.exports = router;