/**
 * This controller defines an abstraction of the creating process.
 *
 * @author: Michael Bernagou
 * @date:   16/10/2015
 */


( function( angular ) {

    /**
     * @constructor
     * @param CreateService The related create service
     */
    function Controller( CreateService ) {
        this.service = CreateService;
        this.q = angular.injector(['ng']).get('$q');
    }

    angular.inherit( 'CreateController' , Controller ).from( 'BaseController' );


    /**
     * The item to create
     */
    Controller.prototype.itemToCreate = {};

    /**
     * The created item
     */
    Controller.prototype.createdItem = {};

    /**
     * Prepare the create operation ( filterables , etc.)
     */
    Controller.prototype.prepareCreate = function() {
        var defer = this.q.defer();
        var self = this;
        this.itemToCreate = {};
        this.service.prepareCreate( arguments )
           .then( function( data ) {
               self.initCreateItem = data;
               defer.resolve( data );
           }, function( error ) {
               defer.reject( error );
           });
        return defer.promise;
    };

    /**
     * Actions performed just before the create operation
     */
    Controller.prototype.doBeforeCreate = function() {
        /* Nothing by default */
    };

    /**
     * @returns true if the create operation can be performed
     */
    Controller.prototype.canCreate = function() {
        return true;
    };

    /**
     * @returns the promise resolved after the create operation and the call to doAfterXXXCreate function
     */
    Controller.prototype.create =  function() {
        var that = this;
        var defer = this.q.defer();
        if( this.canCreate() ) {
            this.doBeforeCreate();
            this.service.create( this.itemToCreate )
                .then( function( result ) {
                    that.doAfterSuccessCreate( result );
                    defer.resolve( result );
                }, function( error ) {
                    that.doAfterFailCreate( error );
                    defer.reject( error );
                });
        }
        else {
            this.doAfterFailCreate('canCreate() returns false');
            defer.reject('canCreate() returns false');
        }
        return defer.promise;
    };

    /**
     * Actions performed after the create operation has been successfully performed
     */
    Controller.prototype.doAfterSuccessCreate = function( ) {
        this.createdItem = this.itemToCreate;
    };

    /**
     * Actions performed after the create operation has been  performed with errors
     */
    Controller.prototype.doAfterFailCreate = function( ) {
        /* Nothing by default */
    };


}) ( angular );