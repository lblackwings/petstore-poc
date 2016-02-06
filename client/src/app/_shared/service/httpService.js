/**
 * Http Service provide common action over http
 */
(function(angular, appName) {

		/**
		 * Constructor
		 */
    function HttpService( $http, $q ) {

        this.http = $http;
        this.q = $q;

				// Default serviceUrl (its why HttpService is linked to appName)
        this.serviceUrl = '/petstore';

        this.get = function(url, config) {
            var deferred = this.q.defer();
            this.http.get(  this.serviceUrl + url, config).then(
                function (result) {
                    deferred.resolve(result.data);
                },
                function (result) {
                    deferred.reject(result);
                }
            );
            return deferred.promise;
        };

        this.post = function(url, payload, config) {
            var deferred = this.q.defer();
            this.http.post( this.serviceUrl + url, payload, config).then(
                function (result) {
                    deferred.resolve(result.data);
                },
                function (result) {
                    deferred.reject(result);
                }
            );
            return deferred.promise;
        };

        this.put = function(url, payload, config) {
            var deferred = this.q.defer();
            this.http.put( this.serviceUrl + url, payload, config).then(
                function (result) {
                    deferred.resolve(result.data);
                },
                function (result) {
                    deferred.reject(result);
                }
            );
            return deferred.promise;
        };


        this.delete = function(url, config, payload ) {
            var deferred = this.q.defer();
            this.http.delete( this.serviceUrl + url, config , payload).then(
                function (result) {
                    deferred.resolve(result.data);
                },
                function (result) {
                    deferred.reject(result);
                }
            );
            return deferred.promise;
        };

    }

    angular.module(appName).service('HttpService', HttpService);

}) (angular, 'petstore');
