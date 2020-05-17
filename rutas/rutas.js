//Instancio el driver para conectarse a la DB de Mongo
var mongoose = require('mongoose');

//mongoose.Promise = global.Promise;
//mongoose.Promise = require('bluebird');

//Me conecto a la base pasando como parámetro la URL de la IP + el nombre de la db con el prefijo "mongodb" y un objeto con la propiedad useMongoClient como true.
mongoose.connect('mongodb://localhost/quotes',{ useMongoClient: true });

//Defino una variable con cada una de las columnas de la tabla y sus respectivos tipos
var quotesSchema = {
	autor: String,
	quote: String,
	fecha: Date,
	url: String,
	foto: String
}

//Creo el modelo de la tabla asignando el esquema
var quotes = mongoose.model('quotes', quotesSchema);

//Creo y exporto los metodos para ser usados como métodos de este mismo objeto (rutas.js)

//Obtengo todos los registros de la tabla "quotes"
exports.getAll = function(req, res){
	quotes.find(function(error, data){
		res.send(data);
	});
}

//Obtengo un registro determinado pasando por parámetro un objeto con el ID
exports.getById = function(req, res){
	quotes.findOne({ "_id": req.params.id }, function(error, data){
		//Envío los datos recibidos
		res.send(data);
	});
}

//Elimino un registro determinado pasando como parámetro un objeto con el ID
exports.delete = function(req, res){
	quotes.remove({ "_id": req.params.id }, function(error,resultado){
		//Si me da error imprimo el error en la consola
		if(error){
			console.log(error);
		//de lo contrario envío true para comprobar que se eliminó correctamente
		}else{
			res.send(resultado[0]);
		}
	});
}

//Agrego un registro a la tabla pasando como parámetro 
exports.add = function(req, res){
	var data = {
		autor: req.body.autor,
		quote: req.body.quote,
		fecha: new Date(),
		url: req.body.url,
		foto: req.body.foto
	}
	//Creo una instancia para un nuevo registro en la tabla pasando como parámetro un objeto con los datos de cada campo
	var quote = new quotes(data);
	//Guardo el nuevo registro
	quote.save(function(error,resultado){
		//Si me da error imprimo el error en la consola
		if(error){
			res.send("Hubo un error");
		//de lo contrario envío el resultado
		}else{
			res.send(resultado[0]);
		}
	});
}

//Actualizo un registro de la tabla pasando un parámetro con el ID del registro y otro con los nuevos datos de cada campo
exports.edit = function(req, res){
	var data = {
		autor: req.body.autor,
		quote: req.body.quote,
		fecha: new Date(),
		url: req.body.url,
		foto: req.body.foto
	}

	quotes.update({ "_id": req.params.id },data, function(error,resultado){
		//Envío los nuevos datos actualizados
		if(error){
			res.send("Hubo un error");
		//de lo contrario envío el resultado
		}else{
			res.send(resultado[0]);
		}
	});
}