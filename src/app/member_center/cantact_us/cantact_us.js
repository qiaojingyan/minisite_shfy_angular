var active_module = angular.module('cantact_us_module', []);
active_module.controller('cantact_us_controller', ['$scope', '$http', '$location', 'Const', 
	function($scope, $http, $location, Const){

		$('.cantact_btn').addClass('bar_btn_selected');
		$('.nav_bar .bar_btn').click(function(){
			if (!$(this).hasClass('bar_btn_selected')) {
				console.log('click');
				$('.bar_btn').removeClass('bar_btn_selected');
				$(this).addClass('bar_btn_selected');

				var nav_con = $(this).attr('index');
				$('.nav_controller').css('display', 'none');
				$('.'+nav_con).css('display', 'block');
			}; 
			
		});
		
}]);