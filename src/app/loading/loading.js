'use strict';
var loadingModule = angular.module('loadingModule', ['ngTouch']);


loadingModule.controller('loadingCtrl', ['$scope', '$http', '$location', '$stateParams', 'Const', 'fyData', function($scope, $http, $location, $stateParams, Const, fyData) {
    init();

    function init() {
        var openid = $location.search()['openid'];
        var redirectPath = decodeURIComponent($stateParams.redirectUrl);
        $http({
            method: 'GET',
            url: Const.baseUrl + "/Token/GetToken",
            params: {
                'OpenId': openid,
            }
        }).success(function(res) {
            var Token = res;
            fyData.user.token = Token;
            $http({
                method: 'GET',
                url: Const.baseUrl + "/User/GetUser",
                params: {
                    'Token': Token,
                }
            }).success(function(res) {
                if (res == null) {
                    return;
                }
                fyData.user = res;
                fyData.user.token = Token;
                sessionStorage.setItem('user', JSON.stringify(fyData.user));
                $location.path(redirectPath);
            });
        });
    }
}]);
