var active_module = angular.module('about_fy_module', []);
active_module.controller('about_fy_controller', ['$scope', '$http', '$location', 'Const', 'fyData', 
	function($scope, $http, $location, Const, fyData){

		// getNewsList('9F96AEBF-B2F6-4FAB-A288-092A9CE11AEF');
		getNewsList('0CB47B14-7535-407E-AEA1-646F82DDB668');
		

		function getNewsList(CategoryID) {
	        $http({
	            method: 'GET',
	            url: Const.baseUrl + "/Info/GetInfoList",
	            params: {
	                'Token': fyData.user.token,
	                'CategoryID': CategoryID,
	                'PageIndex': 1,
	                'PageSize': 100
	            }
	        }).success(function(res) {
	            var data = JSON.parse(res)[0];
	            // $scope.NewsList = res;
	            $('.about_fy_content').html(data.ContentBody);
	            // console.log(res);
	            $scope.dataGetSuccess = true;
	        })
	        .error(function(req){
				console.log('error_'+req);
			});

	    }


}]);