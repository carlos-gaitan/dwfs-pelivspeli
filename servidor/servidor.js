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
app.post('/competencias', competenciasController.agregarCompetencia);
app.get('/competencias/:id/peliculas', competenciasController.obtenerOpciones);
app.post('/competencias/:id/voto', competenciasController.votar);
app.get('/competencias/:id/resultados', competenciasController.obtenerResultados);

app.get('/generos', competenciasController.obtenerGeneros);
app.get('/directores', competenciasController.obtenerDirectores);
app.get('/actores', competenciasController.obtenerActores);
app.delete('/competencias/:id/votos', competenciasController.eliminarVotos);
app.delete('/competencias/:id', competenciasController.eliminarCompetencia);
app.get('/competencias/:id', competenciasController.obtenerInfoCompetencia);
app.put('/competencias/:id', competenciasController.editarCompetencia);




// app.get('/generos', generosController.obtenerGeneros);
// app.get('/peliculas/:id/', peliculasController.obtenerInfoPelicula);
// app.get('/recomendacion', peliculasController.obtenerPeliculaRecomendada);


//seteamos el puerto en el cual va a escuchar los pedidos la aplicación
var puerto = 8080;
app.listen(puerto, function () {
  console.log( "Escuchando en el puerto " + puerto );
});
