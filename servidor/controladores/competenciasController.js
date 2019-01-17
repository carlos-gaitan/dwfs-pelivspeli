var Competencia = require('../modelos/competencias');

function obtenerCompetencias(req, res) {
  Competencia.obtenerTodas(function(error, resultadoQuery){
    if (error){
      return res.status(500).json("error en el servidor");
    }
    res.json(resultadoQuery);
  });
};

  function obtenerOpciones(req, res) {
    Competencia.obtenerOpciones(function(error, resultadoOpciones){
      if (error){
        return res.status(500).json("error en el servidor");
      };
      Competencia.obtenerNombreCompetencia(req.params.id, function(error, resultadoNombreCompetencia){
        if (error){
          return res.status(500).json("error en el servidor");
        };
        if (resultadoNombreCompetencia.length == 0){
          return res.status(404).json("No se encontro ninguna competencia con ese id");
        };
        res.json({ peliculas: resultadoOpciones, competencia: resultadoNombreCompetencia[0].nombre });
      });
    });
  };

  function votar(req, res){
    Competencia.votar(req.params.id, req.body.idPelicula, function(error, resultadoQuery){
        if (error) {
          return res.status(500).json("error en el servidor");
        };
        res.status(200).json("votacion efectuada satisfactoriamente");
    });
  };

  function obtenerResultados(req, res) {
    Competencia.obtenerResultados(req.params.id, function(error, resultadoQuery){
      if (error){
        return res.status(500).json("error en el servidor");
      };
      if (resultadoQuery.length == 0){
        return res.status(404).json("No se encontro ninguna competencia con ese id");
      };
      var objetoQuery = {
				    competencia:resultadoQuery[0].nombre,
				    resultados:[],
			    };
			resultadoQuery.forEach(function(element, index){
				var objetoResultado = {
					pelicula_id: resultadoQuery[index].pelicula_id,
					poster: resultadoQuery[index].poster,
					titulo: resultadoQuery[index].titulo,
					votos: resultadoQuery[index].votos,
			  }
				objetoQuery.resultados.push(objetoResultado);
		  });
      res.json(objetoQuery);
    });
  };

  function obtenerGeneros(req, res) {
    Competencia.obtenerGeneros(function(error, resultadoQuery){
      if (error){
        return res.status(500).json("error en el servidor");
      }
      res.json(resultadoQuery);
    });
  };

  function obtenerDirectores(req, res) {
    Competencia.obtenerDirectores(function(error, resultadoQuery){
      if (error){
        return res.status(500).json("error en el servidor");
      }
      res.json(resultadoQuery);
    });
  };

  function obtenerActores(req, res) {
    Competencia.obtenerActores(function(error, resultadoQuery){
      if (error){
        return res.status(500).json("error en el servidor");
      }
      res.json(resultadoQuery);
    });
  };

  function agregarCompetencia(req, res){
    Competencia.verificaExistenciaCompetencia(req.body.nombre, function(error, resultadoQueryUno){
      if (error){
        return res.status(500).json("error en el servidor");
      };
      if (resultadoQueryUno.length > 0) {
        return res.status(422).json("Ya existe una competencia con ese nombre");
      };
      var competenciaInfo = {
        nombre: req.body.nombre,
        genero: req.body.genero === '0' ? null : req.body.genero,
        director: req.body.director === '0' ? null : req.body.director,
        actor: req.body.actor === '0' ? null : req.body.actor
      };
      Competencia.agregarCompetencia(competenciaInfo, function(error, resultadoQuery){
        if (error) {
          return res.status(500).json("error en el servidor");
        };
        res.status(200).json("la competencia se agrego satisfactoriamente");
      });
    });
  };

  function eliminarVotos(req, res){
    Competencia.eliminarVotos(competenciaInfo, function(error, resultadoQuery){
      if (error) {
        return res.status(500).json("error en el servidor");
      };
      res.status(200).json("la competencia se agrego satisfactoriamente");
    });

  });

module.exports = {
  obtenerCompetencias: obtenerCompetencias,
  obtenerOpciones: obtenerOpciones,
  votar: votar,
  obtenerResultados: obtenerResultados,
  obtenerGeneros: obtenerGeneros,
  obtenerDirectores: obtenerDirectores,
  obtenerActores: obtenerActores,
  agregarCompetencia: agregarCompetencia,
  eliminarVotos: eliminarVotos
};
