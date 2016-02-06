/**
 * Configure HTTP Interceptor to manage spinner and error from backend
 * @author Michael Bernagou, Sfeir Benelux
 * @date 04/01/2016
 */
(function(angular, appName) {
		'use strict';

		/**
	 	 * Factory Constructor
	 	 */
    function InterceptorFactory($rootScope, $q, $window, $filter) {
				var numberLoadings = 0;
				return {
						request: function(configuration) {
								// Force IE to disable auto-cache and perform the HTTP request
								configuration.headers['Cache-Control'] = 'no-cache';
								configuration.headers['Pragma'] = 'no-cache';
								configuration.headers['Expire'] = '-1';

								if (!configuration.headers.skipSpinner) {
										numberLoadings = numberLoadings + 1;
										$rootScope.$broadcast('event:ui-showSpinner');
								}

								return configuration || $q.when(configuration);
						},

						response: function(response) {
								if (!response.config.headers.skipSpinner) {
										numberLoadings = numberLoadings - 1;
										if (numberLoadings === 0) {
												$rootScope.$broadcast('event:ui-hideSpinner');
										}
								}
								return response || $q.when(response);
						},

						responseError: function(response) {
								if (!response.config || !response.config.headers.skipSpinner) {
										numberLoadings = numberLoadings - 1;
										if (!numberLoadings) {
												$rootScope.$broadcast('event:ui-hideSpinner');
										}
								}
								var messageData = {};
								// Catch Error
								if(response.status === 403) {
										// Display a translated error message
										messageData = {
												title : $filter('translate')('global.errors.title'),
												text : $filter('translate')('global.errors.' + response.status),
												ariaLabel : $filter('translate')('global.errors.title'),
												ok : $filter('translate')('global.forms.ok')
										};

										// Append error message returned from server
										if( response.data.message ) {
												messageData.text = messageData.text + '\n' + response.data.message
										}

										$rootScope.$broadcast('event:showAlert', messageData);
								} else if (response.status === 401) {
										var msgData = {
											title: $filter('translate')('global.errors.title'),
											text : $filter('translate')('global.errors.disconnected'),
											ariaLabel : $filter('translate')('global.errors.title'),
											ok: $filter('translate')('global.forms.ok'),
										};
										$rootScope.$broadcast('event:lostSession', msgData);
								}
								return $q.reject( response );
						}
				};
		}

		angular.module(appName).factory('HttpInterceptor', InterceptorFactory);

		/**
		 * Constructor
		 */
		function InterceptorConfiguration($httpProvider) {
				// push into the interceptors
				$httpProvider.interceptors.push('HttpInterceptor');
		}

		angular.module(appName).config(InterceptorConfiguration);

}) (angular, 'petstore');