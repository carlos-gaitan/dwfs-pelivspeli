var Competencia = require('../modelos/competencias');

function obtenerCompetencias(req, res) {
  Competencia.obtenerTodas(function(error, resultadoQuery){
    if (error){
      return res.status(500).json("error en el servidor");
    }
    res.json(resultadoQuery);
    //res.json({ competencias: resultadoQuery });
    //res.send(JSON.stringify(resultadoQuery));
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
        res.json({ peliculas: resultadoOpciones, competencia: resultadoNombreCompetencia[0].nombre  });
        //res.json({ competencias: resultadoQuery });
        //res.send(JSON.stringify(resultadoQuery));
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
			    }

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
      // res.json({ competencias: resultadoQuery });
      // res.send(JSON.stringify(resultadoQuery));
    });
  };


module.exports = {
  obtenerCompetencias: obtenerCompetencias,
  obtenerOpciones: obtenerOpciones,
  votar: votar,
  obtenerResultados: obtenerResultados
};
