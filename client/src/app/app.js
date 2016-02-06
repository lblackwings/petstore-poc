/**
 * Configuration of the main application
 */

(function(angular, appName) {

    /**
     * Configures the application router
     */
    function router( $stateProvider, $urlRouterProvider ) {

        $stateProvider
            .state('main', {
            		abstract: true,
                templateUrl: 'app/main/view/main.html',
                controller: 'MainController',
                controllerAs: 'main',
            })
            .state('main.offline', {
            		url: '/',
            		templateUrl: 'app/offline/main/view/offline.html',
            		controller: 'OfflineController',
            		controllerAs: 'offline',
            		resolve: {
										getCurrentUser: ['$q', '$state', 'AuthenticateService', function ($q, $state, AuthenticateService) {
												var defer = $q.defer();
												AuthenticateService.getCurrentUser()
														.then(
																function(result) {
																		if (result) {
																				$state.go('main.online.store');
																		}
																		defer.resolve();
																});
												defer.resolve();
												return defer.promise;
										}]
								}
            })
            .state('main.online', {
            		abstract : true,
								url: '/o',
								templateUrl: 'app/online/main/view/online.html',
								controller: 'OnlineController',
								controllerAs: 'online',
								resolve: {
										getCurrentUser: ['$q', '$state', 'AuthenticateService', function ($q, $state, AuthenticateService) {
												var defer = $q.defer();
												AuthenticateService.getCurrentUser()
														.then(
																function (result) {
																		if (!result) {
																				$state.go('main.offline');
																		}
																		defer.resolve();
																},
																function () {
																		$state.go('main.offline');
																		defer.reject();
																}
														);
														defer.resolve();
														return defer.promise;
										}]
								}
            })
            .state('main.online.store', {
								url: '/store',
								templateUrl: 'app/online/store/view/store.html',
								controller : 'StoreController',
								controllerAs : 'store',
								params: {
										request: null
								}
						})
						.state('main.online.store.search', {})
						/*.state('main.online.store.add', {
								utl: '/add',
								controller : 'AddController',
								controllerAs : 'add'
						})*/;

        $urlRouterProvider.otherwise('/');
    };

    /**
     * Configures the translation module
     */
    function translate($translateProvider) {
    		// Define json translation file location
        $translateProvider.useLoader('$translatePartialLoader', {
            urlTemplate: '/i18n/{lang}/{part}.json'
        });

        // Default language is 'fr'
        $translateProvider.preferredLanguage('fr');
    };

    /**
     * Set up the application configuration
     */
    function Application($stateProvider, $urlRouterProvider, $translateProvider) {
       router($stateProvider, $urlRouterProvider);
       $translateProvider.useSanitizeValueStrategy('escape');
       translate($translateProvider);
    };

		/**
		 * Module configuration
		 */
    angular.module(appName, ['ngSanitize', 'ui.router', 'ngMaterial', 'pascalprecht.translate', 'ngMdIcons'])
        .config(['$stateProvider', '$urlRouterProvider', '$translateProvider', function($stateParams, $urlRouterProvider, $translateProvider) {
            Application($stateParams, $urlRouterProvider, $translateProvider);
        }])
        .run(function ($rootScope, $state, AuthenticateService, MessageService) {
        		$rootScope.$on( '$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams ) {
								$state.previous = fromState;
								$state.previousParams = fromParams;
						});
						// Handle lost session event
            $rootScope.$on('event:lostSession', function(event, msgData) {
            		// only for states child to online
            		if ($state.current.name.indexOf('online') > 0) {
										AuthenticateService.logout();
										MessageService.showAlert(event, msgData);
										$state.go('main.offline');
								}
						});
						
						// Handle error event
						$rootScope.$on('event:showAlert', function(event, msgData) {
								MessageService.showAlert(event, msgData);
						});
        });

})(angular, 'petstore');