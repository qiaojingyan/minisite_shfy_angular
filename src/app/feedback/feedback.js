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
        if ($scope.myfeedback.Title.replace(/(^\s*)|(\s*$)/g, "") == '') {
            alert('请填写所遇问题');
            return;
        }
        if ($scope.myfeedback.MsgContent.replace(/(^\s*)|(\s*$)/g, "") == '') {
            alert('请填写问题描述');
            return;
        }
        $scope.loading = true;
        fyData.getToken(function(token) {
            $http({
                method: 'POST',
                url: Const.baseUrl + "/Feedback/SaveFeedback",
                params: {
                    Token: token
                },
                data: $scope.myfeedback
            }).success(function(res) {
                // res = JSON.parse(res);
                $scope.loading = false;
                if (res == true) {
                    alert('提交成功')
                    window.history.back();
                }
            });
        });

    }
}]);
