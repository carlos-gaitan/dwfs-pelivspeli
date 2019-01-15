var conexion = require('../lib/conexionbd');

var Competencia = function(id, nombre){
  this.id = id;
  this.nombre = nombre;
};
Competencia.obtenerTodas = function(cb){
  var consultaSql = "SELECT * from competencia";
  conexion.query(consultaSql, cb);
};
Competencia.obtenerOpciones = function(cb){
  var consultaSql = "SELECT id, poster, titulo from pelicula ORDER BY RAND() LIMIT 2";
  conexion.query(consultaSql, cb);
};
Competencia.obtenerNombreCompetencia = function(id, cb){
  var consultaSql = `SELECT nombre FROM competencia WHERE id = ${id}`;
  conexion.query(consultaSql, cb);
};

Competencia.votar = function(idCompetencia, idPelicula, cb){
  var consultaSql = `INSERT INTO voto (competencia_id, pelicula_id) values (${idCompetencia}, ${idPelicula})`;
  conexion.query(consultaSql, cb);
};

Competencia.obtenerResultados = function(idCompetencia, cb){
  var consultaSql = `SELECT pelicula_id, COUNT(*) AS votos, pelicula.poster, pelicula.titulo, competencia.nombre FROM voto JOIN competencia ON voto.competencia_id = competencia.id JOIN pelicula ON voto.pelicula_id = pelicula.id WHERE voto.competencia_id = ${idCompetencia} GROUP BY competencia_id, pelicula_id HAVING COUNT(*) >= 1 ORDER BY votos DESC LIMIT 3`;
  conexion.query(consultaSql, cb);
};

Competencia.obtenerGeneros = function(cb){
  var consultaSql = "SELECT * from genero";
  conexion.query(consultaSql, cb);
};

Competencia.obtenerDirectores = function(cb){
  var consultaSql = "SELECT * from director";
  conexion.query(consultaSql, cb);
};

Competencia.obtenerActores = function(cb){
  var consultaSql = "SELECT * from actor";
  conexion.query(consultaSql, cb);
};

Competencia.agregarCompetencia = function(competenciaInfo, cb){
  var consultaSql = `INSERT INTO competencia (nombre, genero_id, director_id, actor_id) VALUES (${competenciaInfo.nombre}, ${competenciaInfo.genero}, ${competenciaInfo.director}, ${competenciaInfo.actor})`;
  console.log(consultaSql);
  conexion.query(consultaSql, cb);
};

module.exports = Competencia;
