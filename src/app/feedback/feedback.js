'use strict';
var feedbackModule = angular.module('feedbackModule', ['ngTouch']);

feedbackModule.controller('feedbackCtrl', ['$scope', '$http', '$location', '$stateParams', 'Const', 'fyData', function($scope, $http, $location, $stateParams, Const, fyData) {
    init();

    function init() {
        $scope.myfeedback = {
            IsPublic: "true",
            CategoryID: 'D1264B05-7FF9-4CB1-95FB-EE3106928C04'
        };
    }

    $scope.cancelSubmit = function() {
        window.history.back();
    }

    $scope.submit = function() {
        $scope.myfeedback.Token = fyData.user.token;
        $http({
            method: 'POST',
            url: Const.baseUrl + "/Feedback/SaveFeedback",
            params: {
                Token: fyData.user.token
            },
            data: $scope.myfeedback
        }).success(function(res) {
            console.log(res);
        });
    }
}]);
