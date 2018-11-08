$(function(){
    
	// app关闭
	$('.app-close-btn').on('click', function(){
		$(this).parent().hide();
        $('.borrow-content').css('padding-top', '2.13333rem');
	});

	//sidenav
	$('.side-nav').on('click', function(){
		if($(this).hasClass('on')){
			$(this).removeClass('on');
		}else{
			$(this).addClass('on');
		}
	});

	// 活动弹窗
	var $markBg = $('.mark-bg'),
        $active_btn = $('.active-btn'),
        $popup = $('.popup-box');
        
    $active_btn.on('click', function(event) {
        $popup.fadeIn('fast');
        $markBg.fadeIn('fast');
        $markBg.on("touchmove", function(event){
            event.preventDefault();
        });
        event.preventDefault();
    })
    $popup.on('click', function(event) {
        $popup.fadeOut('fast');
        $markBg.fadeOut('fast');
        event.preventDefault();
    });

});

function sizeH(ele){
    function setHeight(){
        var win_h = $(window).height(),
            doc_h = $(document).height();

        if(doc_h > win_h){
            ele.css('position', 'absolute');
        }else{
            ele.css('position', 'fixed');
        }
    }

    setHeight();
    $(window).resize(function(){
        setHeight();
    });
}

function loadBlueDiv(){
    $('.circle').each(function(index, el) {
        var num = parseFloat($(this).find('.progress').text()) * 3.6;
        if (num <= 180) {
            $(this).find('.pie-right div').css('transform', "rotate(" + num + "deg)");
        } else {
            $(this).find('.pie-right div').css('transform', "rotate(180deg)");
            $(this).find('.pie-left div').css('transform', "rotate(" + (num - 180) + "deg)");
        };
    });
}