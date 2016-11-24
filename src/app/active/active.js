// 'use strict';
var active_module = angular.module('active_module', []);
active_module.controller('active_controller', ['$scope', '$http', '$location', 'Const', 'fyData', 
	function($scope, $http, $location, Const, fyData){


		getActiveList('738F8B57-3CEE-4D18-9D24-23E123C49DA2');
		// getActiveList('738F8B57-3CEE-4D18-9D24-23E123C49DA3');
		
		function getActiveList(CategoryID){
			$http({
				method: 'get',
				url: Const.baseUrl + 'Event/GetEventList',
				params: {
		                'Token': fyData.user.token,
		                'CategoryID': CategoryID,
		                'PageIndex': 1,
		                'PageSize': 100
		            }

			})
			.success(function(req){
				if(1){
					$scope.all_acitves = JSON.parse(req);
					// console.log($scope.all_acitves);
				}
				console.log('success_'+req);
				$scope.dataGetSuccess = true;
			})
			.error(function(req){
				console.log('error_'+req);
			});
		};
		

		$scope.click_active = function(active){
			// console.log('click_active:'+active.Title);
			// $location.path('/active_review/'+active.EventID);
			if (active.EventStatus === 1) {
				
				if (!fyData.user.Mobile || fyData.user.Mobile.length <= 0) {
					if (confirm('请先绑定手机号，可以查看更多精彩内容！')) {
						$location.path('/binding_mobile');
					};
				}else{
					$location.path('/active_detail/'+active.EventID);
				};
				
			}else if (active.EventStatus === 3){
				$location.path('/active_review/'+active.EventID);
			};
			
		};


}]);