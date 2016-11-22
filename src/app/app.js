'use strict';
var routerApp = angular.module('routerApp', ['ui.router', 'mainMoudle', 'manager.const', 'productMoudle', 'newsModule','integralModule','feedbackModule']);

routerApp.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/main');
    $stateProvider.state('main', {
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
    });
}).run(function($location) {
    console.log($location.path());
}).service('fyData', function() {
    var banners = [{
        RefImageURL: './images/main_pro_cover1.png'
    }, {
        RefImageURL: './images/main_pro_cover2.png'
    }, {
        RefImageURL: './images/main_pro_cover3.png'
    }];
    this.getBanners = function() {
        return banners;
    };
    this.nowPage = 1;
    this.nowNewsCategory = 0;
    this.user = {
        token:'123456'
    }
});
