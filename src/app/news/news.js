'use strict';
var newsModule = angular.module('newsModule', ['ngTouch']);

newsModule.controller('newsListCtrl', ['$scope', '$http', '$location', '$stateParams', 'Const', 'fyData', function($scope, $http, $location, $stateParams, Const, fyData) {
    init();

    function init() {
        $scope.NewsList = [];
        $scope.productCategory = {
            CategoryID: $stateParams.parentCategoryId
        };
        $http({
            method: 'GET',
            url: Const.baseUrl + "/Category/GetCategoryList",
            params: {
                'Token': fyData.user.token,
                'CategoryID': 'd1264b05-7ff9-4cb1-95fb-ee3106928c33'
            }
        }).success(function(res) {
            // res = JSON.parse(res);
            $scope.NewsCategorys = res;
            $scope.NewsCategorys[fyData.nowNewsCategory].selected = 1;
            getNewsList($scope.NewsCategorys[fyData.nowNewsCategory].CategoryID);
        });
    }

    function getNewsList(CategoryID) {

        $scope.dataGetSuccess = false;
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
            $scope.dataGetSuccess = true;
            // res = JSON.parse(res);
            $scope.NewsList = res;
        });

    }

    $scope.changeNewsCategory = function(index) {
        if (fyData.nowNewsCategory == index) {
            return;
        }
        fyData.nowNewsCategory = index;
        getNewsList($scope.NewsCategorys[fyData.nowNewsCategory].CategoryID);
        $scope.NewsCategorys.forEach(function(item) {
            item.selected = 0;
        })
        $scope.NewsCategorys[fyData.nowNewsCategory].selected = 1;
    }

    $scope.gotoNewsDetail = function(NewsID) {
        $location.path('/news/' + NewsID);
    }

    $scope.getDateStr = function(dateStr) {
        var date = new Date(dateStr);
        var month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1);
        var day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate();
        return date.getFullYear() + "-" + month + "-" + day;
    }
}]);

newsModule.controller('newsDetailCtrl', ['$scope', '$http', '$location', '$stateParams', 'Const', 'fyData', function($scope, $http, $location, $stateParams, Const, fyData) {
    init();

    function init() {
        $http({
            method: 'GET',
            url: Const.baseUrl + "/Info/GetInfo",
            params: {
                'Token': fyData.user.token,
                'InfoID': $stateParams.newsId,
            }
        }).success(function(res) {
            $scope.dataGetSuccess = true;
            // res = JSON.parse(res);
            $scope.nowNews = res;
            if ($scope.nowNews.ContentBody != undefined && $scope.nowNews.ContentBody != null) {
                document.getElementById('news_detail_content').innerHTML = $scope.nowNews.ContentBody;
            }
        });
    }
}]);
