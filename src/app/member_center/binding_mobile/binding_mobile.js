var active_module = angular.module('binding_mobile_module', []);
active_module.controller('binding_mobile_controller', ['$scope', '$http', '$location', 'Const', 
	function($scope, $http, $location, Const){

		$scope.phones = [{'tel': '1888888888'}, {'tel': '1888888828'},{'tel': '1884888888'}];
		$scope.hasmobile = true;
		$scope.show_add_view = false;
		$scope.show_remove_view = false;

		// $('.binding_btn').on('click', function(){
		// 	console.log('click');
		// 	$scope.show_add_view = true;
		// });
		$scope.show_binding = function(){
			$scope.show_add_view = true;
		};

		$scope.is_binding = function(isb){
			console.log(isb);
			if (isb) {

			}else{
				
			};
			$scope.show_add_view = false;
		};

		
		$scope.remove_mobile = function(phone){
			console.log(phone.tel);
			$scope.show_remove_view = true;
		}

		$scope.is_remove = function(isr){
			console.log(isr);
			$scope.show_remove_view = false;
		}

		var isCanClick = true;
		var code_timer = null;
		var code_time = 0;
		$('.send_autocode_btn').on('click', function(){
			if (isCanClick) {
				isCanClick = false;
				code_time = 60;
				code_timer = setInterval(function(){
								code_time--;
								if (code_time>0) {
									$('.send_autocode_btn').text('还剩'+code_time+'s');
								}else{
									clearInterval(code_timer);
									code_timer = null;
									$('.send_autocode_btn').text('发送验证码');
									isCanClick = true;

								};
								console.log(code_time);
								
							}, 1000);
			};
		});
		
		

}]);