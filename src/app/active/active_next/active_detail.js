var active_detail_module = angular.module('active_detail_module', []);
active_detail_module.controller('active_detail_controller', ['$scope', '$http', '$location', '$stateParams', 'Const', 'fyData', 
	function($scope, $http, $location, $stateParams, Const, fyData){

		// console.log('详情——activeid:'+$stateParams.id);
		for(var key in fyData.user){
        	if (fyData.user[key] == undefined || fyData.user[key] == null) {
        		fyData.user[key] = '';
        	}; 
        	// console.log(fyData.user[key]);
        }

        

		getDetailActive();
		getAccountList();
		function getDetailActive(){
			$http({
				method: 'get',
				url: Const.baseUrl + 'Event/GetEvent',
				params: {
			                'Token': fyData.user.token,
			                'EventId': $stateParams.id
			            }
			})
			.success(function(req){
				if(1){
					// $scope.active_info = JSON.parse(req);
					$scope.active_info = req;
					$scope.active_info.Birthday = format_yyyy_mm_dd($scope.active_info.Birthday);
					// console.log($scope.active_info);
					// $scope.active_info.st_end_time = format($scope.active_info.StartDate)+'~~'+format($scope.active_info.EndDate);
					$scope.dataGetSuccess = true;	
				}
				// console.log('success_'+req);
			})
			.error(function(req){
				console.log('error_'+req);
			});
		};

		function getAccountList(){
			$http({
				method: 'get',
				url: Const.baseUrl + 'User/GetAccountList',
				params:{
					'Token': fyData.user.token
				}
			})
			.success(function(req){

				// $scope.phonenums = JSON.parse(req);
				$scope.phonenums = req;
				if ($scope.phonenums.length > 0) {
					$scope.phonenum = $scope.phonenums[0].Mobile;
				}
				else{
					$scope.phonenum = '';
				};
				
				// console.log('success_'+req);
			})
			.error(function(req){
				console.log('error_'+req);
			});
		};
		
		$scope.addOtherPhone = function(){
			$location.path('/binding_mobile');
		};
		function add0(m){return m<10?'0'+m:m; };
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
		function format_yyyy_mm_dd(shijianchuo)
		{
		//shijianchuo是整数，否则要parseInt转换
			var time = new Date(shijianchuo);
			var y = time.getFullYear();
			var m = time.getMonth()+1;
			var d = time.getDate();
			// var h = time.getHours();
			// var mm = time.getMinutes();
			// var s = time.getSeconds();
			return y+'-'+add0(m)+'-'+add0(d);
		};

		$scope.is_applied = false;
		$scope.is_show_applyview =false;
		
		$scope.username = fyData.user.Name;
		if (fyData.user.Sex != 1 && fyData.user.Sex != 2) {
			fyData.user.Sex = 1;
		};
		$scope.isMale = fyData.user.Sex;

		if ($scope.isMale == 1) {
			$('.apply_sex .sex_male').addClass('sex_selected');
		}else{
			$('.apply_sex .sex_female').addClass('sex_selected');
		};
		
		
		$scope.birthday = fyData.user.Birthday.length > 0 ? format_yyyy_mm_dd(fyData.user.Birthday) : '1999-01-01';
		$scope.province = {'name': fyData.user.State};
		$scope.city = {'name': fyData.user.City};
		$scope.area = {};
		$scope.area_string = fyData.user.Country+' '+fyData.user.State+' '+fyData.user.City;
		$scope.show_phone_menu = false;
		$scope.show_year_view = false;
		$scope.show_month_view = false;
		$scope.show_day_view = false;

		$scope.show_reminder_view = false;
		

		$http.get("app/common/citys.json").success(function(data) {
	         $scope.provinces = data;
	         // console.log(data);
	    });

	    $scope.select_city = function(){
	    	$scope.provinces_show = true;
	    }; 
	    
	    $scope.provinces_show = false;
	    $scope.citys_show = false;
	    $scope.areas_show = false;
		$scope.click_province = function(pro){
			
			var index = $scope.provinces.indexOf(pro);
			// console.log(index);
			if (index > 0 && index < $scope.provinces.length-1) {
				// console.log(pro.name);
				$scope.province = pro;
				if (pro.sub.length == 0) {
					$scope.city.name = '';
					$scope.area.name = '';
					setCity();
					
					$scope.citys_show = false;

				}else{
					$scope.citys_show = true;
				};
				$scope.provinces_show = false;
	    
			}else if(index == $scope.provinces.length-1){
				$scope.provinces_show = false;
				$scope.citys_show = false;
				$scope.province.name = '其他';
				$scope.city.name = '其他';
				$scope.area.name = '其他';
				setCity();
			};
		};
		$scope.click_city = function(city){
			
			var index = $scope.province.sub.indexOf(city);
			// console.log(index);
			if (index > 0 && index < $scope.province.sub.length - 1)  {
				// console.log(city.name);
				$scope.city = city;
				if (!city.sub || city.sub.length == 0) {
					$scope.area.name = '';
					setCity();
					
					$scope.areas_show = false;
				}else{
					$scope.areas_show = true;
				};
				$scope.citys_show = false;
				

			}else if (index == $scope.province.sub.length - 1) {
				$scope.city.name = '其他';
				$scope.area.name = '其他';
				setCity();
				$scope.citys_show = false;
			};;
		};
		$scope.click_area = function(area){
			
			var index = $scope.city.sub.indexOf(area);
			// console.log(index);
			if (index != 0) {
				// console.log(area.name);
				$scope.area = area;
				$scope.provinces_show = false;
			    $scope.citys_show = false;
			    $scope.areas_show = false;

			    setCity();
			    // $scope.area_string = $scope.province.name+' '+$scope.city.name+' '+$scope.area.name;
			};
		};
		function setCity(){
			$scope.area_string = $scope.province.name+' '+$scope.city.name+' '+$scope.area.name;
		}

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
			// console.log(phone);
			$scope.phonenum = phone.Mobile;
			$scope.show_phone_menu = false;
		};
		$scope.isClick_male = function(isMale){

		};

		
		$('.apply_sex .sex_class').on('click', function(){
			if (!$(this).hasClass('sex_selected')) {
				$('.apply_sex .sex_class').removeClass('sex_selected');
				$(this).addClass('sex_selected');
				if ($(this).hasClass('sex_male')) {
					$scope.isMale = 1;
				}else{
					$scope.isMale = 2;
				};
				console.log($scope.isMale);
			};
		});

		$scope.bir_year = $scope.birthday.split('-')[0];
		$scope.bir_month = $scope.birthday.split('-')[1];
		$scope.bir_day = $scope.birthday.split('-')[2];
		
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
			for (var i = max_year; i > max_year - 100; i--) {
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

			$scope.birthday = $scope.bir_year+'-'+$scope.bir_month+'-'+$scope.bir_day;
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

			$scope.birthday = $scope.bir_year+'-'+$scope.bir_month+'-'+$scope.bir_day;

		};
		$scope.selected_day = function(d){
			$scope.bir_day = d;
			$scope.show_day_view = false;

			$scope.birthday = $scope.bir_year+'-'+$scope.bir_month+'-'+$scope.bir_day;
		};

		$scope.is_apply = function(is_a){
			if (is_a) {
				apply_submit();
				
			}else{
				$scope.is_show_applyview = false;
			};
			
		};
		function apply_submit(){

			if (!$scope.username || $scope.username.length<=0) {
				alert('请输入姓名！');
				return;
			}else if(!$scope.province.name || $scope.province.name.length<=0){
				alert('请选择正确的地区！');
				return;
			};

			// console.log('完美');
			// return;
			$http({
				method: 'get',
				url: Const.baseUrl + 'Event/SignUp',
				params:{
					'Token': fyData.user.token,
			        'EventId': $stateParams.id,
			        'UserName': $scope.username,
			        'Mobile': $scope.phonenum,
			        'Gender': $scope.isMale,
			        'Birthday': $scope.birthday,
			        // 'Location': $scope.area_string
			        'Country': '中国',
			        'State': $scope.province.name,
			        'City': $scope.city.name
				}
			})
			.success(function(req){
				
				console.log('success_'+req);
				$scope.active_info.IsSignUp = '1';
				$scope.active_info.UserName = $scope.username;
				$scope.active_info.Mobile = $scope.phonenum;
				$scope.active_info.Gender = $scope.isMale;
				$scope.active_info.Birthday = $scope.birthday;

				fyData.user.Name = $scope.username;
				fyData.user.Sex = $scope.isMale;
				fyData.user.Birthday = $scope.birthday;
				fyData.user.State = $scope.province.name;
				fyData.user.City = $scope.city.name;

				$scope.is_show_applyview = false;
				$scope.show_reminder_view = true;
				// setUserToLocal();
			})
			.error(function(req){
				console.log('error_'+req);
			});
		};

		function setUserToLocal(){
			sessionStorage.setItem('user', JSON.stringify(fyData.user));
		};


		// function 

		$scope.is_show_grayview = function(){
			$scope.show_reminder_view = false;
		};

}]);