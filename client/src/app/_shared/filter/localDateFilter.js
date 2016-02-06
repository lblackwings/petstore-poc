

( function( angular , appName ) {

    angular.module( appName )
        .filter( 'localDate',
            function ( $filter, $translate , Configuration ) {
                return function( aDate ) {
                    var format = Configuration.dateFormats.ng[ $translate.use() ];
                    return $filter('date')( aDate , format );
                };
            }
        );

}) ( angular , 'petstore' );
