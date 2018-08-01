$(function(){
	var swiper = new Swiper('.school-banner .swiper-container', {
		loop: true,
        autoHeight: true,
		pagination: {
			el: '.swiper-pagination-custom',
			type: 'custom',
			renderCustom: function (swiper, current, total) {
				var pagination = '';
				for (var i = 1; i <= total; i++) {
					if (i === current) {
						pagination += '<span class="swiper-page-active"></span>';
					} else {
						pagination += '<span></span>';
					}
				}
				return pagination;
			}
		}
	});
	var $swiperPaginationCustom = $('.swiper-pagination-custom');
	$swiperPaginationCustom.on('click', 'span', function () {
		var index = $(this).index();
		swiper.slideTo(index, 500, false);
	});  

    /*picture*/
    new Swiper('.video-controler .swiper-container', {
        autoHeight: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        }
    });

    $('.video-controler').on('contextmenu','#video' ,function(){
        return false;
    })

	$('.full-text').on('click', function(){
    	$('.detail-text-hide').show();
    	$('.detail-text').hide();
    });

    /*评论*/
    $('#send').on('click', function(){
    	var txt = $('#comment-text').val(),
            user = '用户名',
            user_image = 'images/user-header.png',
            date = getTime();
    	if(txt == '' || txt==null){
    		alert('请输入要说的话！');
    		return false;
    	}
    	var item = '<li class="clearfix">';
            item += '<div class="comment-user-header fl"><img src="'+user_image+'"></div>';
            item += '<div class="comment-content fr"><div class="comment-info">';
            item += '<span>'+user+'</span><b>'+date+'</b>';
            item += '<i class="comment-like-icon"></i><em>0</em></div>';
            item += '<p>'+txt+'</p></div></li>';

        $('.comment-list').append(item);
       	$('#comment-text').val('')
    });

    //是否登录
    var login = false;
    /*详情点赞*/
	$('.like-icon').on('click', function(){
        if(!login){ 
            window.location.href = 'https://www.duobaodai.com/mobile/login/index/index.html';
            return false;
        }
        
    	var num = parseInt($(this).next('em').text());
    	$(this).next('em').text(num+1);

    	$.ajax({
    		url: '',
    		type: 'POST',
    		ansyc: false,
    		data: {
    			num: num
    		},
    		dataType: 'json',
    		success: function(res){
    			if (res.tip_code == 0) {
                    _this.find('em').text(num); 
                }else{
                    
                }
    		}
    	})
    });

    /*评论点赞*/
	$('.comment-container').on('click','i.comment-like-icon', function(){
        if(!login){ 
            window.location.href = 'https://www.duobaodai.com/mobile/login/index/index.html';
            return false;
        }

     	var num = parseInt($(this).next('em').text());
    	$(this).next('em').text(num+1);

    	$.ajax({
    		url: '',
    		type: 'POST',
    		ansyc: false,
    		data: {
    			num: num
    		},
    		dataType: 'json',
    		success: function(res){
    			if (res.tip_code == 0) {
                    _this.find('em').text(num); 
                }else{
                    
                }
    		}
    	})
    });
});

function replaceVideo(url){
	var html = '<video controls="true" controlslist="nodownload" id="video" autoplay="autoplay"><source src="'+url+'" type="video/mp4">抱歉，您的浏览器版本太旧，不支持该视频的播放。</video>';
	var box = document.getElementById('video-box'),
		video = document.getElementById('video');
	box.innerHTML = html;
}

function getTime(){
    var date = new Date(),
        M = date.getMonth()+1,
        Mon = M > 9 ? M : '0'+ M,
        D = date.getDate(),
        Day = D > 9 ? D : '0'+D;
    return date.getFullYear()+'-'+Mon+'-'+Day;
}

function downloadIamge(selector, name) {  
    // 通过选择器获取img元素，  
    var img = document.querySelector(selector)  
    // 将图片的src属性作为URL地址  
    var url = img.src  
    var a = document.createElement('a')  
    var event = new MouseEvent('click')  
      
    a.download = name || '下载图片名称'  
    a.href = url  
      
    a.dispatchEvent(event)  
}
