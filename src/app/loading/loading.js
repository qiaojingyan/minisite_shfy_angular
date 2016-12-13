'use strict';
var loadingModule = angular.module('loadingModule', ['ngTouch']);


loadingModule.controller('loadingCtrl', ['$scope', '$http', '$location', '$stateParams', 'Const', 'fyData', function($scope, $http, $location, $stateParams, Const, fyData) {
    init();

    function getCookie(cookie_name) {
        var allcookies = document.cookie;
        var cookie_pos = allcookies.indexOf(cookie_name); //索引的长度  
        // 如果找到了索引，就代表cookie存在，  
        // 反之，就说明不存在。 
        if (cookie_pos != -1) {
            // 把cookie_pos放在值的开始，只要给值加1即可。  
            cookie_pos += cookie_name.length + 1; //这里我自己试过，容易出问题，所以请大家参考的时候自己好好研究一下。。。  
            var cookie_end = allcookies.indexOf(";", cookie_pos);
            if (cookie_end == -1) {
                cookie_end = allcookies.length;
            }
            var value = unescape(allcookies.substring(cookie_pos, cookie_end)); //这里就可以得到你想要的cookie的值了。。。  
        }
        return value;
    }

    function delCookie(cookie_name) {
        var myDate = new Date();
        myDate.setTime(-1000); //设置时间    
        document.cookie = cookie_name + "=''; expires=" + myDate.toGMTString();
    }

    function init() {
        console.log($stateParams.redirectUrl);
        console.log('loading');
        var redirectPath = decodeURIComponent($stateParams.redirectUrl);
        var openid = getCookie('FXI.WeChat.OpenId');
        if ($location.search().debug == 1314) {
            openid = 'oeJFAvy0Dr-Zcz_pWZH86DAaSBO8';
        }
        if (openid == undefined || openid == null) {
            window.location.href = 'http://wechat.fxigroup.com/wechat/oauth/index?param=' + encodeURIComponent('http://wechat.fxigroup.com/minisite/#' + redirectPath);
            return;
        }
        $http({
            method: 'GET',
            url: Const.baseUrl + "/Token/GetToken",
            params: {
                'OpenId': openid,
            }
        }).success(function(res) {
            if (res == null) {
                window.location.href = 'http://wechat.fxigroup.com/wechat/oauth/index?param=' + encodeURIComponent('http://wechat.fxigroup.com/minisite/#/' + redirectPath);
                return;
            }
            var Token = res;
            fyData.user.token = Token;
            if (redirectPath == '/integral_shop' || $location.path() == '/integral_shop') {
                $http({
                    method: 'GET',
                    url: Const.baseUrl + "/Credit/GetEsURL",
                    params: {
                        'Token': Token,
                    }
                }).success(function(res) {
                    if (res == null) {
                        alert('网络错误，请稍候重试');
                        window.history.back();
                        return;
                    }
                    window.location.href = res;
                });
                return;
            }
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
                fyData.user.openid = openid;
                sessionStorage.setItem('user', JSON.stringify(fyData.user));
                if (redirectPath == '/integral_achieve' || redirectPath == '/active_online_1202') {
                    console.log($location.search().useInfo);
                    var useInfo = $location.search().useInfo;
                    if (useInfo == undefined) {
                        var b = new Base64();
                        var str = b.encode(fyData.user.OpenId);
                        useInfo = str;
                    }
                    $location.search().useInfo = useInfo;
                }
                $location.path(redirectPath);
            });
        });
    }
}]);
