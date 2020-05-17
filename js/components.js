/* Esta es una función autoejecutable de uso estricto, se usa desde Javascript ECMAScript 5 en adelante */

(function () {
    'use strict';

    /* Al módulo de la aplicación le asigno un componente con el método factory para mosrar un botón que lleve el scroll de la página a la posición superior */
angular.module('FinalApp') 
.factory('bookMark', function(){
    //Declaro las variables de posición y tiempo con sus valores por defecto
    var position = 0;
    var time = 0;
    //Creo un objeto que será retornado en la función de la factory -bookMark-
    var interfaz = {
        //name: "Scrolling",

        //Creo el método que hace scroll de la página desde su posición actual hasta el top
        goTop: function(element,speed){
            //Recibo como parámetro el elemento botón donde hago click para ocultarlo seteando la clase CSS correspondinete
            angular.element(element).removeClass("in");
            angular.element(element).addClass("out");
            //Inicio un timeout para que el desplazamiento sea progresivo
            time = setTimeout(move,20);
            function move(){
                //Si ya he llegado a la posición borro el timeout y lo ubico en la posición 0
               if(position <= speed){
                    position = 0;
                    clearInterval(time);
                //De lo contrario incremento su desplazamiento de acuerdo a la velocidad recibida por parámetro y vuelvo a crear 
                }else{
                    position = position - speed;
                    time = setTimeout(move,20);
                }
                //Aplico la posición al scroll
                window.scrollTo(0,position);
            }
        },
        //Método que me permite iniciar el componente y crear el oyente que escucha el movimiento de la barra de scroll para saber cuando mostrar o cuando ocultar el botón
        startScroll: function(element){
            window.addEventListener("scroll", function (event) {
                //Defino la posición actual de la barra de scroll
                position = window.pageYOffset;
                //Si la posición llega al top, oculto el botón por medio de las animaciones de CSS
                if(position <= 0){
                    angular.element(element).removeClass("in");
                    angular.element(element).addClass("out");
                //De lo contrario, lo muestro
                }else{
                    angular.element(element).removeClass("out");
                    angular.element(element).addClass("in");
                }
            });
        }
    }
    //Retorno el objeto con los métodos correspondiente
    return interfaz;
});

})();