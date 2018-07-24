$(function () {

    var $menuBtn = $('.menu-btn'),
        $menuMaskLayer = $('.menu-mask-layer'),
        $menuList = $('.menu-list'),
        $hideMenubtn = $('.hide-menu-btn');

    function hideMenu() {
        $menuList.animate({
            'right': '-4.2rem'
        }, 'fast');
        $menuMaskLayer.fadeOut('fast');
    }

    $menuBtn.on('click', function () {
        $menuMaskLayer.fadeIn('fast');
        $menuList.animate({
            'right': 0
        }, 'fast');
    });

    $menuMaskLayer.on('click', function () {
        hideMenu();
    });

    $hideMenubtn.on('click', function () {
        hideMenu();
    });

    $menuList.on('click', 'li', function () {
        var $this = $(this);
        var dataIdxArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
        var dataIdx = dataIdxArr[$this.index()];
        $this.addClass('menu-active').siblings('li').removeClass('menu-active');
        data.slideTo(dataIdx, 300, false);
        hideMenu();
    });

    var $dataNext = $('.data-next');
    var main = new Swiper('.main-container', {
        direction: 'vertical',
        resistanceRatio: 0,
        navigation: {
            nextEl: '.main-next'
        }
    });
    var data = new Swiper('.data-container', {
        direction: 'vertical',
        resistanceRatio: 0,
        nested: true,
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        navigation: {
            nextEl: '.data-next'
        },
        on: {
            slideChangeTransitionStart: function () {
                var partIdxArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
                var partIdx = partIdxArr[this.activeIndex];
                $menuList.find('li').eq(partIdx).addClass('menu-active').siblings('li').removeClass('menu-active');
                if (this.isEnd) {
                    $dataNext.hide();
                } else {
                    $dataNext.show();
                }
            },
        },
    });
    var $backHomeBtn = $('.back-home-btn');
    $backHomeBtn.on('click', function () {
        main.slidePrev();
        $menuList.find('li').eq(0).addClass('menu-active').siblings('li').removeClass('menu-active');
        $dataNext.show();
        data.slideTo(0, 0, false);
    });
});