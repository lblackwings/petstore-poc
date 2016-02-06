/**
 * Login Controller
 */
(function(angular, appName){
	'use strict';

	/**
	 * Constructor
	 */
	function Controller(AuthenticateService) {
			this.service = AuthenticateService;
	};

	angular.inherit('LoginController', Controller).from('BaseController');

	/**
	 * The credential object to store login information
	 */
	Controller.prototype.credential = {};

	/**
	 * Login method
	 */
	Controller.prototype.login = function () {
		return this.service.login(this.credential);
	};

	angular.module(appName).controller('LoginController', function(AuthenticateService) {
		return new Controller(AuthenticateService);
	});

})(angular, 'petstore');