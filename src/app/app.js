var routerApp = angular.module('routerApp', ['ui.router', 'mainMoudle', 'manager.const']);

routerApp.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/main');
    $stateProvider.state('main', {
        url: '/main',
        views: {
            '': {
                templateUrl: './app/main/page_main.html'
            }
        }
    });
}).run(function($location) {
    console.log($location.path())
    if ($location.path() != '/index') {
        if (!sessionStorage.getItem('userId')) {
            $location.path('/index');
        }
    }

})
