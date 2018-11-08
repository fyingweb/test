var num = 1;
$(function(){
    $('.detail-more-nav a').on('click', function(){
        var index = $(this).index();
        $(this).addClass('on').siblings().removeClass('on');
        $('.more-info section').eq(index).addClass('on').siblings().removeClass('on');
    });


    $('.more-recode').click(function(){
        num++;
        var planid = $(this).attr('data-id');
        
        $.ajax({
            url:'/mobile/borrow_yt/plancreditor',
            type:'POST',
            data:{ pageNum:num,planid:planid},
            timeout:5000,
            dataType:'json',
            success:function(data){
                if(data.code == 1){
                    num--;
                    $('.more-recode').text('已加载完毕');
                    return false;
                };
                if(data.planlist.length<10){
                    $('.more-recode').text('已加载完毕');
                }
                var html = '';

                $.each(data.planlist,function(i,item) {
                    var num = item.is_day==1 ? item.time_limit_day : item.time_limit;
                    var date = item.is_day==1 ? '天' : '月';
                    html +='<dd><h3>借款标题：'+ item.title +'</h3>';
                    html +='<ul class="target-info">';
                    html +='<li><span>'+ item.username +'</span><em>借款人</em></li>';
                    html +='<li><span>'+ item.account +'</span><em>借款金额(元)</em></li>';
                    html +='<li><span>'+num+'</span> <em>借款期限('+date+')</em></li>';
                    html +='</ul></dd>';
                });

                $(".traget-list").append(html);
            },
        })
    })

});
