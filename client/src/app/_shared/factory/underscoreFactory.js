( function( angular , appName ) {

    angular.module( appName )
        .factory( 'u',
            function ($window) {
                return $window._;
            }
        );

}) ( angular , 'petstore' );
