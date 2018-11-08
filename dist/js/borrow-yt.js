$(function(){
	
    var loadMoreYt = new LoadMore({
        el: 'loadMoreYt',
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

var yt_num = 1;
function borrow_yt_more() {

    num++;
    $.ajax({
        url:'/mobile/borrow_yt/planlists',
        type:'POST',
        data:{ pageNum:num},
        timeout:5000,
        dataType:'json',
        success:function(data){
            if(data.code == 1){
                yt_num--;
                $('.clickmore a').text('已加载完毕');
                return false;
            };
            if(data.planlist.length<20){
                $('.clickmore a').text('已加载完毕');
            }
            var str = '';
            $.each(data.planlist,function(i,item) {

                if((item.b_account-item.b_account_yes) > 0) {
                    var state = '<em class="row-status status1">可投标</em>';
                }else if(item.b_hk_status==2){
                    var state = '<em class="row-status status3">已还款</em>';
                }else if(item.b_hk_status==1){
                    var state = '<em class="row-status status2">还款中</em>';
                }else{
                    var state = '<em class="row-status status0">已满</em>';
                }

                str += `<li>
                    <a href="/mobile/borrow_yt/plandetails/`+item.id+`" title="`+item.b_title+`">
                        <div class="row-title">
                            <i class="title-icon icon3">优</i>
                            <span class="name">`+item.b_title+`</span>
                        </div>
                        <div class="row-data">
                            <div class="rate">
                                <p>`+item.b_apr+`<span>%</span></p>
                                <span class="gray">年化收益率</span>
                            </div>
                            <div class="limit">
                                <p><b>`+item.b_time_limit+`</b>天</p>
                                <span class="gray">期限</span>
                            </div>
                            <div class="sum">
                                <p>`+item.b_account+`</p>
                                <span class="gray">项目总额</span>
                            </div>

                             <div class="circle-box">
                                <div class="circle">
                                    <div class="pie-left">
                                        <div></div>
                                    </div>
                                    <div class="pie-right">
                                        <div></div>
                                    </div>
                                    <div class="progress">`+new Number(item.b_scales)*100+`%</div>
                                </div>
                            </div>
                        </div>

                       	`+ state +`
                    </a>
                </li>`;
            });

            $(".borrow-list").append(str);
            loadBlueDiv();
        },
    })
}