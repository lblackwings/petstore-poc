/**
 * This controller enriches the view with the ability to logout the user
 *
 * @author: Michael Bernagou, Sfeir Benelux
 * @date:   05/01/2016
 */
(function(angular, appName) {

    /**
     * Constructor
     */
    function Controller(AuthenticateService) {
        this.service = AuthenticateService;
    };

    angular.inherit('LogoutController', Controller).from('BaseController');

    /**
     * Logs out the user
     */
    Controller.prototype.logout = function () {
        return this.service.logout();
    };


		angular.module(appName).controller('LogoutController', ['AuthenticateService', function(AuthenticateService) {
			return new Controller(AuthenticateService);
		}]);

})(angular, 'petstore');