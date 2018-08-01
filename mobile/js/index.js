$(function(){
	var swiper = new Swiper('.swiper-container', {
		loop: true,
		autoHeight: true,
		pagination: {
			el: '.swiper-pagination-custom',
     		clickable: true,
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
			},
		},
		navigation: {
    	  	nextEl: '.swiper-button-next',
    	  	prevEl: '.swiper-button-prev',
    	},
	});
	var $swiperPaginationCustom = $('.swiper-pagination-custom');
	$swiperPaginationCustom.on('click', 'span', function () {
		var index = $(this).index();
		swiper.slideTo(index, 500, false);
	});      
})