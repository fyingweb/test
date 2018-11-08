$(function(){
	 $('.detail-more-nav a').on('click', function(){
        var index = $(this).index();
        $(this).addClass('on').siblings().removeClass('on');
        $('.more-info section').eq(index).addClass('on').siblings().removeClass('on');
    });

	 
	$('.data-more').on('click', function(){
		if($(this).hasClass('up')){
			$(this).text('查看更多').removeClass('up');
			$(this).siblings('.list-more').slideUp();
		}else{
			$(this).text('收回').addClass('up');
			$(this).siblings('.list-more').slideDown();
		}
	})

});
