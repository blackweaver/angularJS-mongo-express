/* Esta es una función autoejecutable de uso estricto, se usa desde Javascript ECMAScript 5 en adelante */

(function () {
    'use strict';

		/* Al módulo de la aplicación le asigno un controlador, el que será implementado exclusivamente en la index del sitio */
angular.module("FinalApp")

/* Controlador para la index, el que utiliza módulos nativos de angularjs, angular material y el componente "bookMark" */
.controller("IndexController",function($scope,$window,bookMark,$timeout,$mdSidenav,$log){

	//Esta variable almacena el scope actual
	var vm = this;

	/* Inicio de funciones que implementan el slide responsive de AngularJS Material */
    vm.isOpenRight = function(){
      return $mdSidenav('right').isOpen();
    };

    vm.debounce = function(func, wait, context) {
      var timer;

      return function debounced() {
        var context = $scope,
        args = Array.prototype.slice.call(arguments);
        $timeout.cancel(timer);
        timer = $timeout(function() {
          timer = undefined;
          func.apply(context, args);
        }, wait || 10);
      };
    }

    vm.buildDelayedToggler = function(navID) {
      return vm.debounce(function() {
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug("toggle " + navID + " is done");
          });
      }, 200);
		}
		
    vm.buildToggler = function(navID) {
      return function() {
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug("toggle " + navID + " is done");
          });
      };
    }

    vm.toggleLeft = vm.buildDelayedToggler('left');
		vm.toggleRight = vm.buildToggler('right');
		
/* Fin de funciones que implementan el slide responsive de AngularJS Material */


//Esta función se ejecuta cuando quiero desplazar el scroll al top del navegador, la misma implementa el componente creado por el desarrollador
	vm.scrollTop = function(){
		//Llamo al método del componente pasando el elemento botón y la cantidad de desplazamiento
		bookMark.goTop(document.querySelector('.docs-scroll-fab'),50);
	}
	//Inicio el componente bookMark
	bookMark.startScroll(document.querySelector('.docs-scroll-fab'));

})

/* Controlador para la home, el que utiliza módulos nativos de angularjs, angular material y la librería PostResource */
.controller("MainController",function($scope,$window,$http,PostResource,$routeParams,$mdDialog){

	//Esta variable almacena el scope actual
	var vm = this;
	//Implemento la librería PostResource para hacer la consulta, traerme las quotes y guardarlas en la propiedad posts
	vm.posts = PostResource.query();

	//Función pensada para remover quotes, recibo el evento y el ID del quote
	vm.removePost = function(ev,ids){
	//Implemento modal del confirmación de angular material
		var confirm = $mdDialog.confirm()
	          .title('Vas a borrar esta quote')
	          .textContent('Realmente quieres borrar esta gema de la literatura.')
	          .targetEvent(ev)
	          .ok('Borrar')
	          .cancel('Salir');

	    $mdDialog.show(confirm).then(function() {
				//Llamo al método delete de la API REST implementando la librería PostResource, pasando un objeto con el ID como parámetro y la función callback de respuesta
				PostResource.delete({id: ids},function(data){
					console.log(data.$resolved);
				});
				//Filtro las quotes resultantes sin la última borrada para que se actualice el DOM
				vm.posts = vm.posts.filter(function(element){
					return element._id !== ids;
				});
	    }, function() {});

	}
})
/* Controlador para mostrar el quote, el que utiliza módulos nativos de angularjs y la librería PostResource */
.controller("PostController", function ($scope,$http,PostResource,$routeParams,$location) {

	//Esta variable almacena el scope actual
	var vm = this;
  //Esta variable almacena el texto para el H1 de la página
	vm.title = "Editar quote";
	//Llamo al método get de la API REST implementando la librería PostResource, pasando un objeto con el ID recibido por parámetro en la URL y la función callback de respuesta
	PostResource.get({id: $routeParams.id},function(data){
		//Una vez que han sido cargados los datos, declaro la variable del scope con los mismos así son actualizados por angular
		vm.post = data;
	});

	//Función pensada para guardar la quote editada
	vm.savePost = function(){
		//Llamo al método update de la API REST implementando la librería PostResource, pasando un objeto con el ID recibido por parámetro en la URL, el objeto con los datos de la quote y la función callback de respuesta
		PostResource.update({id: $routeParams.id},vm.post,function(data){
			//Una vez actualizada la quote, redirecciono la URL a la página que la lista
			$location.path("/post/" + vm.post._id);
			
		});
	}
})
/* Controlador para el formulario de creación de quotes, el que utiliza módulos nativos de angularjs y la librería PostResource */
.controller("NewPostController", function ($scope,$http,PostResource,$location) {
	//Esta variable almacena el scope actual
	var vm = this;
	//Esta variable almacena el texto para el H1 de la página
	vm.title = "Crear quote";
  //Declaro vacío el objeto con los datos del nuevo quote, a la espera de los datos ingresados por el usuario en el formulario
	vm.post = {};
	//Por defecto asigno una foto genérica
	vm.post.foto = "https://www.woowanted.com/images/content/bigno-image.png";

	//Función pensada para guardar la nueva quote
	vm.savePost = function(){
		//Llamo al método update de la API REST implementando la librería PostResource, pasando un objeto con los datos de la quote y la función callback de respuesta
		$http.post("quotes/",vm.post).then(function(success) {
			//Una vez creada la nueva quote, redirecciono a la home, la cual mostrara debiamente todas las quotes, incluída la nueva
			$location.path("/");
 		 });
	}
});

})();
