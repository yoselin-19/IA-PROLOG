const express = require('express');
const pl = require('tau-prolog');
const {sustitucion} = require('../helpers/funciones');
const program = '../config/hechos.pl';

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
    //armar query
    let query = "animal(Y, @tipo, X, @vertebrado, @sangre, @exterior, @alas, @respira, @territorio, @oviparo, @leche, @volar, @huesos, @siente, @vida, @longevidad, @peligro, @tamanio, @velocidad).";
    
    query = sustitucion(req, query)
    console.log(query);

    session.consult(program);
    session.query(query);
    
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
        var respuesta = session.format_answer(answer);
        console.log(respuesta);
        var animal = {};
        try{
            animal = {"id":respuesta.split(",")[0].split("=")[1].trim(), "animal": respuesta.split(",")[1].split("=")[1].replace(";", "").trim()}
            animales.push(animal);
            console.log(animal);
         }catch(e){}
        
        session.answer(callback)
      }
      
      // start the query loop
      session.answer(callback)
      res.send(animales.toString());
});

module.exports = router;