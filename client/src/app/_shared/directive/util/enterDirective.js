
/**
 * This directive handles the key 'Enter' pressed and call the function passed as parameter
 *
 * Author: Michael Bernagou, Sfeir Luxembourg
 */

( function( angular , appName ) {

    function directive( ) {
        return function (scope, element, attrs) {
            element.bind("keydown keypress", function (event) {
                if(event.which === 13) {
                    scope.$apply(function (){
                       scope.$eval(attrs.ngEnter);
                    });

                    event.preventDefault();
                }
            });
        };
    }

    angular.module( appName ).directive( 'ngEnter' , directive );

}) ( angular , 'petstore' );
