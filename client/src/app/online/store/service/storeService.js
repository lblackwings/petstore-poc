/**
 * Store Service
 */
(function(angular, appName) {
	'use strict';

	/**
	 * Constructor
	 */
	function Service ($q, $http, HttpService) {
		this.super('CrudsService', ['/pet', HttpService]);
		this.super('AuthenticateService', [$q, HttpService]);
		this.q = $q;
		this.http = $http;
		this.httpService = HttpService;
	};

	angular.expand('StoreService', Service).from(['CrudsService', 'AuthenticateService']);

	/**
	 * Specific search pet by id
	 */
	Service.prototype.searchById = function (id) {
  			var deferred = this.q.defer();
  			this.http.get('/petstore/pet/' + id)
  					.then(
  						function(result) {
  							deferred.resolve(result.data);
  						},
  						function(result) {
  							deferred.reject(result);
  						}
  					);
  			return deferred.promise;
  	};

	angular.module(appName).service('StoreService', ['$q', '$http', 'HttpService', function ($q, $http, HttpService) {
			return new Service($q, $http, HttpService);
	}]);

})(angular, 'petstore');