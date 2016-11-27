'use strict';
var integralModule = angular.module('integralModule', ['ngTouch']);


integralModule.controller('myIntegralCtrl', ['$scope', '$http', '$location', '$stateParams', 'Const', 'fyData', function($scope, $http, $location, $stateParams, Const, fyData) {
    init();

    function init() {
        fyData.getToken(function(token) {
            $http({
                method: 'GET',
                url: Const.baseUrl + "/Credit/GetCredit",
                params: {
                    'Token': token
                }
            }).success(function(res) {
                $scope.myIntegral = res;
            });
            $http({
                method: 'GET',
                url: Const.baseUrl + "/Credit/GetCreditList",
                params: {
                    'Token': token,
                    'CreditType': ''
                }
            }).success(function(res) {
                $scope.dataGetSuccess = true;
                $scope.myIntegralRecords = res;
                // $scope.myIntegralRecords = JSON.parse(res);

                $scope.myAchieveIntegralRecords = [];
                $scope.myExchangeIntegralRecords = [];
                $scope.myIntegralRecords.forEach(function(record) {
                    var date = new Date(record.CreditDate);
                    var month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1);
                    var day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate();
                    record.CreditDateText = date.getFullYear() + "-" + month + "-" + day;

                    if (record.CreditType == 1) {
                        $scope.myAchieveIntegralRecords.push(record);
                    } else {
                        $scope.myExchangeIntegralRecords.push(record);
                    }
                });
            });
            getEsUrl(token);
        });

        $scope.selectedPage = 1;
    }

    function getEsUrl(token) {
        $http({
            method: 'GET',
            url: Const.baseUrl + "/Credit/GetEsURL",
            params: {
                'Token': token
            }
        }).success(function(res) {
            $scope.esUrl = res;
        });
    }

    $scope.changePage = function(num) {
        if (num == $scope.selectedPage) {
            return;
        }
        $scope.selectedPage = num;
        $('.integral_my_body_title').removeClass('selected');
        $('.title' + num).addClass('selected');
    }

    $scope.gotoExchange = function() {
        if ($scope.esUrl != null) {
            window.location.href = $scope.esUrl;
            return;

        }
        getEsUrl(function() {
            window.location.href = $scope.esUrl;
        });

    }

}])
