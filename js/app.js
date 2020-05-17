/* Esta es una función autoejecutable de uso estricto, se usa desde Javascript ECMAScript 5 en adelante */
//https://material.io/guidelines/style/color.html#color-color-palette

(function () {
    'use strict';

/* app.js es el archivo encargado de hacer las configuraciones del sitio, para este caso puntual, las rutas de cada sección a las cuales asigno
los controladores y las paletas de colores disponibles, a las cuales luego haré referencia desde el DOM */

/* Al módulo general de la APP asigno las librerías requeridas, rutas, RESTFul service, Angular Material y modales de Angular Material  */
angular.module("FinalApp",["ngRoute","ngResource","ngMaterial","ngMessages"])
.config(function($routeProvider){
  //Con route provider, al método when le paso como parámetro la ruta y un objeto con las propiedades para el controlador, el alias del controlador y el template que usará dicho controlador.
  $routeProvider
  .when("/",{
    controller: "MainController",
    controllerAs: 'vm',
    templateUrl: "templates/home.html"
  })
  .when("/post/:id",{
    controller: "PostController",
    controllerAs: 'vm',
    templateUrl: "templates/post.html" 
  })
  .when("/posts/new",{
    controller: "NewPostController",
    controllerAs: 'vm',
    templateUrl: "templates/post_form.html"  
  })
  .when("/posts/edit/:id",{
    controller: "PostController",
    controllerAs: 'vm',
    templateUrl: "templates/post_form.html"
  })
})
//Configuro las paletas de colores utilizando las librerías correspondientes de Angular Material
.config(function($mdThemingProvider,$mdColorPalette) {

 //Declaro una variable que almacena un objeto que tendrá como objetivo extender, agregar colores a una paleta existente.
  var neonRedMap = $mdThemingProvider.extendPalette('red', {
    '500': '#ff0000',
    'contrastDefaultColor': 'dark'
  });
//Defino una plaeta, la cual también es extendida y recibe colores extra (comentario anterior)
  $mdThemingProvider.definePalette('neonRed', neonRedMap);

  $mdThemingProvider.definePalette('amazingPaletteName', {
    '50': 'ffebee',
    '100': 'ffcdd2',
    '200': 'ef9a9a',
    '300': 'e57373',
    '400': 'ef5350',
    '500': 'f44336',
    '600': 'e53935',
    '700': 'd32f2f',
    '800': 'c62828',
    '900': 'b71c1c',
    'A100': 'ff8a80',
    'A200': 'ff5252',
    'A400': 'ff1744',
    'A700': 'd50000',
    'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
                                        // on this palette should be dark or light

    'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
     '200', '300', '400', 'A100'],
    'contrastLightColors': undefined    // could also specify this if default was 'dark'
  });

//Esta es la paleta que se usa actualmente, está completamente personalizada y tiene un color por defecto + 16 colores.
  $mdThemingProvider.definePalette('negro', {
    'default': 'ef5350',
    '50': 'ffebee',
    '100': 'ffcdd2',
    '200': 'ef9a9a',
    '300': 'e57373',
    '400': 'ef5350',
    '500': 'f44336',
    '600': 'e53935',
    '700': 'd32f2f',
    '800': 'c62828',
    '900': 'b71c1c',
    'A100': 'ff8a80',
    'A200': 'ff5252',
    'A400': 'ff1744',
    'A700': 'd50000',
    'black': '000000',
    'white': 'FFFFFF'
  });

  //Así es como asigno como tema predeterminado al de Angular Material pero con "neoRed" como paleta primaria. 
  $mdThemingProvider.theme('default')
    .primaryPalette('neonRed');

  //Así es como asigno como tema el predeterminado de Angular Material pero con la paleta "negro" como primaria (sobreescribo la asignación anterior)
  $mdThemingProvider.theme('default')
    .primaryPalette('negro')
    .accentPalette('purple',{ //Esta es una paleta secundaria
      'default': '200'
    }).dark(); //Asigno la versión de paleta oscura de Angular Material, se aplicará en diapo

  //Este método me permite escuchar el un call to action para cambiar un tema
  $mdThemingProvider.alwaysWatchTheme(true);

  //Este método me permite asignar una paleta en particular como predeterminada (no quiero hacerlo por eso la comento)
  //$mdThemingProvider.setDefaultTheme('negro');

  //Este método me permite desabilitar los (no quiero hacerlo por eso la comento)
  //$mdThemingProvider.disableTheming();
});

})();