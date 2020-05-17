/* Esta es una función autoejecutable de uso estricto, se usa desde Javascript ECMAScript 5 en adelante */

(function () {
    'use strict';
angular.module('FinalApp')
.factory('PostResource',function ($resource) {
	return $resource("quotes/:id",{ id : "@id" },{ update: { method: "PUT" }, save: { method: "POST" }});
});

})();

/* Creo un único servicio implementando PostResourse para cada uno de los métodos de la API (get, put, post, delete) */