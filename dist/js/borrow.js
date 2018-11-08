$(function(){
	
    var loadMore = new LoadMore({
        el: 'loadMore',
        bottomPullText: '上拉加载更多',
        bFreshTemplate: '<span class="loading" style="display: none;"><i class="loading-pic"></i></span>',

        // 初始化数据
        initData: function(cb) {
            var list = [];
            
            list.push();
          
            cb && cb(list);

        },

        // 上拉加载数据
        bottomMethod: function(cb) {
            var list = [];
            var isAllLoaded = false;

            setTimeout(function() {
                for(var i = 0; i < 5; i++) {
                    list.push('<h4>new item' + (i + 1)+'</h4>');
                }

                isAllLoaded = list.length >= 100;

                cb && cb(list, isAllLoaded);

            }, 2000);
        },
    });

});

function borrow_more() {
    page = parseInt(document.getElementById('borrow_page').value);
    page = page + 1;
    document.getElementById('borrow_page').value = page;
    var str = "";

    $.ajax({
        type: "GET",
        url: "/mobile/borrow/borrow_list_more/" + page,
        data: "",
        dataType: "json",
        success: function (resObj) {
            resObj = eval(resObj);
            var str = '';
            var time_limit = '';

            var borrowFtypeText = new Array();
         		borrowFtypeText[1] = '微';
         		borrowFtypeText[2] = '企';
         		borrowFtypeText[7] = '房';
         		borrowFtypeText[8] = '薪';
         		borrowFtypeText[9] = '快';
         		borrowFtypeText[12] = '新';
         		borrowFtypeText[13] = '定';
         		borrowFtypeText[14] = 'VIP';
         		borrowFtypeText[18] = '盈';

            var borrowFtypeClass = new Array();
        		borrowFtypeClass[1] = 'icon5';
        		borrowFtypeClass[2] = 'icon2';
        		borrowFtypeClass[7] = 'icon4';
        		borrowFtypeClass[8] = 'icon1';
        		borrowFtypeClass[9] = 'icon8';
        		borrowFtypeClass[12] = 'icon6';
        		borrowFtypeClass[13] = 'icon7';
        		borrowFtypeClass[14] = 'icon3';
        		borrowFtypeClass[18] = 'icon7';

            for (var k in resObj) {

                if (resObj[k]['is_day'] == 1) {
                    time_limit = '<b>' + resObj[k]['time_limit_day'] + '</b>' + '天';
                } else {
                    time_limit = '<b>' + resObj[k]['time_limit'] + '</b>' + '个月';
                }

                var baifen = (resObj[k]['account_yes'] / resObj[k]['account'] * 100).toFixed(2);
                if (parseInt(baifen, 10) == 100) {
                    baifen = 100;
                }
                
                str += '<li><a href="/mobile/borrow/obj/' + resObj[k]['id'] + '">';
                str += '<div class="row-title">'
                str += '<i class="title-icon ' + borrowFtypeClass[resObj[k]['ftype']] + ' " >' + borrowFtypeText[resObj[k]['ftype']] + '</i>';
                str += '<span class="name">' + resObj[k]['title'] + '</span>' 
                str += '</div>';
                str += '<div class="row-data">'
                str += '<div class="rate">';
                str += '<p>' + resObj[k]['apr'] + '<span>%</span></p>';
                str += '<span class="gray">年化收益率</span>';
                str += '</div>';
                str += '<div class="limit">';
                str += '<p>' + time_limit + '</p>';
                str += '<span class="gray">期限</span>';
                str += '</div>';
                str += '<div class="sum">';
                str += '<p>' + resObj[k]['account'] + '</p>';
                str += '<span class="gray">借贷总额</span>';
                str += '</div>';
                str += '<div class="circle-box">';

                if (parseFloat(resObj[k]['account']) > parseFloat(resObj[k]['account_yes'])) {
                    str += '<div class="circle">';
                } else {
                    str += '<div class="circle end">';
                }
                str += '<div class="pie-left"><div></div></div>';
                str += '<div class="pie-right"><div></div></div>';
                str += '<div class="progress">' + baifen + '%</div>'
                str += '</div></div>';
                str += '</div>';

                if (parseFloat(resObj[k]['account']) > parseFloat(resObj[k]['account_yes'])) {
                    str += '<em class="row-status status1">可投标</em>';
                } else if (resObj[k]['zt'] == 1) {
                    str += '<em class="row-status status3">已还款</em>';
                } else if (resObj[k]['hk_status'] == 2) {
                    str += '<em class="row-status status2">还款中</em>';
                } else {
                    str += '<em class="row-status status0">已满</em>';
                }
                str += '</a></li>';
            }
            $('.borrow-list').append(str);
            loadBlueDiv();
        }

    });
}