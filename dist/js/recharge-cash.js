$(function(){
	$('.edit').on('click', function(){
		let _this = $(this);
		setTimeout(function(){
			_this.prev().focus();
		}, 200);
	});

	$('.recharge-input').on('input propertychange', function(){
		let money = $(this).val();

		$('.edit-money li').each(function(){
			let data = parseInt($(this).attr('data'));

			$(this).removeClass('on');

			if(data>money){
				$(this).removeClass('disabled');
			}else{
				$(this).addClass('disabled');
			}
		});
	});

	$('.edit-money li').on('click', function(){
		let data = parseInt($(this).attr('data'));
		
		if(!$(this).hasClass('disabled')){

			$(this).addClass('on').siblings().removeClass('on');
			
			$('.recharge-input').val(data);
			let money = $('.recharge-input').val();

			$('.edit-money li').each(function(){
				let _data = parseInt($(this).attr('data'));
				if(_data>money){
					$(this).removeClass('disabled');
				}else{
					$(this).addClass('disabled');
				}
			});
			
		}
	});

});
