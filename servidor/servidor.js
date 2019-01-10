//paquetes necesarios para el proyecto
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');


var app = express();

//controllers
var competenciasController = require('./controladores/competenciasController');
//var generosController = require('./controladores/generosController');

app.use(cors());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

//routing
app.get('/competencias', competenciasController.obtenerCompetencias);
// app.get('/generos', generosController.obtenerGeneros);
// app.get('/peliculas/:id/', peliculasController.obtenerInfoPelicula);
// app.get('/recomendacion', peliculasController.obtenerPeliculaRecomendada);


//seteamos el puerto en el cual va a escuchar los pedidos la aplicación
var puerto = 8080;
app.listen(puerto, function () {
  console.log( "Escuchando en el puerto " + puerto );
});
