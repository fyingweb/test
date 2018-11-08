$(function(){

	$('.funds-nav a').on('click', function(){
		let index = $(this).index();
		$(this).addClass('on').siblings().removeClass('on');

		$.ajax({
			type: 'post',
			url: '',
			data: {
				type: index
			},
			dataType: 'json',
			success: function(res){
				
			}
		})
	});

})