

/**
 * This controller defines an abstraction of the creating process.
 *
 * @author: Michael Bernagou
 * @date:   16/10/2015
 */


( function( angular ) {

    /**
     * @constructor
     * @param ReadService The related create service
     */
    function Controller( ReadService ) {
        this.service = ReadService;
        this.q = angular.injector(['ng']).get('$q');
    }

    angular.inherit( 'ReadController' , Controller ).from( 'BaseController' );

    /**
    * The item id to read
    */
    Controller.prototype.itemId = {};

    /**
    * The read item
    */
    Controller.prototype.readItem = {};

    /**
    * Prepare the read operation ( filterables , etc.)
    */
    Controller.prototype.prepareRead = function() {
        var defer = this.q.defer();
        var self = this;
        this.service.prepareRead.apply( this.service , arguments )
           .then( function( data ) {
               self.initReadItem = data;
               defer.resolve( data );
           }, function( error ) {
               defer.reject( error );
           });
        return defer.promise;
    };


    /**
     * Actions performed just before the create operation
     */
    Controller.prototype.doBeforeRead = function() {};

    /**
     * @returns true if the read operation can be performed
     */
    Controller.prototype.canRead = function() {
        return true;
    };

    /**
     * @returns the promise resolved after the read operation and the call to doAfterXXXRead function
     */
    Controller.prototype.read =  function() {
        var that = this;
        var defer = this.q.defer();
        if( this.canRead() ) {
            this.doBeforeRead();
            this.service.read( this.itemId )
                .then( function( result ) {
                    that.doAfterSuccessRead( result);
                    defer.resolve( result );
                }, function( error ) {
                    that.doAfterFailRead( error );
                    defer.reject( error );
                });
        }
        else {
            this.doAfterFailRead('canRead() returns false');
            defer.reject('canRead() returns false');
        }
        return defer.promise;
    };

   /**
    * Actions performed after the create operation has been successfully performed
    */
    Controller.prototype.doAfterSuccessRead = function( result  ) {
        this.readItem = arguments[ 0 ];
    };
    
   /**
    * Actions performed after the create operation has been  performed with errors
    */
    Controller.prototype.doAfterFailRead = function( ) {};

}) ( angular );