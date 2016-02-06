
/**
 * Directive used to show / hide the spinner baed upon rootscope event exchange
 *
 * Author: Michael Bernagou, Sfeir Luxembourg
 */

( function( angular , appName ) {

    function directive( ) {
        return function( $scope , element ) {
            $scope.$on("event:ui-showSpinner", function () {
                return element.show();
            });
            return $scope.$on("event:ui-hideSpinner", function () {
                return element.hide();
            });
        };
    }

    angular.module( appName ).directive( 'spinner' , directive );

}) ( angular , 'petstore' );
