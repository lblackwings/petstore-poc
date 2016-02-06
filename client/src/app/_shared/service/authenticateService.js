/**
 * Authentication service
 *
 * @author: Michaël BERNAGOU
 * @date: 23/09/2015
 */
(function(angular, appName){

    /**
     *  Constructor
     */
    function Service($q, HttpService) {
    		this.super('BaseService', []);
        this.service = HttpService;
        this.q = $q;
    };

		angular.inherit('AuthenticateService', Service).from('BaseService');

    /**
     * The current authenticated user
     */
    Service.prototype.currentUser;

    /**
     * Login service method to authenticate a user via a credential
     */
    Service.prototype.login = function(credential) {
        var data ="username=" + credential.username +"&password=" + credential.password + "&submit=Login";
        var configuration = {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            ignoreAuthModule: 'ignoreAuthModule'
        };
        return this.service.post('/authentication', data, configuration);
    };

    /**
     * Logout service method to disconnect user
     */
    Service.prototype.logout = function() {
        this.currentUser = undefined;
        return this.service.get('/logout');
    };

    /**
     * Returns the current user from backend
     */
    Service.prototype.getCurrentUser = function() {
    		var self = this;
        var defer = this.q.defer();
        if(this.currentUser) {
            defer.resolve(this.currentUser);
        } else {
            this.service.get('/user/current')
                .then(
                    function(result) {
                        self.currentUser = result;
                        defer.resolve(result);
                    },
                    function() {
                        defer.resolve();
                    }
                );
        }
        return defer.promise;
    };

    angular.module(appName).service('AuthenticateService', ['$q', 'HttpService', function($q, HttpService) {
    		return new Service($q, HttpService);
		}]);

}) (angular, 'petstore');