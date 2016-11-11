'use strict';
var mainMoudle = angular.module('mainMoudle', []);

function initScene() {
    var show_con_height = $(window).height() - 88;
    $('.show_con').css('height', show_con_height + "px");
    var main_fy_height = show_con_height - $('#swiper-container1').height();
    var main_fy_need_height = 300 * 2 + 8;
    if ((main_fy_height - main_fy_need_height) > 16 * 2) {
        var top = $('#swiper-container1').height() + (main_fy_height - main_fy_need_height) / 2;
        $('.main_btn_content').css('top', top + 'px');
    } else {
        $('.main_btn_content').css('top', (16 + $('#swiper-container1').height()) + 'px');
    }
}

function initEvent() {
    $('.icon_con').on('touchstart', function(evt) {
        $('.icon_con').removeClass('selected');
        $(this).addClass('selected');
    });
}

function initfy() {
    initBanner();
    $('.icon_1_con').addClass('selected');
}

function initBanner() {
    var mySwiper = new Swiper('.swiper-container', {
        autoplay: 2000, //可选选项，自动滑动
        initialSlide: 3,
        direction: 'horizontal',
        pagination: '.swiper-pagination'
    });

    $('.swiper-slide').on('click', function() {
        alert(111);
    });
}
mainMoudle.controller('mainCtrl', ['$scope', '$http', '$location', 'Const', function($scope, $http, $location, Const) {
    init();

    function init() {
        initScene();
        initEvent();
        initfy();
    }
}])
