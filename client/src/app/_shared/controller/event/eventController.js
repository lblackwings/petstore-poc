
/**
 * An event controller is just a sugar wrapper for sending / listening events through the rootscope
 *
 * @author: Michael Bernagou
 * @date:   02/12/2015
 */

( function(angular) {

    function EventController( $rootScope ) {
        this.rootScope = $rootScope;
    }

    angular.inherit( 'EventController' , EventController ).from( 'BaseController' );

    /**
     * Send an event with some parameters
     */
    EventController.prototype.send = function( event , parameters ) {
        this.rootScope.$broadcast( event , parameters );
    };

    /**
     * Listen an event and reacts with some behavior
     */
    EventController.prototype.listen = function( event , callback ) {
        this.rootScope.$on( event , callback );
    };

}) ( angular );