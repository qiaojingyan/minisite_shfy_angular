// 'use strict';
var active_module = angular.module('active_module', []);
active_module.controller('active_controller', ['$scope', '$http', '$location', 'Const', 
	function($scope, $http, $location, Const){

		$http({
			method: 'get',
			url: Const.baseUrl + 'Event/GetEventList?Token=123456&CategoryID=1&PageIndex=1&PageSize=9999'
		})
		.success(function(req){
			if(1){
				$scope.all_acitves = JSON.parse(req);
				// console.log($scope.all_acitves);
			}
			console.log('success_'+req);

		})
		.error(function(req){
			console.log('error_'+req);
		});

		$scope.click_active = function(active){
			// console.log('click_active:'+active.Title);

			if (active.EventStatus === 1) {
				$location.path('/active_detail/'+active.EventID);
			}else if (active.EventStatus === 3){
				$location.path('/active_review/'+active.EventID);
			};
			
		};


}]);