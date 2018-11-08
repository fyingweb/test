$(function(){
	availableHb();
	unavailableHb();

	$('.redpacket-nav a').on('click', function(){
		let index = $(this).index();
		$(this).addClass('on').siblings().removeClass('on');
		$('.redpacket-item ul').eq(index).addClass('on').siblings().removeClass('on');
	});

});

function availableHb(){
	$.ajax({
		type: 'post',
		url: '',
		data: {

		},
		dataType: 'json',
		success: function(res){
			if(res.msg){

			}


			$('.available .num').text(num);
			$('.available .total').text(total);
		}
	});
}

function unavailableHb(){
	$.ajax({
		type: 'post',
		url: '',
		data: {

		},
		dataType: 'json',
		success: function(res){
			if(res.msg){

			}


			$('.available .num').text(num);
			$('.available .total').text(total);
		}
	});
}
