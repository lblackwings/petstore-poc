/**
 * Application configuration
 */

(function(angular, appName) {
    var languages = {
        fr: { twoLettersLanguage:"fr", cssClass:"flag-fr", languageKey:"global.language.FR", alt:"Français" },
        en: { twoLettersLanguage:"en", cssClass:"flag-gb", languageKey:"global.language.EN", alt:"English" }
    };

    var dateFormats = {
        en: "MM/DD/YYYY",
        fr: "DD/MM/YYYY",
        ng: {
            en: "MM/dd/yyyy",
            fr: "dd/MM/yyyy"
        }
    };

    var events = {
    		updateUserLanguageEvent: 'event:update_user_language'
    };

    var configuration = {
        languages: languages,
        dateFormats: dateFormats,
        events: events
    };

    angular.module(appName).constant('Configuration', configuration );


}) ( angular , 'petstore' );
