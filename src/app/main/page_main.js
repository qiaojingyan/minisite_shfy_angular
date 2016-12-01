'use strict';
var mainMoudle = angular.module('mainMoudle', ['ksSwiper', 'ngTouch']);

mainMoudle.controller('mainCtrl', ['$scope', '$http', '$location', '$stateParams', 'Const', 'fyData', function($scope, $http, $location, $stateParams, Const, fyData) {
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
        fyData.getToken(function(token) {
            getEsUrl(function() {
                window.location.href = $scope.esUrl;
            }, token);
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
        var b = new Base64();
        var useInfo = b.encode(fyData.user.OpenId);
        $location.search().useInfo = useInfo;
        $location.path(RedirectURL);
    }
    $scope.goToAchieveIntegral = function() {
        var b = new Base64();
        var str = b.encode(fyData.user.OpenId);
        $location.search().useInfo = str;
        $location.path('/integral_achieve');
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
        $scope.banners = [{}, {}];

        fyData.getToken(function(token) {
            getBanners(function(res) {
                // res = JSON.parse(res);
                $scope.banners = res;
            }, token);

            getCategoryList('F3A147D3-92B6-4BC6-8DD2-0988CBE46F32', function(res) {
                // res = JSON.parse(res);
                $scope.productList = res;
            }, token);
        });


        $scope.user = fyData.user;

    }

    function getEsUrl(fun, token) {
        $http({
            method: 'GET',
            url: Const.baseUrl + "/Credit/GetEsURL",
            params: {
                'Token': token
            }
        }).success(function(res) {
            // $scope.esUrl = JSON.parse(res);
            $scope.esUrl = res;
            if (fun) {
                fun();
            }
        });
    }

    function getCategoryList(CategoryID, fun, token) {
        $http({
            method: 'GET',
            url: Const.baseUrl + "/Category/GetCategoryList",
            params: {
                'Token': token,
                'CategoryID': CategoryID
            }
        }).success(function(res) {
            if (fun) {
                fun(res);
            }
        });
    }

    function getBanners(fun, token) {
        $http({
            method: 'GET',
            url: Const.baseUrl + "/Info/GetInfoList",
            params: {
                'Token': token,
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
