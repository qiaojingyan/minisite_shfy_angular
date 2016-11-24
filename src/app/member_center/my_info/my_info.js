var active_module = angular.module('my_info_module', []);
active_module.controller('my_info_controller', ['$scope', '$http', '$location', 'Const', 'fyData', 
	function($scope, $http, $location, Const, fyData){

		$scope.my_info = {};
		if (fyData.user) {
	        // fyData.user = JSON.parse(sessionStorage.getItem('user'));
	        $scope.my_info = fyData.user;
	        $scope.dataGetSuccess = true;
	        dataHandle();
	    }else{
	    	$http({
				method: 'get',
				url: Const.baseUrl + 'User/GetUser',
				params: {
					'Token': fyData.user.token
				}
			})
			.success(function(req){
				if(1){
					$scope.my_info = JSON.parse(req);
					// console.log('my_info: '+$scope.my_info);
					dataHandle();
				}
				console.log('success_'+req);
				$scope.dataGetSuccess = true;
			})
			.error(function(req){
				console.log('error_'+req);
			});
	    };
		// console.log('user:'+fyData.user);
		

		

		function dataHandle(){
			$scope.temp_info = angular.copy($scope.my_info);
					// $scope.temp_info = $scope.my_info;
			if ($scope.temp_info.Birthday && $scope.temp_info.Birthday.length>0) {
				$scope.temp_info.Birthday = $scope.temp_info.Birthday.substr(0, 10);
				$scope.my_info.Birthday = $scope.temp_info.Birthday;

				$scope.bir_year = $scope.temp_info.Birthday.split('-')[0];
				$scope.bir_month = $scope.temp_info.Birthday.split('-')[1];
				$scope.bir_day = $scope.temp_info.Birthday.split('-')[2];
			}else{
				$scope.bir_year = '1999';
				$scope.bir_month = '01';
				$scope.bir_day = '01';

			};
			// console.log('temp_info:'+$scope.temp_info);
		};

		$scope.show_arr = [
							{'show_input' : false},
							{'show_input' : false},
							{'show_input' : false},
							{'show_input' : false},
							{'show_input' : false},
							{'show_input' : false},
							{'show_input' : false},
							{'show_input' : false},
							{'show_input' : false}
							];

		$scope.info_click = function(index){
			if (index == 1) {
				$location.path('/binding_mobile');
			}else{
				dataHandle();
				$scope.show_arr[index].show_input = true;
			};
			

		};

		$scope.is_change = function(is_c){
			if (is_c) {
				var i = 0;
				for (; i < $scope.show_arr.length; i++) {
					var ob = $scope.show_arr[i];
					if (ob.show_input) {
						// ob.show_input = false;
						break;
					};
				};
				submit_info(i);
			}else{
				for (var i = 0; i < $scope.show_arr.length; i++) {
					var ob = $scope.show_arr[i];
					if (ob.show_input) {
						ob.show_input = false;
						break;
					};
				};
			};

			
		};
		
		
		function checkIDCard(idCard){ 
		    
			var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;  
		   	if(reg.test(idCard) === false)  
		   	{  
		       alert("身份证输入不合法");  
		       return  false;  
		   	} 
		    return true;
		}

		function checkEmail(email){
			var reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;  
		   	
			if(reg.test(email) === false){
				alert("邮箱格式有误，请重填");  
		        return false; 
			};
			return true;
		}

		function checkZip(Zip){
			var reg = /^[1-9][0-9]{5}$/;  
			if(reg.test(Zip) === false){
				alert("邮政编码格式有误，请重填");  
		        return false; 
			};
			return true;
		}

		function submit_info(index){
			if (index === 4) {
				$scope.temp_info.Birthday = $scope.bir_year+'-'+$scope.bir_month+'-'+$scope.bir_day;
			}else if(index === 2){
				//邮箱
				if (!checkEmail($scope.temp_info.Email)) {return;}; 
			}else if(index === 3){
				//身份证
				if (!checkIDCard($scope.temp_info.IDNumber)) {return;}; 
			}else if(index === 7){
				//邮政编码
				if (!checkZip($scope.temp_info.Zip)) {return;}; 
			};
			$scope.dataGetSuccess = false;
			for (var i = 0; i < $scope.show_arr.length; i++) {
				var ob = $scope.show_arr[i];
				if (ob.show_input) {
					ob.show_input = false;
					break;
				};
			};

			var info_data = {
							'Name': $scope.temp_info.Name, 
							'IDNumber': $scope.temp_info.IDNumber,
							'Mobile': $scope.temp_info.Mobile,
							'Email': $scope.temp_info.Email,
							'Country': '中国',
							'State': $scope.temp_info.State,
							'City': $scope.temp_info.City,
							'Zip': $scope.temp_info.Zip,
							'Birthday': $scope.temp_info.Birthday,
							'Address': $scope.temp_info.Address
							};
			$http({
				method: 'post',
				url: Const.baseUrl + 'User/SaveUser?Token=123456',
				data: info_data
			})
			.success(function(req){
				// if(1){
				// 	$scope.all_acitves = JSON.parse(req);
				// 	console.log($scope.all_acitves);
				// }
				if (JSON.parse(req)) {
					$scope.my_info = angular.copy($scope.temp_info);
					fyData.user = angular.copy($scope.my_info);
					setUserToLocal();
				}else{
					alert('保存失败！');
				};
				$scope.dataGetSuccess = true;
				// $scope.my_info = angular.copy($scope.temp_info);
				// fyData.user = angular.copy($scope.my_info);
				

				console.log('success_'+req);
			})
			.error(function(req){
				console.log('error_'+req);
				$scope.dataGetSuccess = true;
			});

			
		};
		function setUserToLocal(){
			sessionStorage.setItem('user', JSON.stringify(fyData.user));
		};
		
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
				if ($scope.bir_month === '02') {
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


		$http.get("app/common/citys.json").success(function(data) {
	         $scope.provinces = data;
	         // console.log(data);
	    });

	    $scope.select_city = function(){
	    	$scope.provinces_show = true;
	    };

	    $scope.province = {};
		$scope.city = {};
		$scope.area = {};
	    
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
			$scope.temp_info.Country = '中国';
			$scope.temp_info.State = $scope.province.name;
			$scope.temp_info.City = $scope.city.name;
		}

}]);