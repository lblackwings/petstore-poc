
/**
 * This controller defines an abstraction of the searching process.
 *
 * @author: Michael Bernagou
 * @date:   23/09/2015
 */

( function( angular ) {

    /**
     * Constructor
     * @param SearchService The related search service
     */
    function SearchController( SearchService ) {
        this.service = SearchService;
        this.q = angular.injector(['ng']).get('$q');
    }

    angular.inherit( 'SearchController' , SearchController ).from( 'BaseController' );

    /**
     * The filter object
     */
     SearchController.prototype.filter = {};

    /**
     * The searched items
     */
     SearchController.prototype.searchedItems = [];

    /**
     * The initial data required for searching
     */
     SearchController.prototype.initSearchItem = [];

    /**
     * Prepare the search operation ( filterables , etc.)
     */
    SearchController.prototype.prepareSearch = function() {
        var self = this;
        var defer = this.q.defer();
        this.service.prepareSearch( arguments )
            .then( function( data ) {
                self.initSearchItem = data;
                defer.resolve( data );
            }, function( error ) {
                defer.reject( error );
            });
        return defer.promise;
    };

   /**
    * @returns true if the search operation can be performed
    */
    SearchController.prototype.canSearch = function() {
        return true;
    };

    /**
     * @returns the promise resolved after the search operation and the call to doAfterXXXSearch function
     */
    SearchController.prototype.search =  function() {
        var that = this;
        var defer = this.q.defer();
        if( this.canSearch() ) {
            this.doBeforeSearch();
            this.service.search( this.filter )
                .then( function( result ) {
                    that.doAfterSuccessSearch( result );
                    defer.resolve( result );
                }, function( error ) {
                    that.doAfterFailSearch( error  );
                    defer.reject( error );
                });
        }
        else {
            this.doAfterFailSearch( 'canSearch() returns false' );
            defer.reject( 'canSearch() returns false' );
        }
        return defer.promise;
    };

    /**
     * Actions performed just before the search operation
     */
     SearchController.prototype.doBeforeSearch = function() {
        /* Nothing by default */
     };

    /**
     * Actions performed after the search operation has been successfully performed
     * @param result    The result of the search operation
     */
    SearchController.prototype.doAfterSuccessSearch = function( result ) {
        this.searchedItems = result;
    };

    /**
     * Actions performed after the search operation has been  performed with errors
     */
    SearchController.prototype.doAfterFailSearch = function( ) {
        /* By default, do nothing */
    };

}) ( angular );