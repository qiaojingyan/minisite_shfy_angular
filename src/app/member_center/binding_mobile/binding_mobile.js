var active_module = angular.module('binding_mobile_module', []);
active_module.controller('binding_mobile_controller', ['$scope', '$http', '$location', '$stateParams', 'Const', 'fyData', 
	function($scope, $http, $location, $stateParams, Const, fyData){

		getAccountList();
		$scope.phones = [];
		$scope.hasmobile = true;
		$scope.show_add_view = false;
		$scope.show_remove_view = false;
		$scope.nickname = fyData.user.NickName;
		$scope.icon_img = fyData.user.HeadImgUrl;
		// console.log('from:'+$stateParams.from);
		// $('.binding_btn').on('click', function(){
		// 	console.log('click');
		// 	$scope.show_add_view = true;
		// });
		$scope.show_binding = function(){
			$scope.number = '';
			$scope.autocode = '';
			$scope.show_add_view = true;
		};

		$scope.is_binding = function(isb){
			console.log(isb);
			if (isb) {
				if ($scope.number.toString().length === 11 && $scope.autocode.toString().length > 0) {
					console.log('可以绑定');
					checkAutocode();
				}else{
					alert('请输入正确的手机号和验证嘛！')
				};

				// 
			}else{
				$scope.show_add_view = false;
			};
			
			code_time = 0;
		};

		
		$scope.remove_mobile = function(phone){
			console.log(phone.Mobile);
			$scope.rm_mobile = phone;
			$scope.show_remove_view = true;
		}

		$scope.is_remove = function(isr){
			console.log(isr);
			if (isr) {
				remove_mobile($scope.rm_mobile);
			};
			$scope.show_remove_view = false;
		}

		var isCanClick = true;
		var code_timer = null;
		var code_time = 0;
		$('.send_autocode_btn').on('click', function(){
			if (isCanClick) {
				if (checkPhone($scope.number)) {

					getAutocode();
					isCanClick = false;
					code_time = 120;
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
			};
		});

		function checkPhone(phone){ 
		    // var phone = document.getElementById('phone').value;
		    if(!(/^1[34578]\d{9}$/.test(phone))){ 
		        alert("手机号码有误，请重填");  
		        return false; 
		    }
		    return true;
		}

		function getAccountList(){
			$http({
				method: 'get',
				url: Const.baseUrl + 'User/GetAccountList',
				params:{
					'Token': fyData.user.token
				}
			})
			.success(function(req){
				// if(1){
				// 	$scope.my_info = JSON.parse(req);
				// 	// console.log('my_info: '+$scope.my_info);
				// 	dataHandle();
				// }
				$scope.phones = JSON.parse(req);
				$scope.dataGetSuccess = true;
				console.log('success_'+req);
			})
			.error(function(req){
				console.log('error_'+req);
			});
		};
		
		function binding_mobile(){

			$http({
				method: 'get',
				url: Const.baseUrl + 'User/AddMobile',
				params:{
					'Token': fyData.user.token,
					'Mobile': $scope.number
				}
			})
			.success(function(req){

				// $scope.phones = JSON.parse(req);
				if (JSON.parse(req)) {
					var phone = {"Mobile": $scope.number};
					$scope.phones.push(phone);
					$scope.show_add_view = false;

					window.history.back();
					
				};
				$scope.dataGetSuccess = true;
				console.log('binding_'+req);
			})
			.error(function(req){
				console.log('error_'+req);
				$scope.dataGetSuccess = true;
			});
		};	
		function remove_mobile(){
			$http({
				method: 'get',
				url: Const.baseUrl + 'User/RemoveMobile',
				params:{
					'Token': fyData.user.token,
					'Mobile': $scope.rm_mobile.Mobile
				}
			})
			.success(function(req){

				// $scope.phones = JSON.parse(req);
				if (JSON.parse(req)) {
					$scope.phones.pop($scope.rm_mobile);
					console.log('success_'+req);
				};
				
			})
			.error(function(req){
				console.log('error_'+req);
			});
		};
		function getAutocode(){
			$http({
				method: 'get',
				url: Const.baseUrl + 'Token/GetVerifyCode',
				params:{
					'Token': fyData.user.token,
					'Mobile': $scope.number
				}
			})
			.success(function(req){

				// $scope.phones = JSON.parse(req);
				console.log('success_'+req);
			})
			.error(function(req){
				console.log('error_'+req);
			});
		};
		function checkAutocode(){
			$scope.dataGetSuccess = false;
			$http({
				method: 'get',
				url: Const.baseUrl + 'Token/CheckVerifyCode',
				params:{
					'Token': fyData.user.token,
					'Mobile': $scope.number,
					'Code': $scope.autocode
				}
			})
			.success(function(req){

				// $scope.phones = JSON.parse(req);
				if (JSON.parse(req)) {
					
					binding_mobile();
				}else{
					$scope.dataGetSuccess = true;
					alert("手机号或验证码有误！");  
				};
				console.log('check_'+req);
				
			})
			.error(function(req){
				console.log('error_'+req);
				$scope.dataGetSuccess = true;
			});
		};

}]);