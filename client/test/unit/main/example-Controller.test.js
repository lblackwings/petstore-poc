

/**
 * Suite of unit tests about MainController
 */

describe('Unit test - MainController controller', function() {

	/*var controller , scope  , rootScope ,  httpBackend , service, state , q;

	function ServiceMock() {
			this.prepareUpdate = function( item ) { var defer = q.defer(); defer.resolve(  ); return defer.promise;};
			this.update = function( item ) { var defer = q.defer(); defer.resolve(  ); return defer.promise; };
			this.search = function( item ) { var defer = q.defer(); defer.resolve(  ); return defer.promise; };
	}

	function StateServiceMock() {
			this.go = function( somewhere ) { *//* No need of specific process *//* };
			this.$current = { parent : "someParent"};
	}

	// Load the module
	beforeEach( angular.mock.module('webfront') );

	// Mock the services
	beforeEach( inject( function( $q ) {
			q = $q;
			service = new ServiceMock();
			state = new StateServiceMock();
	}));

	// Inject Read controller
	beforeEach( inject( function( $controller, $rootScope , $httpBackend ) {
			rootScope = $rootScope;
			httpBackend = $httpBackend;
			controller = $controller( 'SubscriptionController' , {
					$state: state,
					SubscriptionService: service
			});
	}));

	// Need to mock this initial request
	beforeEach( function() {
		 // httpBackend.when('GET', '/i18n/fr.json').respond({});
	})


	describe( 'When the controller is loaded, ', function() {


			it( 'should inherit from some controllers' , function( ) {
					expect( controller.parent( 'UpdateController') ).toBeDefined();
					expect( controller.parent( 'SearchController') ).toBeDefined();
			})

			it( 'should have some own methods' , function() {
					expect( controller.init ).toBeDefined();
					expect( controller.edit ).toBeDefined();
					expect( controller.doAfterSuccessEdit).toBeDefined();
					expect( controller.assign ).toBeDefined();
					expect( controller.doAfterSuccessAssign ).toBeDefined();
					expect( controller.deallocate ).toBeDefined();
					expect( controller.doAfterSuccessDeallocate ).toBeDefined();
					expect( controller.reset ).toBeDefined();
					expect( controller.doAfterSuccessReset ).toBeDefined();
					expect( controller.select ).toBeDefined();
			});

	});

	describe( 'When the controller is initialized, ' , function( ) {

			it( 'should search for the subscriptions', function() {
					spyOn( controller , 'search' ).and.callFake( function() {} );
					controller.init();
					expect( controller.search ).toHaveBeenCalled();
			});

	});

	describe( 'When the controller searches for subscriptions ', function( ) {


			it( 'should store them in a variable "subscription" ' , function( ) {
					var fakeSubscriptions = [ 'subscription1' , 'subscription2' ];
					controller.prepareUpdate( fakeSubscriptions );
					expect( controller.subscriptions = fakeSubscriptions );
			});

	});

	describe( 'When the controller prepares the update process' , function( ) {

			it( 'should rename the item-to-update variable ' , function( ) {
					controller.prepareUpdate();
					expect( controller.subscriptionToUpdate ).toEqual( controller.itemToUpdate );
			});

	});

	describe( 'When the controller has updated a subscription' , function( ) {

			it( 'should refresh the list of subscriptions' , function( ) {
					spyOn( controller , 'search' ).and.callFake( function( ) {  var defer = q.defer(); defer.resolve(  ); return defer.promise; } );
					controller.doAfterSuccessUpdate();
					expect( controller.search ).toHaveBeenCalled( );
			});

	});

	describe( 'When the controller selects a subscription' , function( ) {

			it( 'should assign it to "selectedSubscription" ' , function( ) {
					var fakeSelection = "fake selection";
					controller.select( fakeSelection );
					expect( controller.selectedSubscription ).toEqual( fakeSelection );
			});

	});


	describe( 'When the controller intends to sort the table given a property' , function( ) {

			it( 'should initially sort in an ascendant way' , function( ) {
					controller.subscriptions = [ { name: 'Targaryen' }, { name: 'Stark' }, { name: 'Snow' } ];
					var expectedList = [ { name: 'Snow' }, { name: 'Stark' }, { name: 'Targaryen' } ];
					controller.sort( 'name' );
					expect( controller.subscriptions ).toEqual( expectedList );
			});

	});

	describe( 'When the controller assigns a  subscription user' , function( ) {

			it( 'should  update a subscription' , function( ) {
					controller.itemToUpdate = { number: 'AB100-155-142' , name: 'Stark' , firstname: 'Sansa' , email: 'sansa.stark@sds.com'};
					spyOn( controller , 'update' ).and.callFake( function( ) {    var defer = q.defer(); defer.resolve(  ); return defer.promise; });
					controller.assign( );
					expect( controller.update ).toHaveBeenCalled( );
			});

			it( 'should notify the user in case of success' , function( ) {
					spyOn( controller , 'alert' ).and.callFake( function( ) {} );
					controller.doAfterSuccessAssign( );
					expect( controller.alert ).toHaveBeenCalledWith( { type: 'success' , message: 'subscription.assign.success' , duration:3000 } )
			});

	});

	describe( 'When the controller edits a  subscription user' , function( ) {

			it( 'should  update a subscription' , function( ) {
					controller.itemToUpdate = { number: 'AB100-155-142' , name: 'Stark' , firstname: 'Sansa' , email: 'sansa.stark@sds.com'};
					spyOn( controller , 'update' ).and.callFake( function( ) {    var defer = q.defer(); defer.resolve(  ); return defer.promise; });
					controller.edit( );
					expect( controller.update ).toHaveBeenCalled( );
			});

			it( 'should notify the user in case of success' , function( ) {
					spyOn( controller , 'alert' ).and.callFake( function( ) {} );
					controller.doAfterSuccessEdit( );
					expect( controller.alert ).toHaveBeenCalledWith( { type: 'success' , message: 'subscription.edit.success' , duration:3000 } )
			});

	});

	describe( 'When the controller deallocates a user from a subscription' , function( ) {

			it( 'should update a subscription with an empty email' , function( ) {
					controller.selectedSubscription = { number: 'AB100-155-142' , name: 'Stark' , firstname: 'Sansa' , email: 'sansa.stark@sds.com'};
					spyOn( controller , 'update' ).and.callFake( function( ) {    var defer = q.defer(); defer.resolve(  ); return defer.promise; });
					controller.deallocate( );
					expect( controller.itemToUpdate.email ).toEqual( '' );
					expect( controller.update ).toHaveBeenCalled( );
			});

	});

	describe( 'When the controller reset the password related to a subscription' , function( ) {

			it( 'should go to the parent state afterwards' , function( ) {
					spyOn( controller.state , 'go' ).and.callFake( function( ) { } );
					controller.doAfterSuccessReset();
					expect( controller.state.go ).toHaveBeenCalledWith( '^' );
			});

	});
*/
});