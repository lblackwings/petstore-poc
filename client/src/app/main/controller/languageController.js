/**
 * Controller for managing language initialization and change
 */

(function(angular) {

    function Controller($scope, $rootScope, Configuration, Service) {
        this.super('BaseController' , [$scope]);
        this.rootScope = $rootScope;
        this.languageService = Service;
        this.defaultLanguages = Configuration.languages;
        this.events = Configuration.events;
        this.scope.changeLanguage = angular.bind(this , this.changeLanguage );
        this.handleChangeLanguageEvent();
        this.initLanguage();
    }

    angular.inherit('LanguageController', Controller).from('BaseController');

   /**
    * Init the application languages
    */
    Controller.prototype.initLanguage = function() {
        this.scope.listLanguages = [
            this.defaultLanguages.fr ,
            this.defaultLanguages.en
        ];

        // Default language
        this.scope.selectedLanguage = this.defaultLanguages.fr;
        this.languageService.set(this.scope.selectedLanguage.twoLettersLanguage);
    };

   /**
    *  Change the language of the application
    */
   Controller.prototype.changeLanguage = function(language) {
       this.scope.selectedLanguage = language;
       this.languageService.set(language.twoLettersLanguage);
   };

   /**
    * Handles the change-language event
    */
   Controller.prototype.handleChangeLanguageEvent = function() {
       var self = this;
       this.rootScope.$on(this.events.updateUserLanguageEvent, function(event, language) {
           self.changeLanguage(self.defaultLanguages[language]);
       });
   };

 }) (angular);