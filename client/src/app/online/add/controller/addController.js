/**
 * Store controller
 *
 * @author Michaël Bernagou, Sfeir Benelux
 * @date  05/01/2016
 */
(function(angular, appName){

		/**
		 * Constructor
		 */
		function Controller(AddService, jq, $mdDialog) {
				this.super('CreateController', [AddService]);
				this.service = AddService;
				this.mdDialog = $mdDialog;
				this.jq = jq;
				this.init();
		};

		angular.inherit('AddController', Controller).from('CreateController');

		/**
		 * Init method
		 */
		Controller.prototype.init = function () {
				this.prepareCreate();
		};

		/**
		 * Cancel method
		 */
		Controller.prototype.cancel = function () {
				this.mdDialog.cancel();
		};

		Controller.prototype.prepareCreate = function() {
				var self = this;
				this.parent( 'CreateController' ).prepareCreate.apply( this, [] )
						.then(function(data) {
								self.categories = data.categories;
								self.status = data.status;
						});
				this.itemToCreate = this.petToCreate = {};
		};

		/**
		 * Save the new pet
		 */
		Controller.prototype.save = function () {
				var pet = {
						name: this.petToCreate.name,
						status : this.petToCreate.status,
						categories : [ {
								id: angular.copy(this.petToCreate.category)
						} ],
						photos : [ {
								url : angular.copy(this.petToCreate.photo)
						} ]
				};
				this.itemToCreate = this.petToCreate = pet;
				var self = this;
				this.create()
				.then(function(result) {
						self.mdDialog.hide(result);
				});
		};

		angular.module(appName).controller('AddController', ['AddService', 'jq', '$mdDialog', function(AddService, jq, $mdDialog) {
				return new Controller(AddService, jq, $mdDialog);
		}]);

 })(angular, 'petstore');