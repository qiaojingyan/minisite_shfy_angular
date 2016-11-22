// 'use strict';
var routerApp = angular.module('routerApp', ['ui.router', 'mainMoudle', 'manager.const', 
    'active_module', 'active_detail_module', 'manage_money_module', 
    'about_fy_module',
    'my_info_module', 'cantact_us_module', 'active_review_module', 'binding_mobile_module']);

routerApp.config(function($stateProvider, $urlRouterProvider) {
    // $urlRouterProvider.otherwise('/main');
    $stateProvider
    .state('main', {
        url: '/main',
        views: {
            '': {
                templateUrl: './app/main/page_main.html'
            }
        }
    })
    .state('active', {
        url: '/active',
        views: {
            '':{
                templateUrl: './app/active/active.html'
            }
        }
    })
    .state('active_detail', {
        url: '/active_detail/:id',
        views: {
            '':{
                templateUrl: './app/active/active_next/active_detail.html'
            }
        }
    })
    .state('active_review', {
        url: '/active_review/:id',
        views: {
            '':{
                templateUrl: './app/active/active_next/active_review.html'
            }
        }
    })
    .state('manage_money', {
        url: '/manage_money',
        views: {
            '':{
                templateUrl: './app/manage_money/manage_money.html'
            }
        }
    })
    .state('my_info', {
        url: '/my_info',
        views: {
            '':{
                templateUrl: './app/member_center/my_info/my_info.html'
            }
        }
    })
    .state('cantact_us', {
        url: '/cantact_us',
        views: {
            '':{
                templateUrl: './app/member_center/cantact_us/cantact_us.html'
            }
        }
    })
    .state('binding_mobile', {
        url: '/binding_mobile',
        views: {
            '':{
                templateUrl: './app/member_center/binding_mobile/binding_mobile.html'
            }
        }
    })
    .state('about_fy', {
        url: '/about_fy',
        views: {
            '':{
                templateUrl: './app/about_fy/about_fy.html'
            }
        }
    })
    ;
})
.run(function($location) {
    console.log($location.path());
    // if ($location.path() != '/index') {
    //     if (!sessionStorage.getItem('userId')) {
    //         $location.path('/index');
    //     }
    // }

});
