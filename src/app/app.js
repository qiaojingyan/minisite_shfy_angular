'use strict';
var routerApp = angular.module('routerApp', ['ui.router', 'mainMoudle', 'manager.const', 'productMoudle', 'newsModule', 'integralModule', 'feedbackModule', 'active_module', 'active_detail_module', 'manage_money_module',
    'about_fy_module', 'my_info_module', 'cantact_us_module', 'active_review_module', 'binding_mobile_module', 'loadingModule', 'active_online_module'
]);
routerApp.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/main');
    $stateProvider.state('loading', {
        url: '/loading/:redirectUrl',
        views: {
            '': {
                templateUrl: './app/loading/page_loading.html'
            }
        }
    }).state('main', {
        url: '/main',
        views: {
            '': {
                templateUrl: './app/main/page_main.html'
            }
        }
    }).state('product_list', {
        url: '/product_list/:categoryId',
        views: {
            '': {
                templateUrl: './app/product/page_productList.html'
            }
        }
    }).state('product_detail', {
        url: '/product_detail/:parentCategoryId/:categoryId',
        views: {
            '': {
                templateUrl: './app/product/page_productDetail.html'
            }
        }
    }).state('news_list', {
        url: '/news_list',
        views: {
            '': {
                templateUrl: './app/news/page_newsList.html'
            }
        }
    }).state('news', {
        url: '/news/:newsId',
        views: {
            '': {
                templateUrl: './app/news/page_newsDetail.html'
            }
        }
    }).state('integral_my', {
        url: '/integral_my',
        views: {
            '': {
                templateUrl: './app/integral/page_myIntegral.html'
            }
        }
    }).state('feedback', {
        url: '/feedback',
        views: {
            '': {
                templateUrl: './app/feedback/page_feedback.html'
            }
        }
    }).state('active', {
        url: '/active',
        views: {
            '': {
                templateUrl: './app/active/active.html'
            }
        }
    }).state('active_detail', {
        url: '/active_detail/:id',
        views: {
            '': {
                templateUrl: './app/active/active_next/active_detail.html'
            }
        }
    }).state('active_review', {
        url: '/active_review/:id',
        views: {
            '': {
                templateUrl: './app/active/active_next/active_review.html'
            }
        }
    }).state('manage_money', {
        url: '/manage_money',
        views: {
            '': {
                templateUrl: './app/manage_money/manage_money.html'
            }
        }
    }).state('my_info', {
        url: '/my_info',
        views: {
            '': {
                templateUrl: './app/member_center/my_info/my_info.html'
            }
        }
    }).state('cantact_us', {
        url: '/cantact_us',
        views: {
            '': {
                templateUrl: './app/member_center/cantact_us/cantact_us.html'
            }
        }
    }).state('binding_mobile', {
        url: '/binding_mobile',
        views: {
            '': {
                templateUrl: './app/member_center/binding_mobile/binding_mobile.html'
            }
        }
    }).state('about_fy', {
        url: '/about_fy',
        views: {
            '': {
                templateUrl: './app/about_fy/about_fy.html'
            }
        }
    }).state('integral_shop', {
        url: '/integral_shop',
        views: {
            '': {
                templateUrl: './app/loading/page_loading.html'
            }
        }
    }).state('integral_achieve', {
        url: '/integral_achieve',
        views: {
            '': {
                templateUrl: './app/integral/page_achieveIntegral.html'
            }
        }
    }).state('active_online_1202', {
        url: '/active_online_1202',
        views: {
            '': {
                templateUrl: './app/active/active_online/active_online_1202.html'
            }
        }
    }).state('active_online_1202_wine', {
        url: '/active_online_1202_wine',
        views: {
            '': {
                templateUrl: './app/active/active_online/active_online_1202_wine.html'
            }
        }
    });
}).run(function($location) {
    console.log($location.path());
    if (!sessionStorage.getItem('user')) {
        $location.path('/loading/' + encodeURIComponent($location.path()));
    }

}).service('fyData', function($http, Const) {
    this.user = {};
    if (sessionStorage.getItem('user')) {
        this.user = JSON.parse(sessionStorage.getItem('user'));
    }
    this.nowPage = 1;
    this.nowNewsCategory = 0;
    var self = this;

    this.getToken = function(fun, openid) {
        if (openid == undefined) {
            openid = self.user.OpenId;
        }
        $http({
            method: 'GET',
            url: Const.baseUrl + "/Token/GetToken",
            params: {
                'OpenId': openid,
            }
        }).success(function(res) {
            if (res == null) {
                alert("认证出错，请退出重新登陆");
                return;
            }
            self.user.token = res;
            if (fun) {
                fun(res);
            }
        });
    }
});
