'use strict';
var productMoudle = angular.module('productMoudle', ['ngTouch']);

productMoudle.controller('productListCtrl', ['$scope', '$http', '$location', '$stateParams', 'Const', 'fyData', function($scope, $http, $location, $stateParams, Const, fyData) {
    init();

    function init() {
        $('.product_content').delegate('.content_item_title_con', 'click', function() {
            if ($(this).parent().hasClass('hideItem')) {
                $(this).parent().removeClass('hideItem').addClass('showItem');
            } else {
                $(this).parent().removeClass('showItem').addClass('hideItem');
            }
        });
        getProductContent($stateParams.categoryId, function(res) {
            // res = JSON.parse(res);
            $scope.dataGetSuccess = true;
            if (res.length == 1 && res[0].Description != undefined && res[0].Description != '' && res[0].Description != null) {
                document.getElementById('product_content').innerHTML = res[0].Description;
                return;
            }
            $scope.productList = res;
        });
        getCategoryInfo($stateParams.categoryId, function(res) {
            // res = JSON.parse(res);
            $scope.productCategory = res;
        });
    }

    $scope.getListIncome = function(incomeStr) {
        var incomes = incomeStr.split('-');
        return incomes[incomes.length - 1];
    }

    $scope.getRewardType = function(product) {
        if (product.RewardType == '' || product.RewardType == undefined || product.RewardType == null) {
            return product.IncomeType;
        }
        return product.RewardType;
    }

    $scope.goProductDetail = function(CategoryID) {
        $location.path('/product_detail/' + $stateParams.categoryId + '/' + CategoryID);
    };

    function getProductContent(CategoryID, fun) {
        $http({
            method: 'GET',
            url: Const.baseUrl + "/product/GetProductList",
            params: {
                'Token': fyData.user.token,
                'CategoryID': CategoryID,
                'EntityStatus': '',
                'PageIndex': 1,
                'PageSize': 100
            }
        }).success(function(res) {
            if (fun) {
                fun(res);
            }
        });
    }

    function getCategoryInfo(CategoryID, fun) {
        $http({
            method: 'GET',
            url: Const.baseUrl + "/Category/GetCategory",
            params: {
                'Token': fyData.user.token,
                'CategoryID': CategoryID,
            }
        }).success(function(res) {
            if (fun) {
                fun(res);
            }
        });
    }

}]);


productMoudle.controller('productDetailCtrl', ['$scope', '$http', '$location', '$stateParams', 'Const', 'fyData', function($scope, $http, $location, $stateParams, Const, fyData) {
    init();

    function init() {
        if (fyData.user.Mobile == null || fyData.user.Mobile == undefined) {
            $location.path('binding_mobile');
            return;
        }
        $scope.productCategory = {
            CategoryID: $stateParams.parentCategoryId
        };
        getCategoryInfo($stateParams.parentCategoryId, function(res) {
            // res = JSON.parse(res);
            $scope.productCategory = res;
        });

        getProductDetail($stateParams.categoryId, function(res) {
            // res = JSON.parse(res);
            $scope.dataGetSuccess = true;
            $scope.productDetail = res;

            var ProductElement = [{
                key: '产品名称',
                value: res.Name,
                important: 0
            }];
            if (res.ProductScale != '' && res.ProductScale != undefined) {
                ProductElement.push({
                    key: '产品规模',
                    value: res.ProductScale,
                    important: 0
                });
            }
            if (res.Investment != '' && res.Investment != undefined) {
                ProductElement.push({
                    key: '资金投向',
                    value: res.Investment,
                    important: 0
                });
            }
            if (res.LockPeriods != '' && res.LockPeriods != undefined) {
                ProductElement.push({
                    key: '封闭期',
                    value: res.LockPeriods,
                    important: 1
                });
            }
            if (res.SubscriptionPoint != '' && res.SubscriptionPoint != undefined) {
                ProductElement.push({
                    key: '认购起点',
                    value: res.SubscriptionPoint,
                    important: 1
                });
            }
            if (res.IncomeType != '' && res.IncomeType != undefined) {
                ProductElement.push({
                    key: '收益类型',
                    value: res.IncomeType,
                    important: 0
                });
            }
            if (res.ExpectedIncome != '' && res.ExpectedIncome != undefined) {
                ProductElement.push({
                    key: '预期收益',
                    value: res.ExpectedIncome,
                    important: 1
                });
            }
            if (res.IncomeSource != '' && res.IncomeSource != undefined) {
                ProductElement.push({
                    key: '收益来源',
                    value: res.IncomeSource,
                    important: 0
                });
            }
            if (res.RewardType != '' && res.RewardType != undefined) {
                ProductElement.push({
                    key: '分红方式',
                    value: res.RewardType,
                    important: 0
                });
            }
            if (res.ProductTerm != '' && res.ProductTerm != undefined) {
                ProductElement.push({
                    key: '产品期限',
                    value: res.ProductTerm,
                    important: 1
                });
            }
            if (res.WarningLine != '' && res.WarningLine != undefined) {
                ProductElement.push({
                    key: '预警线',
                    value: res.WarningLine,
                    important: 1
                });
            }
            if (res.LossLine != '' && res.LossLine != undefined) {
                ProductElement.push({
                    key: '止损线',
                    value: res.LossLine,
                    important: 1
                });
            }
            $scope.ProductElement = ProductElement;

            var content = "";
            if (res.FundManagers != undefined && res.FundManagers != '') {
                content += res.FundManagers;
            }
            if (res.RiskSecurity != undefined && res.RiskSecurity != '') {
                content += res.RiskSecurity;
            }
            if (res.HighLights != undefined && res.HighLights != '') {
                content += res.HighLights;
            }
            if (res.RiskManagement != undefined && res.RiskManagement != '') {
                content += res.RiskManagement;
            }
            document.getElementById('product_detail_content').innerHTML = content;
        })

        $('.product_detail').delegate('.content_item_title_con', 'click', function() {
            if ($(this).parent().hasClass('hideItem')) {
                $(this).parent().removeClass('hideItem').addClass('showItem');
            } else {
                $(this).parent().removeClass('showItem').addClass('hideItem');
            }
        });
    }

    $scope.getTopIncome = function(incomeStr) {
        if (incomeStr == undefined) {
            return;
        }
        var str = incomeStr.replace('%', '');
        str = str.replace('%', '');
        str = str.replace('-', '~');
        var notNumIndex = 0;
        for (var i = 0; i < str.length; i++) {
            var char = str.charAt(i);
            if (!((char >= '0' && char <= '9') || char == '~' || char == '.')) {
                notNumIndex = i;
            }
        }
        if (notNumIndex != 0) {
            notNumIndex = notNumIndex + 1;
        }
        str = str.substr(notNumIndex, str.length);
        return str;
    }

    function getProductDetail(productId, fun) {
        $http({
            method: 'GET',
            url: Const.baseUrl + "/product/GetProduct",
            params: {
                'Token': fyData.user.token,
                'ProductId': productId,
            }
        }).success(function(res) {
            if (fun) {
                fun(res);
            }
        });
    }

    function getCategoryInfo(CategoryID, fun) {
        $http({
            method: 'GET',
            url: Const.baseUrl + "/Category/GetCategory",
            params: {
                'Token': fyData.user.token,
                'CategoryID': CategoryID,
            }
        }).success(function(res) {
            if (fun) {
                fun(res);
            }
        });
    }
}]);
