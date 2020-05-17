/* Aquí procedo a importar las librerías para construir una REST API */

/* 
La transferencia de estado representacional (en inglés representational state transfer) o REST 
es un estilo de arquitectura software para sistemas hipermedia distribuidos como la World Wide Web. 
El término se originó en el año 2000, en una tesis doctoral sobre la web escrita por Roy Fielding, 
uno de los principales autores de la especificación del protocolo HTTP y ha pasado a ser ampliamente utilizado por la comunidad de desarrollo.
*/

//Instancio el framework Express
var express = require('express');
//Instancio el framework que interpreta el tipo de datos
var bodyParser = require('body-parser');
//Solicito el archivo con las rutas
var rutas = require('./rutas.js');

//Defino la variable app como tipo express
var app = express();
//Defino al tipo de datos devuelto por la API con el formato Json
app.use(bodyParser.json());
//Espeficico una codificación para las URL (Necesario si en los datos devueltos vienen caracgteres especiales)
app.use(bodyParser.urlencoded({extended: true}));

//Rutas para las distintas peticiones de datos
app.get('/quotes',rutas.getAll); //Obtengo todos los registros
app.get('/quotes/:id',rutas.getById); //Obtengo un registro por ID
app.post('/quotes',rutas.add); //Agrego un nuevo registro
app.put('/quotes/:id',rutas.edit); //Edito registro
app.delete('/quotes/:id',rutas.delete); //Borro un registro

//Sirvo este código del lado del cliente
app.use('/',express.static('../'));
//Defino el puerto en donde estará escuchando la aplicación
app.listen(3000);
console.log("Escuchando en el puerto 3000");