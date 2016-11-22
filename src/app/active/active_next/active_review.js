var active_module = angular.module('active_review_module', []);
active_module.controller('active_review_controller', ['$scope', '$http', '$location','$stateParams', 'Const',  
	function($scope, $http, $location, $stateParams, Const){

	console.log('回顾——activeid:'+$stateParams.id);	
	$http({
			method: 'get',
			url: Const.baseUrl + 'Event/GetEvent?Token=123456&EventId='+$stateParams.id
		})
		.success(function(req){
			if(1){
				$scope.acitve_review = JSON.parse(req);

				$('#active_review_content').html($scope.acitve_review.EventContent);
				// document.getElementById('active_review_content').innerHTML = $scope.acitve_review.EventContent;
				// $('.active_review_content').empty();
				console.log($scope.acitve_review);
			}
			// console.log('success_'+req);
		})
		.error(function(req){
			console.log('error_'+req);
		});
}]);