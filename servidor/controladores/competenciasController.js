var Competencia = require('../modelos/competencias');


function obtenerCompetencias(req, res) {
  Competencia.obtenerTodas(function(error, resultadoQuery){
    if (error){
      return res.status(500).json("error en el servidor");
    }
    res.json(resultadoQuery);
  });
};

// function obtenerOpciones(req, res) {
//   Competencia.obtenerOpciones(function(error, resultadoOpciones){
//     if (error){
//       return res.status(500).json("error en el servidor");
//     };
//     Competencia.obtenerNombreCompetencia(req.params.id, function(error, resultadoNombreCompetencia){
//       if (error){
//         return res.status(500).json("error en el servidor");
//       };
//       if (resultadoNombreCompetencia.length == 0){
//         return res.status(404).json("No se encontro ninguna competencia con ese id");
//       };
//       res.json({ peliculas: resultadoOpciones, competencia: resultadoNombreCompetencia[0].nombre });
//     });
//   });
// };

function obtenerOpciones (req, res) {
        var idCompetencia = req.params.id;
        var queryCompetencia = "SELECT nombre, genero_id, director_id, actor_id FROM competencia WHERE id = " + idCompetencia + ";";
        conexion.query(queryCompetencia, function(error, competencia, fields){
            if (error) {
                console.log("Hubo un error en la consulta", error.message);
                return res.status(500).send("Hubo un error en la consulta");
            }

            var queryPeliculas = "SELECT DISTINCT pelicula.id, poster, titulo, genero_id FROM pelicula LEFT JOIN actor_pelicula ON pelicula.id = actor_pelicula.pelicula_id LEFT JOIN director_pelicula ON pelicula.id = director_pelicula.pelicula_id WHERE 1 = 1";
            var genero = competencia[0].genero_id;
            var actor = competencia[0].actor_id;
            var director = competencia[0].director_id;
            var queryGenero = genero ? ' AND pelicula.genero_id = '  + genero : '';
            var queryActor = actor ? ' AND actor_pelicula.actor_id = ' + actor : '';
            var queryDirector = director ? ' AND director_pelicula.director_id = ' + director : '';
            var randomOrder = ' ORDER BY RAND() LIMIT 2';

            var query = queryPeliculas + queryGenero + queryActor + queryDirector + randomOrder;

            con.query(query, function(error, peliculas, fields){
                if (error) {
                    console.log("Hubo un error en la consulta", error.message);
                    return res.status(500).send("Hubo un error en la consulta");
                }

               var response = {
                    'peliculas': peliculas,
                    'competencia': competencia[0].nombre
                };

                //res.send(JSON.stringify(response));
                res.json(response);
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
  Competencia.verificaExistenciaCompetencia(req.body.nombre, function(error, resultadoExistenciaCompetencia){
    if (error){
      return res.status(500).json("error en el servidor");
    };
    if (resultadoExistenciaCompetencia.length > 0) {
      return res.status(422).json("Ya existe una competencia con ese nombre");
    };
    var competenciaInfo = {
      nombre: req.body.nombre,
      genero: req.body.genero === '0' ? null : req.body.genero,
      director: req.body.director === '0' ? null : req.body.director,
      actor: req.body.actor === '0' ? null : req.body.actor
    };
    Competencia.validacionDeCompetencia(competenciaInfo, function(error, resultadoValidacionDeCompetencia){
      if (error){
        return res.status(500).json("error en el servidor");
      };
      if (resultadoValidacionDeCompetencia.length < 2) {
        return res.status(422).json("Al menos deben existir dos películas que cumplan con los requisitos planteados por la competencia");
      };
      Competencia.agregarCompetencia(competenciaInfo, function(error, resultadoQuery){
        if (error) {
          return res.status(500).json("error en el servidor");
        };
        res.status(200).json("la competencia se agrego satisfactoriamente");
      });
    });
  });
};

function eliminarVotos(req, res){
  Competencia.eliminarVotos(req.params.id, function(error, resultadoQuery){
    if (error) {
      return res.status(500).json("error en el servidor");
    };
    res.status(200).json("los votos se eliminaron satisfactoriamente");
  });
};

function obtenerInfoCompetencia(req, res){
  Competencia.obtenerInfoCompetencia(req.params.id, function(error, resultadoQuery){
    if (error) {
      return res.status(500).json("error en el servidor");
    };
    var objetoResultadoQuery = {
              'id': resultadoQuery[0].id,
              'nombre': resultadoQuery[0].nombre,
              'genero_nombre': resultadoQuery[0].genero,
              'actor_nombre': resultadoQuery[0].actor,
              'director_nombre': resultadoQuery[0].director
          }
    res.json(objetoResultadoQuery);
  });
};

function eliminarCompetencia(req, res){
  Competencia.eliminarCompetencia(req.params.id, function(error, resultadoQuery){
    if (error) {
      return res.status(500).json("error en el servidor");
    };
    res.status(200).json("la competencia se elimino satisfactoriamente");
  });
};

function editarCompetencia(req, res){
  var nuevaInfo = {
    idCompetencia: req.params.id,
	  nuevoNombre: req.body.nombre
  };
  Competencia.editarCompetencia(nuevaInfo, function(error, resultadoQuery){
    if (error) {
      return res.status(500).json("error en el servidor");
    };

    res.status(200).json("la competencia se edito satisfactoriamente");
  });
};

module.exports = {
  obtenerCompetencias: obtenerCompetencias,
  obtenerOpciones: obtenerOpciones,
  votar: votar,
  obtenerResultados: obtenerResultados,
  obtenerGeneros: obtenerGeneros,
  obtenerDirectores: obtenerDirectores,
  obtenerActores: obtenerActores,
  agregarCompetencia: agregarCompetencia,
  eliminarVotos: eliminarVotos,
  obtenerInfoCompetencia: obtenerInfoCompetencia,
  eliminarCompetencia: eliminarCompetencia,
  editarCompetencia: editarCompetencia
};
