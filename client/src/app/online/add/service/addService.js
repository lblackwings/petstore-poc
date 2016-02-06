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
		this.q = $q;
		this.http = $http;
		this.httpService = HttpService;
	};

	angular.inherit('AddService', Service).from('CrudsService');

	angular.module(appName).service('AddService', ['$q', '$http', 'HttpService', function ($q, $http, HttpService) {
			return new Service($q, $http, HttpService);
	}]);

})(angular, 'petstore');