/* 
Con una directiva puedo crear un tag personalizado que cumpla determinada función, en este caso bigTitle concatena un prefijo al título de la página, título que se especifica como propiedad en el tag.
En el template principal de la index, aparece en el H1 la propiedad con el nombre "big-title" y la propiedad title la cual se concatena al prefijo.
*/

(function () {
    'use strict';
    //Especifico el módulo para el cual quiero crear la directiva.
    angular.module('FinalApp')
    .directive('bigTitle', function() {
        return {
            name : "AngularJS Material",
            template: function(elem, attr) {
                return `${ this.name } ${ attr.title }`;
              }
          };
      });
})();