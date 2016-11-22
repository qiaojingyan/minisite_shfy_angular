var active_detail_module = angular.module('active_detail_module', []);
active_detail_module.controller('active_detail_controller', ['$scope', '$http', '$location', '$stateParams', 'Const', 
	function($scope, $http, $location, $stateParams, Const){

		console.log('详情——activeid:'+$stateParams.id);

		$http({
			method: 'get',
			url: Const.baseUrl + 'Event/GetEvent?Token=123456&EventId='+$stateParams.id
		})
		.success(function(req){
			if(1){
				$scope.active_info = JSON.parse(req);
				// var date = new Date('2016-11-01T00:00:00');
				console.log($scope.active_info);
				console.log(format('2016-11-01T00:00:00'));
				// console.log($scope.all_acitves);
			}
			// console.log('success_'+req);
		})
		.error(function(req){
			console.log('error_'+req);
		});

		function add0(m){return m<10?'0'+m:m };
		function format(shijianchuo)
		{
		//shijianchuo是整数，否则要parseInt转换
			var time = new Date(shijianchuo);
			var y = time.getFullYear();
			var m = time.getMonth()+1;
			var d = time.getDate();
			// var h = time.getHours();
			// var mm = time.getMinutes();
			// var s = time.getSeconds();
			return y+'年'+add0(m)+'月'+add0(d)+'日';
		};

		// $scope.active_info = {
		// 						'a_title': '活动主题', 
		// 						'a_time': '2016年11月11日--2016年11月12日', 
		// 						'a_site': '上海市长宁区仙霞路99',
		// 						'a_des': '霞路99号区仙霞路99号海市长宁区仙霞路99号区仙霞路9 仙霞路99号区仙霞路9仙霞路99号区仙霞路9仙霞路99号区仙霞路9 仙霞路99号区仙霞路9仙霞路99号区仙霞路9 仙霞路99号区仙霞路9',
		// 						'apply_info':{
		// 							'name': '张三三',
		// 							'mobile': '18888888888',
		// 							'sex':2,
		// 							'birthday':'1991-12-12',
		// 							'city': '上海市'
		// 						}
		// 					};
		$scope.is_applied = false;
		$scope.is_show_applyview =false;
		$scope.phonenums = [{'phone':'18888888888'}, {'phone':'18888888881'},{'phone':'18888888882'}];
		$scope.username = '';
		$scope.phonenum = '';
		$('.apply_sex .sex_male').addClass('sex_selected');
		$scope.isMale = true;
		$scope.show_phone_menu = false;
		$scope.show_year_view = false;
		$scope.show_month_view = false;
		$scope.show_day_view = false;

		$scope.show_reminder_view = false;


		$http.get("app/common/citys.json").success(function(data) {
	         $scope.provinces = data;
	         console.log(data);
	    });

	    $scope.select_city = function(){
	    	$scope.provinces_show = true;
	    };

	    $scope.area_string = '';
	    $scope.provinces_show = false;
	    $scope.citys_show = false;
	    $scope.areas_show = false;
		$scope.click_province = function(pro){
			
			var index = $scope.provinces.indexOf(pro);
			console.log(index);
			if (index != 0) {
				console.log(pro.name);
				$scope.province = pro;
				$scope.provinces_show = false;
				$scope.citys_show = true;
	    
			};
		};
		$scope.click_city = function(city){
			
			var index = $scope.province.sub.indexOf(city);
			console.log(index);
			if (index != 0) {
				console.log(city.name);
				$scope.city = city;
				$scope.citys_show = false;
				$scope.areas_show = true;

			};
		};
		$scope.click_area = function(area){
			
			var index = $scope.city.sub.indexOf(area);
			console.log(index);
			if (index != 0) {
				console.log(area.name);
				$scope.area = area;
				$scope.provinces_show = false;
			    $scope.citys_show = false;
			    $scope.areas_show = false;

			    $scope.area_string = $scope.province.name+'-'+$scope.city.name+'-'+$scope.area.name;
			};
		};

		// $scope.click_active = function(active){
		// 	console.log('click_active:'+active.Title);
		// };
		$scope.click_apply_btn = function(){
			$scope.is_show_applyview = true;
		};
		$scope.click_apply_phone = function(isShow){
			if (isShow) {
				$scope.show_phone_menu = false;
			}
			else{
				$scope.show_phone_menu = true;
			};
		};

		$scope.active_apply = '';
		$scope.click_phone = function(phone){
			console.log(phone);
			$scope.phonenum = phone.phone;
			$scope.show_phone_menu = false;
		};
		$scope.isClick_male = function(isMale){

		};

		
		$('.apply_sex .sex_class').on('click', function(){
			if (!$(this).hasClass('sex_selected')) {
				$('.apply_sex .sex_class').removeClass('sex_selected');
				$(this).addClass('sex_selected');
				if ($(this).hasClass('sex_male')) {
					$scope.isMale = true;
				}else{
					$scope.isMale = false;
				};
				console.log($scope.isMale);
			};
		});

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

		$scope.is_apply = function(is_a){
			if (is_a) {
				$scope.show_reminder_view = true;
			}else{

			};
			$scope.is_show_applyview = false;
		};

		$scope.is_show_grayview = function(){
			$scope.show_reminder_view = false;
		};

}]);