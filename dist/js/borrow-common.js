$(function(){
	loadBlueDiv();

	$('.sort-list li').on('click', function(){
		var index = $(this).index();
		$(this).addClass('active').siblings().removeClass('active');

		if($(this).hasClass('active') && index){
            if($(this).find('span').hasClass('on')){
                $(this).find('span').removeClass('on');
            }else{
                $(this).find('span').addClass('on').end().siblings().find('span').removeClass('on');
            }
		}else {
            $('.sort-list li span').removeClass('on');
        }
	});

    $('.yt-sort-list li').on('click', function(){
        var index = $(this).index();
        $(this).addClass('active').siblings().removeClass('active');

        if($(this).hasClass('active') && index){
            if($(this).find('span').hasClass('on')){
                $(this).find('span').removeClass('on');
            }else{
                $(this).find('span').addClass('on').end().siblings().find('span').removeClass('on');
            }
        }else {
            $('.yt-sort-list li span').removeClass('on');
        }
    });
});
