/**
 * Message Service to handle all alert and confirmation message
 */
(function (angular, appName){
		'use strict';

		/**
		 * Constructor
		 */
		function Service (jq, $mdDialog) {
				this.jq = jq;
				this.mdDialog = $mdDialog;
		};

		/**
		 * Show an alert message
		 */
		Service.prototype.showAlert = function (ev, alertData) {
				this.mdDialog.show(
						this.mdDialog.alert()
								.parent(this.jq("body"))
										.clickOutsideToClose(false)
										.title(alertData.title)
										.textContent(alertData.text)
										.ariaLabel(alertData.ariaLabel)
										.ok(alertData.ok)
										.targetEvent(ev)
				);
		};

		/**
		 * Show a confirmation message request
		 */
		Service.prototype.showConfirm = function (ev, confirmData) {
				var confirm = this.mdDialog.confirm()
						.title(confirmData.title)
						.textContent(confirmData.text)
						.ariaLabel(confirmData.ariaLabel)
						.ok(confirmData.ok)
						.cancel(confirmData.cancel)
						.targetEvent(ev);
				return this.mdDialog.show(confirm);
		};

		angular.module(appName).service('MessageService', ['jq', '$mdDialog', function(jq, $mdDialog) {
				return new Service(jq, $mdDialog);
		}]);

})(angular, 'petstore');