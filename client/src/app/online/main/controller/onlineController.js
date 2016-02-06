/**
 * Online controller
 *
 * @author: Michaël Bernagou, Sfeir Benelux
 * @date:   04/01/2016
 */
(function(angular, appName){

	/**
	 * Constructor
	 */
	function Controller($state, $location, AuthenticateService, MessageService, $filter) {
			this.super('LogoutController' , [AuthenticateService]);
			this.state = $state;
			this.location = $location;
			this.authenticate = AuthenticateService;
      this.filter = "";
      this.angularFilter = $filter;
      this.messageService = MessageService;
	};

	angular.inherit('OnlineController', Controller).from('LogoutController');

	/**
	 * Redirect search call to StoreController
	 */
	Controller.prototype.searchPets = function () {
			this.state.go('main.online.store.search', { request: this.filter });
	};

	Controller.prototype.addPet = function (ev) {
			var self = this;
			this.messageService.mdDialog.show({
					controller: 'AddController',
					controllerAs: 'add',
					templateUrl: 'app/online/add/view/add.html',
					parent: angular.element(document.body),
					clickOutsideToClose: false,
					targetEvent: ev
			})
			.then(function(petCreated) {
					if (angular.isDefined(petCreated)) {
							var msgData = {
									title : self.angularFilter('translate')('createForm.confirm.title'),
									text : self.angularFilter('translate')('createForm.confirm.message', {name : petCreated.name}),
									ariaLabel : self.angularFilter('translate')('createForm.confirm.title'),
									ok : self.angularFilter('translate')('global.forms.ok')
							};
							self.messageService.showAlert(ev, msgData);
							self.searchPets();
					} else {
							var msgData = {
									title : self.angularFilter('translate')('createForm.confirm.title'),
									text : self.angularFilter('translate')('createForm.confirm.failure'),
									ariaLabel : self.angularFilter('translate')('createForm.confirm.title'),
									ok : self.angularFilter('translate')('global.forms.cancel')
							};
							self.messageService.showAlert(ev, msgData);
					}
			});
	};

	Controller.prototype.canAdd = function () {
			return hasPermission('ADD');
	};

	Controller.prototype.canDelete = function () {
			return hasPermission('DELETE');
	};

	/**
	 * Function to check if a user have a specific permission
	 */
	function hasPermission (perm) {
			for (var i = 0; i < this.authenticate.currentUser.permissions; i++) {
					if (this.user.permissions[i].name === perm) {
							return true;
					}
			}
			return false;
	}

	/**
	 * @Override LogoutController.logout
	 */
	Controller.prototype.logout = function() {
			var self = this;
			this.parent('LogoutController').logout.apply(this, [])
					.then(function() {
							self.location.path('/');
					});
	};

	/**
	 * Open the language menu
	 */
	Controller.prototype.openMenu = function($mdOpenMenu, ev) {
			$mdOpenMenu(ev);
	};

	angular.module(appName).controller('OnlineController', ['$state', '$location', 'AuthenticateService', 'MessageService', '$filter', function($state, $location, AuthenticateService, MessageService, $filter) {
			return new Controller($state, $location, AuthenticateService, MessageService, $filter);
	}]);

})(angular, 'petstore');