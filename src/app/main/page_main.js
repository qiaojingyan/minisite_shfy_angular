'use strict';
var mainMoudle = angular.module('mainMoudle', ['ksSwiper', 'ngTouch']);

mainMoudle.controller('mainCtrl', ['$scope', '$http', '$location', 'Const', 'fyData', function($scope, $http, $location, Const, fyData) {
    init();

    $scope.chosePage = function(num) {
        fyData.nowPage = $scope.nowPage = num;
    };
    $scope.toProductList = function(CategoryID) {
        $location.path('/product_list/' + CategoryID);
    };
    $scope.goToNewsList = function() {
        fyData.nowNewsCategory = 0;
        $location.path('/news_list');
    };
    $scope.goToAboutFy = function() {
        $location.path('/about_fy');
    };
    $scope.goToActive = function() {
        $location.path('/active');
    };
    $scope.goToKnowledge = function() {
        $location.path('/manage_money');
    };
    $scope.goToMyIntegral = function() {
        $location.path('/integral_my');
    };
    $scope.goToIntegralMall = function() {
        if ($scope.esUrl != null) {
            window.location.href = $scope.esUrl;
            return;
        }
        getEsUrl(function() {
            window.location.href = $scope.esUrl;
        });
    };
    $scope.goToFeedback = function() {
        $location.path('/feedback');
    };
    $scope.binding_mobile = function() {
        $location.path('/binding_mobile');
    };
    $scope.goToMyInfo = function() {
        $location.path('/my_info');
    };
    $scope.goToContactUs = function() {
        $location.path('/cantact_us');
    };
    $scope.goToBannerDetail = function(RedirectURL) {
        $location.path(RedirectURL);
    }

    function init() {
        var show_con_height = document.body.clientHeight - 88;
        $scope.show_con_height = show_con_height + 'px';
        $scope.main_btn_content_top = (show_con_height - 235 - 300 * 2 - 8) / 2 > 16 ? ((show_con_height - 235 - 300 * 2 - 8) / 2) + 'px' : '16px';
        var params = {
            slidesPerView: $scope.slidesPerView || 1,
            slidesPerColumn: $scope.slidesPerColumn || 1,
            spaceBetween: $scope.spaceBetween || 0,
            direction: $scope.direction || 'horizontal',
            loop: $scope.loop || false,
            initialSlide: $scope.initialSlide || 0,
            showNavButtons: false
        };
        $scope.nowPage = fyData.nowPage;
        $scope.banners = [{},{}];
        getBanners(function(res) {
            res = JSON.parse(res);
            $scope.banners = res;
        });

        getCategoryList('F3A147D3-92B6-4BC6-8DD2-0988CBE46F32', function(res) {
            res = JSON.parse(res);
            $scope.productList = res;
        })

        $scope.user = fyData.user;

    }

    function getEsUrl(fun) {
        $http({
            method: 'GET',
            url: Const.baseUrl + "/Credit/GetEsURL",
            params: {
                'Token': fyData.user.token
            }
        }).success(function(res) {
            $scope.esUrl = JSON.parse(res);
            if (fun) {
                fun();
            }
        });
    }

    function getCategoryList(CategoryID, fun) {
        $http({
            method: 'GET',
            url: Const.baseUrl + "/Category/GetCategoryList",
            params: {
                'Token': fyData.user.token,
                'CategoryID': CategoryID
            }
        }).success(function(res) {
            if (fun) {
                fun(res);
            }
        });
    }

    function getBanners(fun) {
        $http({
            method: 'GET',
            url: Const.baseUrl + "/Info/GetInfoList",
            params: {
                'Token': fyData.user.token,
                'CategoryID': '0CB47B14-7535-407E-AEA1-646F82DDB118',
                'PageIndex': 1,
                'PageSize': 100
            }
        }).success(function(res) {
            if (fun) {
                fun(res);
            }
        });
    }

}])
