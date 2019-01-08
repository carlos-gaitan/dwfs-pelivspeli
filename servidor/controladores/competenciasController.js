var Competencia = require('../modelos/competencias');

function obtenerCompetencias(req, res) {
  Competencia.obtenerTodas(function(error, resultadoQuery){
    if (error){
      return res.status(500).json("error en el servidor");
    }
    res.json({ competencias: resultadoQuery });
  });

};
module.exports = {
  obtenerCompetencias: obtenerCompetencias
};
