var conexion = require('../lib/conexionbd');

var Competencia = function(id, nombre){
  this.id = id;
  this.nombre = nombre;
};
Competencia.obtenerTodas = function(cb){
  var consultaSql = "SELECT * from competencia";
  conexion.query(consultaSql, cb);
};

module.exports = Competencia;
