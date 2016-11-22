var active_module = angular.module('my_info_module', []);
active_module.controller('my_info_controller', ['$scope', '$http', '$location', 'Const', 
	function($scope, $http, $location, Const){

		$scope.my_info = {};
		$scope.submit_icon = function(){
			var file = $('#upload_photo')[0].files[0];
            console.log('file_: '+file);
		}
		$('#upload_photo').on('change', function(){
			console.log('改变');
			var file = $('#upload_photo')[0].files[0];
            console.log('file_: '+file);
		});

		$scope.show_arr = [
							{'show_input' : false},
							{'show_input' : false},
							{'show_input' : false},
							{'show_input' : false},
							{'show_input' : true},
							{'show_input' : false},
							{'show_input' : false},
							{'show_input' : false}
							];

		$scope.info_click = function(index){

			$scope.show_arr[index].show_input = true;

		};

		$scope.is_change = function(is_c){
			if (is_c) {

			}else{

			};
			for (var i = 0; i < $scope.show_arr.length; i++) {
				var ob = $scope.show_arr[i];
				if (ob.show_input) {
					ob.show_input = false;
					break;
				};
			};
		};
		// $http({
		// 	method: 'get',
		// 	url: Const.baseUrl + 'Event/GetEventList?Token=123456&CategoryID=1&PageIndex=1&PageSize=10'
		// })
		// .success(function(req){
		// 	if(1){
		// 		$scope.all_acitves = JSON.parse(req);
		// 		console.log($scope.all_acitves);
		// 	}
		// 	// console.log('success_'+req);
		// })
		// .error(function(req){
		// 	console.log('error_'+req);
		// });

		// $scope.click_active = function(active){
		// 	console.log('click_active:'+active.Title);
		// 	$location.path('/activedetail/1');
		// };

		$scope.bir_year = '1999';
		$scope.bir_month = '01';
		$scope.bir_day = '01';
		
		$scope.year_datas = [];
		$scope.month_datas = [];
		$scope.day_datas = [];
		var current_date = new Date();
		var current_year = current_date.getFullYear();
		var current_month = current_date.getMonth()+1;
		var current_day = current_date.getDate();
		// console.log(current_year+'-'+current_month+'-'+current_day);
		create_years(current_year);
		create_months(12);
		create_days(31);
		function create_years(max_year){
			for (var i = max_year-120; i <= max_year; i++) {
				$scope.year_datas.push(i);
			};
		}
		function create_months(max_month){
			$scope.month_datas = [];
			for (var i = 1; i <= max_month; i++) {
				if (i < 10) {$scope.month_datas.push('0'+i);}else{$scope.month_datas.push(i);};
			};
		};
		function create_days(max_day){
			$scope.day_datas = [];
			for (var i = 1; i <= max_day; i++) {
				if (i < 10) {$scope.day_datas.push('0'+i);}else{$scope.day_datas.push(i);};
			};
		};
		function is_leap_year(y){
			var ye = parseInt(y);
			if(ye % 4 == 0 && ye % 100 != 0 || ye % 400 == 0){
				return true;
			}
			return false;
		};
		
		$scope.click_year = function(){
			$scope.show_year_view = !$scope.show_year_view;
		
		};
		$scope.click_month = function(){
			$scope.show_month_view = !$scope.show_month_view;
		
		};
		$scope.click_day = function(){
			$scope.show_day_view = !$scope.show_day_view;
		};
		// console.log($scope.year_datas);
		$scope.selected_year = function(y){
			$scope.bir_year = y;
			$scope.show_year_view = false;

			if ($scope.bir_year === current_year) {
				// console.log(true);
				create_months(current_month);
				if ($scope.bir_month > current_month) {
					$scope.bir_month = '01';
					create_days(31);
				};
			};
			if (!is_leap_year($scope.bir_year)) {
				if ($scope.bir_month === '02') {
					create_days(28);
					if ($scope.bir_day === '29') {
						$scope.bir_day = '01';
					};
				};
			}else{
				// console.log('闰年');
				if ($scope.bir_month === '02') {
					console.log('2月');
					create_days(29);
				};
			};
		};
		$scope.selected_month = function(m){
			$scope.bir_month = m;
			$scope.show_month_view = false;

			if ($scope.bir_year === current_year && $scope.bir_month === current_month) {
				create_days(current_day);
				if($scope.bir_day > current_day){
					$scope.bir_day = '01';
				}
			}else{
				switch(parseInt(m)){
					case 01:
					case 03:
					case 05:
					case 07:
					case 08:
					case 10:
					case 12:
					{
						create_days(31);
						break;
					}
					case 04:
					case 06:
					case 09:
					case 11:
					{
						create_days(30);
						if($scope.bir_day > 30){
							$scope.bir_day = '01';
						}
						break;
					}
					case 02:{
						// console.log('2yue');
						if (is_leap_year($scope.bir_year)) {
							create_days(29);
							if($scope.bir_day > 29){
								$scope.bir_day = '01';
							}
						}else{
							create_days(28);
							if($scope.bir_day > 28){
								$scope.bir_day = '01';
							}
						};
						break;
					}
				}
			};

		};
		$scope.selected_day = function(d){
			$scope.bir_day = d;
			$scope.show_day_view = false;
		};

}]);