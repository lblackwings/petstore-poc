/**
 * This service manages the application languages change
 *
 * @author Michael Bernagou, Sfeir Benelux
 * @date 04/01/2016
 */

(function(angular, appName) {

    /**
     * @constructor
     */
    function Service( $rootScope , $q , $translate, $translatePartialLoader ) {
        // Load all the parts by default
        $translatePartialLoader.addPart( '_global' );
        $translatePartialLoader.addPart( 'authentication' );
        $translatePartialLoader.addPart( 'forms' );

        // Refresh the translation process
        $translate.refresh();

        /**
         * Set the current language
         */
        this.set = function (language) {
            var deferred = $q.defer();
            // Tell angular-translate to change current language
            // We use a promise because angular-translate do async stuff
            $translate.use(language).then(
                function (result) {
                    deferred.resolve(result);
                    // Send a translationChange event
                    $rootScope.$broadcast('event:translation-translationChange');
                },
                function (result) {
                    deferred.reject(result);
                }
            );
            return deferred.promise;
        };
    }

    angular.module(appName).service('LanguageService', Service);

}) (angular, 'petstore');

