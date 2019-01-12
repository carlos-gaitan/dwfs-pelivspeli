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
  var consultaSql = "";
  conexion.query(consultaSql, cb);
};

module.exports = Competencia;
