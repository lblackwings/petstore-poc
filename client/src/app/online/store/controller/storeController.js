/**
 * Store controller
 *
 * @author: Michaël Bernagou, Sfeir Benelux
 * @date:   05/01/2016
 */
(function(angular, appName){

		/**
		 * Constructor
		 */
		function Controller($state, $stateParams, StoreService, AuthenticateService, MessageService, jq, $filter) {
				this.super('SearchController', [StoreService]);
				this.super('DeleteController', [StoreService]);
				this.authenticateService = AuthenticateService;
				this.messageService = MessageService;
				this.service = StoreService;
				this.state = $state;
				this.filter = this.parseFilter($stateParams.request);
				this.jq = jq;
				this.angularFilter = $filter;
		};

		angular.expand('StoreController', Controller).from(['SearchController', 'DeleteController']);

		/**
		 * Init method
		 */
		Controller.prototype.init = function () {
				var self = this;
				this.authenticateService.getCurrentUser()
						.then(function(user){
								self.user = user;
						});

				if (this.filter != null) {
						this.searchPets();
				}
		};

		/**
		 * Transform the request string to an object
		 * Filter elements are separate by comma and each of them can have a key
		 * defined by : like 'id: 1, category: lion cat'
		 */
		Controller.prototype.parseFilter = function (request) {
				if (request != null && (request.indexOf(',') > 0 || request.indexOf(':') > 0)) {
						var requestObj = {
							ids : [],
							names : [],
							categories : [],
							tags : [],
							all : []
						};
						var filters = request.split(',');
						for (var i = 0; i < filters.length; i++) {
								var filter = filters[i].split(':');
								if (filter.length === 2) {
										var key = filter[0].toLowerCase().trim()
										var value = filter[1].trim();
										if(key === 'id')
												requestObj.ids = requestObj.ids.concat(value.split(' '));
										if(key === 'cat')
												requestObj.categories = requestObj.categories.concat(value.split(' '));
										if(key === 'name')
												requestObj.names = requestObj.names.concat(value.split(' '));
										if(key === 'tag')
												requestObj.tags = requestObj.tags.concat(value.split(' '));
										if(key === 'all')
												requestObj.all = requestObj.all.concat(value.split(' '));
								} else {
										requestObj.all = requestObj.all.concat(filter[0].trim().split(' '));
								}
						}
						return requestObj;
				} else {
						return request;
				}
		};

		/**
		 * @Override SearchController.doAfterSuccessSearch
		 */
		Controller.prototype.doAfterSuccessSearch = function (pets) {
				// 'pets' could be a single object or an array not empty. View accept only array of 'pet'
				if (!angular.isDefined(pets.length)) {
						this.searchedItems = this.pets = [pets];
				} else if (pets.length > 0) {
						this.searchedItems = this.pets = pets;
				}
		};

		/**
		 * Search function
		 * 		Manage 2 cases : a search by ID and a search by a filter (for dev purpose)
		 */
		Controller.prototype.searchPets = function () {
				this.searchedItems = this.pets = [];
				if (angular.isObject(this.filter)) {
						this.search(this.filter)
								.then(function(pets) {
										self.doAfterSuccessSearch(pets);
								});
				} else {
						var self = this;
						this.service.searchById(this.filter)
								.then(function(pets) {
										self.doAfterSuccessSearch(pets);
								});
				}
		};

		/**
		 * Modify css class to flip pet card
		 */
		Controller.prototype.flipCard = function (index) {
				this.jq("#card" + index).addClass("flipped");
		};

		/**
		 * Modify css class to unflip pet card
		 */
		Controller.prototype.unFlipCard = function (index) {
				this.jq("#card" + index).removeClass("flipped");
		};

		/**
		 * Ask confirmation then delete a pet from the store
		 */
		Controller.prototype.deletePet = function (ev, pet) {
				var msgData = {
						title : this.angularFilter('translate')('deleteForm.confirm.title'),
						text : this.angularFilter('translate')('deleteForm.confirm.message', {name : pet.name}),
						ariaLabel : this.angularFilter('translate')('deleteForm.confirm.title'),
						targetEvent : ev,
						ok : this.angularFilter('translate')('deleteForm.confirm.ok'),
						cancel : this.angularFilter('translate')('global.forms.cancel')
				};
				var self = this;
				self.messageService.showConfirm(ev, msgData)
						.then(
								function () {
										self.itemToDeleteId = pet.id;
										self.delete().then(
												function() {
														self.searchPets();
												});
								});

		};

		angular.module(appName).controller('StoreController', ['$state', '$stateParams', 'StoreService', 'AuthenticateService', 'MessageService', 'jq', '$filter', function($state, $stateParams, StoreService, AuthenticateService, MessageService, jq, $filter) {
				return new Controller($state, $stateParams, StoreService, AuthenticateService, MessageService, jq, $filter);
		}]);

 })(angular, 'petstore');