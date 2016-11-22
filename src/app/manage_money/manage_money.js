// 'use strict';
var manage_money_module = angular.module('manage_money_module', []);
active_module.controller('manage_money_controller', ['$scope', '$http', '$location', 'Const', 
	function($scope, $http, $location, Const){

		// $scope.click_active = function(active){
		// 	console.log('click_active:'+active.Title);
		// 	$location.path('/activedetail/1');
		// };
		$('.manage_method').on('click', function(){
			
			$(this).toggleClass('manage_extended');
			$(this).children('.m_arrows').toggleClass('manage_arrows');
			
			if ($(this).hasClass('manage_extended')) {
				console.log($(this).attr('index'));
			};

			
		});


}]);