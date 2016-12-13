var active_online_module = angular.module('active_online_module', []);

active_online_module.controller('active_2012_wine_controller', ['$scope', '$http', '$location', 'Const', 'fyData', function($scope, $http, $location, Const, fyData) {
    init();

    function init() {
        var data1, data2;
        fyData.getToken(function(token) {
            $http({
                method: 'GET',
                url: Const.baseUrl + "/User/HasUserEvent",
                params: {
                    'Token': token,
                    'EventType': 1
                }
            }).success(function(res) {
                $scope.wineGet = res;
                data1 = true;
                if (data1 && data2) {
                    $scope.dataGetSuccess = true;
                }
            });
            $http({
                method: 'GET',
                url: Const.baseUrl + "/User/HasUserEvent",
                params: {
                    'Token': token,
                    'EventType': 2
                }
            }).success(function(res) {
                $scope.luckyGet = res;
                data2 = true;
                if (data1 && data2) {
                    $scope.dataGetSuccess = true;
                }
            });

            $http({
                method: 'GET',
                url: Const.baseUrl + "/User/SaveUserEvent",
                params: {
                    'Token': token,
                    'EventType': 1
                }
            }).success(function(res) {});
        });
    }
}]);


active_online_module.controller('active_2012_controller', ['$scope', '$http', '$location', 'Const', 'fyData', function($scope, $http, $location, Const, fyData) {
    init();

    function init() {
        //检测是否是查看自己的抽奖页面
        if ($location.search().useInfo == undefined) {
            alert('认证错误，请重新进入');
            return;
        }
        var b = new Base64();
        var openid = b.decode($location.search().useInfo);
        if (openid != fyData.user.OpenId) {
            $scope.show2Code = true;
            return;
        }

        //检测是否拿过红酒
        fyData.getToken(function(token) {
            $http({
                method: 'GET',
                url: Const.baseUrl + "/User/HasUserEvent",
                params: {
                    'Token': token,
                    'EventType': 1
                }
            }).success(function(res) {
                $scope.wineGet = res;
            });
        });

        $scope.couldCj = true;
        $scope.nothasMyAward = true;

        fyData.getToken(function(token) {
            getEsUrl(token);
            //看是否中奖
            judgeUserAwardInfo(token);
            judgeExchangeState(token);
        });

        $scope.awardInfo = {
            '2694abd0-a02b-4167-94f9-dd92f42085d1': 'award4',
            '2694abd0-a02b-4167-94f9-dd92f42085d2': 'award2',
            '2694abd0-a02b-4167-94f9-dd92f42085d3': 'award1',
            '2694abd0-a02b-4167-94f9-dd92f42085d4': 'award6'
        }

    }

    function judgeExchangeState(token) {

    }

    function judgeUserAwardInfo(token) {
        var data1, data2;
        $http({
            method: 'GET',
            url: Const.baseUrl + "/Award/GetLucky",
            params: {
                'Token': token
            }
        }).success(function(res) {
            data1 = true;
            if (data1 && data2) {
                $scope.dataGetSuccess = true;
            }
            if (res == null) {
                return;
            }
            $scope.nothasMyAward = false;
            $scope.myAward = $scope.awardInfo[res.AwardId];
            $scope.myAwardInfo = res;
            if (res.Mobile != null) {
                $scope.saveInfoSuccess = 'saveInfoSuccess';
            }
        });

        $http({
            method: 'GET',
            url: Const.baseUrl + "/Credit/GetCreditList",
            params: {
                'Token': token,
                'CreditType': '2'
            }
        }).success(function(res) {
            data2 = true;
            if (data1 && data2) {
                $scope.dataGetSuccess = true;
            }
            if (res.length > 0) {
                $scope.hasexchange = 'hasexchange';
            }
        });

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
            document.getElementById('ifram1').src = res;
        });
    }

    function judgeHasAward(token, fun) {
        $http({
            method: 'GET',
            url: Const.baseUrl + "/Award/CheckHasLucky",
            params: {
                'Token': token
            }
        }).success(function(res) {
            if (res == false) {
                $scope.gameOver = true;
            }
            if (fun) {
                fun(res);
            }
        });
    }

    $scope.cj = function() {

        if (!$scope.couldCj) {
            return;
        }

        if ($scope.wineGet) {
            alert('您已成功参与过5000元现金礼券+红酒活动，不能重复参与！');
            return;
        }

        $scope.couldCj = false;

        fyData.getToken(function(token) {
            //判断有没有奖品
            judgeHasAward(token, function(res) {
                if (res == false) {
                    alert('活动已结束');
                    $scope.couldCj = true;
                    return;
                }
                $http({
                    method: 'GET',
                    url: Const.baseUrl + "/User/SaveUserEvent",
                    params: {
                        'Token': token,
                        'EventType': 2
                    }
                }).success(function(res) {
                    console.log(res);
                });
                //抽奖
                $http({
                    method: 'GET',
                    url: Const.baseUrl + "/Award/DoLucky",
                    params: {
                        'Token': token
                    }
                }).success(function(res) {
                    $scope.myAward = $scope.awardInfo[res.AwardId];
                    $scope.myAwardInfo = res;
                    $('.scene1_pointer').addClass($scope.myAward);
                    $('.scene1_pointer').on('webkitAnimationEnd', function() {
                        setTimeout(function() {
                            $scope.nothasMyAward = false;
                            $('.scene2').show();
                        }, 600);
                    });
                })
            });
        });
    }


    $scope.saveInfo = function() {
        if ($scope.username == undefined || $scope.username == '') {
            alert("请填写姓名");
            return;
        }
        if ($scope.code == undefined || $scope.code == '') {
            alert("请填写验证码");
            return;
        }
        if (!checkPhone($scope.phonenum)) {
            return;
        }

        //保存信息
        fyData.getToken(function(token) {
            $http({
                method: 'GET',
                url: Const.baseUrl + "/Award/SaveLucky",
                params: {
                    'Token': token,
                    'Name': $scope.username,
                    'Mobile': $scope.phonenum,
                    'VeCode': $scope.code
                }
            }).success(function(res) {
                console.log(res);
                if (res == false) {
                    alert('验证码错误');
                    return;
                }
                $scope.saveInfoSuccess = 'saveInfoSuccess';
                $('.info_con').hide();
            });
        });


    }

    $scope.exchange = function() {
        //跳转链接
        window.location.href = 'http://www.elan-go.com/mhd/jbh/activity.html';
    }

    var isCanClick = true;
    var code_time = 120;
    $scope.sendCode = function() {
        if (isCanClick) {
            if (checkPhone($scope.phonenum)) {
                getAutocode();
                isCanClick = false;
                code_time = 120;
                code_timer = setInterval(function() {
                    code_time--;
                    if (code_time > 0) {
                        $('.send_autocode_btn').text('还剩' + code_time + 's');
                    } else {
                        clearInterval(code_timer);
                        code_timer = null;
                        $('.send_autocode_btn').text('获取验证码');
                        isCanClick = true;

                    };
                }, 1000);
            }
        }
    }

    $scope.closeInfo = function() {
        $('.info_con').hide();
    }

    $scope.openInfo = function() {
        $('.info_con').show();
    }

    function checkPhone(phone) {
        if (!(/^1[34578]\d{9}$/.test(phone))) {
            alert("请填写正确的手机号");
            return false;
        }
        return true;
    }

    function getAutocode() {
        fyData.getToken(function(token) {
            $http({
                method: 'get',
                url: Const.baseUrl + 'Token/GetVerifyCode',
                params: {
                    'Token': token,
                    'Mobile': $scope.phonenum
                }
            }).success(function(req) {
                console.log('success_' + req);
            }).error(function(req) {
                console.log('error_' + req);
            });
        });

    }
}]);
