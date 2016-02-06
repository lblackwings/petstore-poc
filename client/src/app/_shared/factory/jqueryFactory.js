( function( angular , appName ) {

    angular.module( appName )
        .factory( 'jq',
            function ($window) {
                return $window.jQuery;
            }
        );

}) ( angular , 'petstore' );
