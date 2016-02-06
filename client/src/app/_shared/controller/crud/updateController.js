

/**
 * This controller defines an abstraction of the updating process.
 *
 * @author: Michael Bernagou
 * @date:   25/09/2015
 */


( function( angular ) {

    /**
     * @constructor
     * @param UpdateService The related update service
     */
    function UpdateController( UpdateService ) {
        this.service = UpdateService;
        this.q = angular.injector(['ng']).get('$q');
    }

    angular.inherit( 'UpdateController' , UpdateController ).from( 'BaseController' );


    /**
     * The item to update
     */
    UpdateController.prototype.itemToUpdate = {};

    /**
     * The updated item
     */
    UpdateController.prototype.updatedItem = {};

    /**
     * Prepare the update operation ( filterables , etc.)
     */
    UpdateController.prototype.prepareUpdate = function() {
        var defer = this.q.defer();
        var self = this;
        this.itemToUpdate = {};
        this.service.prepareUpdate( arguments )
           .then( function( data ) {
               self.initUpdateItem = data;
               defer.resolve( data );
           }, function( error ) {
               defer.reject( error );
           });
        return defer.promise;
    };

    /**
     * Actions performed just before the update operation
     */
    UpdateController.prototype.doBeforeUpdate = function() {
        /* Nothing by default */
    };

    /**
     * @returns true if the create operation can be performed
     */
    UpdateController.prototype.canUpdate = function() {
        return true;
    };

    /**
     * @returns the promise resolved after the update operation and the call to doAfterXXXUpdate function
     */
    UpdateController.prototype.update =  function() {
        var that = this;
        var defer = this.q.defer();
        if( this.canUpdate() ) {
            this.doBeforeUpdate();
            this.service.update( this.itemToUpdate )
                .then( function( result ) {
                    that.doAfterSuccessUpdate( result );
                    defer.resolve( result );
                }, function( error ) {
                    that.doAfterFailUpdate( error );
                    defer.reject( error );
                });
        }
        else {
            this.doAfterFailUpdate('canUpdate() returns false');
            defer.reject('canUpdate() returns false');
        }
        return defer.promise;
    };

    /**
     * Actions performed after the create operation has been successfully performed
     */
    UpdateController.prototype.doAfterSuccessUpdate = function( ) {
        this.updatedItem = this.itemToUpdate;
    };

    /**
     * Actions performed after the create operation has been  performed with errors
     */
    UpdateController.prototype.doAfterFailUpdate = function( ) {
        /* Nothing by default */
    };


}) ( angular );