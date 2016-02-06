/**
 * Offline Controller
 */
(function(angular, appName) {

	/**
	 * Constructor
	 */
	function Controller($rootScope, $state, $translate, AuthenticateService) {
		this.super('LoginController', [AuthenticateService]);
		this.state = $state;
    this.translate = $translate;
    this.credential = {};
    this.login.error = false;
	};

	angular.inherit('OfflineController', Controller).from('LoginController');

	/**
	 * Open Language Menu
	 */
	Controller.prototype.openMenu = function($mdOpenMenu, ev) {
		$mdOpenMenu(ev);
	};

	/**
	 * @Override LoginController.login
	 */
	Controller.prototype.login = function () {
			var self = this;
			this.parent('LoginController').login.apply(this, [this.credential])
					.then(
							function() {
									self.state.go('main.online.store');
							},
							function( ) {
									self.login.error = true;
							}
					);
	};

	angular.module(appName).controller('OfflineController', function ($rootScope, $state, $translate, AuthenticateService) {
    return new Controller($rootScope, $state, $translate, AuthenticateService);
  });

})(angular, 'petstore');