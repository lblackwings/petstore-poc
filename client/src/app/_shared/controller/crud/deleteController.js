
/**
 * This controller defines an abstraction of the updating process.
 *
 * @author: Michael Bernagou
 * @date:   15/10/2015
 */


( function( angular ) {

    /**
     * @constructor
     * @param DeleteService The related delete service
     */
    function Controller( DeleteService ) {
        this.service = DeleteService;
        this.q = angular.injector(['ng']).get('$q');
    }

    angular.inherit( 'DeleteController' , Controller ).from( 'BaseController' );


    /**
     * The id of the item to delete
     */
     Controller.prototype.itemToDeleteId;

    /**
     * Actions performed just before the delete operation
     */
     Controller.prototype.doBeforeDelete = function() {};

    /**
     * @returns true if the delete operation can be performed
     */
    Controller.prototype.canDelete = function() {
        return true;
    };

    /**
     * @returns the promise resolved after the delete operation and the call to doAfterXXXDelete function
     */
    Controller.prototype.delete =  function() {
        var that = this;
        var defer = this.q.defer();
        if( this.canDelete() ) {
            this.doBeforeDelete();
            this.service.delete( this.itemToDeleteId )
                .then( function(  ) {
                    that.doAfterSuccessDelete(  );
                    defer.resolve(  );
                }, function( error ) {
                    that.doAfterFailDelete( error );
                    defer.reject( error );
                });
            return defer.promise;
        }
        else {
            this.doAfterFailDelete('canDelete() returns false');
            defer.reject('canDelete() returns false');
        }
    };

    /**
     * Actions performed after the delete operation has been successfully performed
     * @param result    The result of the delete operation
     */
    Controller.prototype.doAfterSuccessDelete = function() { };

    /**
     * Actions performed after the delete operation has been  performed with errors
     * @param result    The result of the delete operation
     */
    Controller.prototype.doAfterFailDelete = function() { };

    /**
     * The ids of the item to delete
     */
     Controller.prototype.itemToDeleteIds;


    /**
     * Actions performed just before the deleteAll operation
     */
     Controller.prototype.doBeforeDeleteAll = function() {};

    /**
     * @returns true if the deleteAll operation can be performed
     */
    Controller.prototype.canDeleteAll = function() {
        return true;
    };

    /**
     * @returns the promise resolved after the deleteAll operation and the call to doAfterXXXDelete function
     */
    Controller.prototype.deleteAll =  function() {
        var that = this;
        var defer = this.q.defer();
        if( this.canDeleteAll() ) {
            this.doBeforeDeleteAll();
            this.service.deleteAll( this.itemToDeleteIds )
                .then( function(  ) {
                    that.doAfterSuccessDeleteAll(  );
                    defer.resolve(  );
                }, function( error ) {
                    that.doAfterFailDeleteAll( error );
                    defer.reject( error );
                });
            return defer.promise;
        }
        else {
            this.doAfterFailDelete('canDelete() returns false');
            defer.reject('canDelete() returns false');
        }
    };

    /**
     * Actions performed after the deleteAll operation has been successfully performed
     * @param result    The result of the delete operation
     */
    Controller.prototype.doAfterSuccessDeleteAll = function() {};

    /**
     * Actions performed after the deleteAll operation has been  performed with errors
     * @param result    The result of the delete operation
     */
    Controller.prototype.doAfterFailDeleteAll = function() {};

}) ( angular );