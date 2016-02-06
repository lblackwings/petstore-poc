/**
 * Main controller
 *
 * @author: Michael Bernagou, Sfeir Benelux
 * @date: 04/01/2016
 */
(function(angular, appName) {


    function Controller($scope, $rootScope, $state, Configuration, LanguageService) {
        this.super('LanguageController', [$scope, $rootScope, Configuration, LanguageService]);
    }

    angular.inherit('MainController', Controller).from('LanguageController');

    angular.module(appName).controller('MainController', function($scope, $rootScope, $state, Configuration, LanguageService) {
        return new Controller($scope, $rootScope, $state, Configuration, LanguageService);
    });

}) (angular, 'petstore');