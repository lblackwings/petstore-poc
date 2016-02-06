
/**
 * This is an abstract service which allows all the CRUD REST-based operations.
 * All operation has a common given base url.
 *
 * Author: Michael Bernagou
 * Date:   23/09/2015
 */
(function(angular) {

    /**
     * Constructor
     * @param url           The base url of all the operations
     * @param HttpService   The http service
     */
    function CrudsService( url , HttpService ) {
        this.super( 'BaseService' , [] );
        this.serviceUrl = url;
        this.httpService = HttpService;
    }

    angular.inherit( 'CrudsService' , CrudsService ).from( 'BaseService' );

    /**
     * Http request for creation preparation
     */
    CrudsService.prototype.prepareCreate = function() {
        return this.httpService.get( this.serviceUrl + '/create/init' );
    };

    /**
     * Http request for read preparation
     */
    CrudsService.prototype.prepareRead = function() {
        return this.httpService.get( this.serviceUrl + '/read/init' );
    };

   /**
    * Http request for update preparation
    */
    CrudsService.prototype.prepareUpdate = function() {
        return this.httpService.get( this.serviceUrl + '/update/init' );
    };

   /**
    * Http request for read preparation
    */
    CrudsService.prototype.prepareSearch = function() {
        return this.httpService.get( this.serviceUrl + '/search/init' );
    };

   /**
    * Http request for creation
    * @param item The item to create
    */
    CrudsService.prototype.create = function( item ) {
        return this.httpService.post( this.serviceUrl , item );
    };

   /**
    * Http request for reading
    * @param  id The item identifier
    */
    CrudsService.prototype.read = function( id ) {
        return this.httpService.get( this.serviceUrl + '/' + id );
    };

   /**
    * Http request for updating
    * @param  item The item to update
    */
    CrudsService.prototype.update = function( item ) {
        return this.httpService.put( this.serviceUrl , item );
    };

   /**
    * Http request for deletion
    */
    CrudsService.prototype.delete = function( id ) {
        return this.httpService.delete( this.serviceUrl + '/' + id );
    };

   /**
    * Http request for searching
    * @param filter The search filter
    */
    CrudsService.prototype.search = function( filter ) {
        return this.httpService.post( this.serviceUrl + '/filter' , filter );
    };

}) ( angular );
